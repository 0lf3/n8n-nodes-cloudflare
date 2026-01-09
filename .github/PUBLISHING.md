# Publishing n8n-nodes-cloudflare

Guide for publishing the Cloudflare community nodes package to npm.

## Prerequisites

### Required Secrets

Configure in **GitHub → Settings → Secrets and variables → Actions**:

| Secret         | Description                                   |
| -------------- | --------------------------------------------- |
| `NPM_TOKEN`    | npm automation token with publish permissions |
| `GITHUB_TOKEN` | Automatic (no setup needed)                   |

### Getting NPM Token

1. Log in to [npmjs.com](https://www.npmjs.com)
2. Go to **Account → Access Tokens → Generate New Token**
3. Select **Automation** type
4. Copy token and add as `NPM_TOKEN` secret

## How to Publish

1. Go to **Actions → Publish to NPM**
2. Click **Run workflow**
3. Select version bump:
   - `patch` - Bug fixes (0.1.0 → 0.1.1)
   - `minor` - New features (0.1.0 → 0.2.0)
   - `major` - Breaking changes (0.1.0 → 1.0.0)
   - `prerelease` - Beta (0.1.0 → 0.1.1-beta.0)
4. Optional: Check **Dry run** to test first
5. Click **Run workflow**

## What Happens

1. **Validate** - Lint, build, verify package structure
2. **Publish** - Push to npm registry
3. **Release** - Create GitHub tag and release

## Installation

After publishing, users install via:

**n8n UI:**
Settings → Community Nodes → Install `n8n-nodes-cloudflare`

**npm:**

```bash
npm install n8n-nodes-cloudflare
```

## Troubleshooting

| Error            | Solution                          |
| ---------------- | --------------------------------- |
| 401 Unauthorized | Regenerate NPM_TOKEN              |
| Version exists   | Use higher version bump           |
| Build failed     | Run `npm run build` locally first |

## Links

- [npm Package](https://www.npmjs.com/package/n8n-nodes-cloudflare)
- [GitHub Releases](https://github.com/automations-project/n8n-nodes-cloudflare/releases)
- [n8n Community Nodes Docs](https://docs.n8n.io/integrations/community-nodes/)
