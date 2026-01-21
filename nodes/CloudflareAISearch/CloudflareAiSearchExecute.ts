import {
	IExecuteFunctions,
	INodeExecutionData,
	IDataObject,
	NodeOperationError,
} from 'n8n-workflow';
import { cloudflareApiRequest } from '../shared/GenericFunctions';

export async function aiSearchExecute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const operation = this.getNodeParameter('operation', index) as string;
	const accountId = this.getNodeParameter('accountId', index) as string;
	const ragName = this.getNodeParameter('ragName', index) as string;
	const query = this.getNodeParameter('query', index) as string;
	const options = this.getNodeParameter('options', index) as IDataObject;

	// Validate required fields
	if (!query || query.trim() === '') {
		throw new NodeOperationError(
			this.getNode(),
			'Query cannot be empty',
			{ itemIndex: index },
		);
	}

	if (!ragName || ragName.trim() === '') {
		throw new NodeOperationError(
			this.getNode(),
			'AI Search Name (RAG Name) is required',
			{ itemIndex: index },
		);
	}

	// Base body
	const body: IDataObject = {
		query: query.trim(),
	};

	// Add options
	if (options.rewriteQuery !== undefined) {
		body.rewrite_query = options.rewriteQuery;
	}
	if (options.maxNumResults !== undefined && options.maxNumResults !== '') {
		const maxResults = Number(options.maxNumResults);
		if (maxResults < 1 || maxResults > 50) {
			throw new NodeOperationError(
				this.getNode(),
				'Max Results must be between 1 and 50',
				{ itemIndex: index },
			);
		}
		body.max_num_results = maxResults;
	}

	// Ranking options
	if (options.scoreThreshold !== undefined && options.scoreThreshold !== '') {
		const threshold = Number(options.scoreThreshold);
		if (threshold < 0 || threshold > 1) {
			throw new NodeOperationError(
				this.getNode(),
				'Score Threshold must be between 0 and 1',
				{ itemIndex: index },
			);
		}
		body.ranking_options = {
			score_threshold: threshold,
		};
	}

	// Reranking
	if (options.rerankingEnabled === true) {
		const reranking: IDataObject = {
			enabled: true,
		};
		if (options.rerankingModel && String(options.rerankingModel).trim() !== '') {
			reranking.model = String(options.rerankingModel).trim();
		}
		body.reranking = reranking;
	}

	// Metadata filter
	const filterParam = this.getNodeParameter('filter', index, '') as string | IDataObject;
	if (filterParam) {
		let filters: IDataObject;
		if (typeof filterParam === 'string' && filterParam.trim() !== '') {
			try {
				filters = JSON.parse(filterParam);
			} catch {
				throw new NodeOperationError(
					this.getNode(),
					'Metadata Filter must be valid JSON',
					{ itemIndex: index },
				);
			}
		} else if (typeof filterParam === 'object') {
			filters = filterParam;
		} else {
			filters = {};
		}

		if (Object.keys(filters).length > 0) {
			body.filters = filters;
		}
	}

	let endpoint = '';

	if (operation === 'generate') {
		endpoint = `/accounts/${accountId}/autorag/rags/${encodeURIComponent(ragName)}/ai-search`;

		const model = this.getNodeParameter('model', index, '') as string;
		const systemPrompt = this.getNodeParameter('systemPrompt', index, '') as string;

		if (model && model.trim() !== '') {
			body.model = model.trim();
		}
		if (systemPrompt && systemPrompt.trim() !== '') {
			body.system_prompt = systemPrompt.trim();
		}
	} else if (operation === 'search') {
		endpoint = `/accounts/${accountId}/autorag/rags/${encodeURIComponent(ragName)}/search`;
	} else {
		throw new NodeOperationError(
			this.getNode(),
			`Unknown operation: ${operation}`,
			{ itemIndex: index },
		);
	}

	// Use the shared helper for proper error handling
	const responseData = await cloudflareApiRequest.call(
		this,
		'POST',
		endpoint,
		body,
		{},
		'ai_search',
	);

	return [
		{
			json: responseData,
			pairedItem: { item: index },
		},
	];
}
