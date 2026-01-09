# GitHub Workflows & CI/CD

This directory contains GitHub Actions workflows and publishing documentation for n8n-nodes-nodemation.

## 📁 Contents

### Workflows

- **[`ci.yml`](workflows/ci.yml)** - Continuous Integration
  - Runs on every push and PR
  - Tests on Node.js 18.x and 20.x
  - Runs linting, tests, and coverage
  - Uploads coverage to Codecov

- **[`publish.yml`](workflows/publish.yml)** - Package Publishing
  - Manual trigger only (workflow_dispatch)
  - Publishes to NPM (@Nskha)
  - Publishes to GitHub Packages (@Automations-Project)
  - Creates GitHub Releases with tags
  - Includes dry-run mode for testing

### Documentation

- **[`PUBLISHING.md`](PUBLISHING.md)** - Complete Publishing Guide
  - Detailed setup instructions
  - Security best practices
  - Troubleshooting guide
  - Post-publication checklist

- **[`PUBLISH_QUICK_START.md`](PUBLISH_QUICK_START.md)** - Quick Reference
  - Fast 30-second publish guide
  - Common scenarios
  - Quick troubleshooting

## 🚀 Quick Links

### Publishing
- **Publish Workflow:** https://github.com/Automations-Project/n8n-nodes-nodemation/actions/workflows/publish.yml
- **CI Status:** https://github.com/Automations-Project/n8n-nodes-nodemation/actions/workflows/ci.yml

### Published Packages
- **NPM:** https://www.npmjs.com/package/n8n-nodes-nodemation
- **GitHub Packages:** https://github.com/Automations-Project/n8n-nodes-nodemation/packages
- **Releases:** https://github.com/Automations-Project/n8n-nodes-nodemation/releases

## 📊 Workflow Status Badges

Add these to your main README.md:

### CI Badge
```markdown
[![CI](https://github.com/Automations-Project/n8n-nodes-nodemation/actions/workflows/ci.yml/badge.svg)](https://github.com/Automations-Project/n8n-nodes-nodemation/actions/workflows/ci.yml)
```

### Publish Workflow Badge
```markdown
[![Publish](https://github.com/Automations-Project/n8n-nodes-nodemation/actions/workflows/publish.yml/badge.svg)](https://github.com/Automations-Project/n8n-nodes-nodemation/actions/workflows/publish.yml)
```

### NPM Version Badge
```markdown
[![npm version](https://img.shields.io/npm/v/n8n-nodes-nodemation?logo=npm)](https://www.npmjs.com/package/n8n-nodes-nodemation)
```

### NPM Downloads Badge
```markdown
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-nodemation?logo=npm)](https://www.npmjs.com/package/n8n-nodes-nodemation)
```

## 🔧 Maintenance

### Token Rotation Schedule
- **NPM_TOKEN:** Rotate every 90 days
- **Next rotation:** [Add date after first setup]

### Workflow Updates
Check for updates to GitHub Actions:
```bash
# Check for action updates
gh api repos/actions/checkout/releases/latest
gh api repos/actions/setup-node/releases/latest
gh api repos/softprops/action-gh-release/releases/latest
```

## 🔐 Required Secrets

### Repository Secrets
Configure in: **Settings → Secrets and variables → Actions**

| Secret | Purpose | Required For |
|--------|---------|--------------|
| `NPM_TOKEN` | NPM publishing authentication | `publish.yml` |
| `GITHUB_TOKEN` | GitHub Packages & Releases | Auto-provided |

### Environment Secrets (Optional)
For additional protection, create environments:
- `npm-production` - NPM publishing gate
- `github-packages` - GitHub Packages gate

## 🛡️ Security Features

### Workflow Security
- ✅ Minimal permissions (principle of least privilege)
- ✅ Provenance signatures on published packages
- ✅ Automated validation before publish
- ✅ Separate environments for production
- ✅ No hardcoded secrets
- ✅ Token scoping per job

### Package Security
- ✅ Dependency scanning via Dependabot
- ✅ Code scanning with CodeQL
- ✅ Signed commits (optional)
- ✅ Branch protection rules

## 📝 Workflow Triggers

### CI Workflow (`ci.yml`)
**Automatic triggers:**
- Push to `master`, `main`, or `develop` branches
- Pull requests to `master`, `main`, or `develop` branches

### Publish Workflow (`publish.yml`)
**Manual trigger only:**
- Go to Actions → Publish n8n Node → Run workflow
- Select version bump type
- Optional: Enable dry-run mode

## 🔄 Development Workflow

### Standard Process
1. Create feature branch
2. Make changes
3. Push → CI runs automatically
4. Create PR → CI runs on PR
5. Merge to `master`
6. Manually trigger publish workflow

### Pre-Release Process
1. Create release branch
2. Use prerelease version bump (e.g., `beta`)
3. Test with dry-run first
4. Publish prerelease
5. After testing, publish stable version

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules)
- [GitHub Packages Guide](https://docs.github.com/en/packages)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

---

**Maintained by:** @Nskha / @Automations-Project  
**Last updated:** 2025-10-18
