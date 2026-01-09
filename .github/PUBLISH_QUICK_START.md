# 🚀 Quick Publish Guide

Ultra-fast reference for publishing n8n-nodes-nodemation.

## ⚡ One-Time Setup (5 minutes)

### 1. Get NPM Token
```bash
# Login to npmjs.com as @Nskha
# → Account Settings → Access Tokens → Generate New Token
# → Type: Automation
# → Copy token (npm_...)
```

### 2. Add to GitHub Secrets
```
GitHub Repo → Settings → Secrets and variables → Actions → New repository secret
Name: NPM_TOKEN
Value: npm_xxxxxxxxxxxxxxxxxxxxx
```

### 3. Enable Workflow Permissions
```
GitHub Repo → Settings → Actions → General → Workflow permissions
→ ✅ Read and write permissions
```

✅ **Done!** You're ready to publish.

---

## 📦 Publish Now (30 seconds)

### Step 1: Go to Actions
https://github.com/Automations-Project/n8n-nodes-nodemation/actions/workflows/publish.yml

### Step 2: Run Workflow
```
Click: "Run workflow" button
├─ Branch: master
├─ Version bump: [Choose one]
│  ├─ patch   (1.0.0 → 1.0.1) - Bug fixes
│  ├─ minor   (1.0.0 → 1.1.0) - New features
│  ├─ major   (1.0.0 → 2.0.0) - Breaking changes
│  └─ prerelease (1.0.0 → 1.0.1-beta.0) - Testing
├─ Prerelease tag: beta (if prerelease selected)
└─ Dry run: ☐ (uncheck for real publish)

Click: "Run workflow" ✅
```

### Step 3: Wait (~3 minutes)
- ⏳ Validates & tests
- 📦 Publishes to NPM
- 📦 Publishes to GitHub Packages
- 🏷️ Creates GitHub Release

### Step 4: Verify
```bash
# Check NPM
npm view n8n-nodes-nodemation version

# Install test
npm install n8n-nodes-nodemation
```

✅ **Done!** Package is live.

---

## 🎯 Common Scenarios

### Scenario 1: Bug Fix Release
```
Version bump: patch
Dry run: unchecked
→ Publishes: 1.0.0 → 1.0.1
```

### Scenario 2: New Feature Release
```
Version bump: minor
Dry run: unchecked
→ Publishes: 1.0.1 → 1.1.0
```

### Scenario 3: Beta Testing
```
Version bump: prerelease
Prerelease tag: beta
Dry run: unchecked
→ Publishes: 1.1.0 → 1.1.1-beta.0
```

### Scenario 4: Test Run (No Publish)
```
Version bump: patch
Dry run: ✅ checked
→ Tests everything, publishes nothing
```

---

## 🔍 Where to Find Published Package

### NPM (Main)
- **URL:** https://www.npmjs.com/package/n8n-nodes-nodemation
- **Install:** `npm install n8n-nodes-nodemation`

### GitHub Packages (Mirror)
- **URL:** https://github.com/Automations-Project/n8n-nodes-nodemation/packages
- **Install:** `npm install @automations-project/n8n-nodes-nodemation --registry=https://npm.pkg.github.com`

### GitHub Releases
- **URL:** https://github.com/Automations-Project/n8n-nodes-nodemation/releases

---

## ❌ Troubleshooting (2 minutes)

### Error: "401 Unauthorized" on NPM
**Fix:** NPM token expired. Generate new token → Update GitHub Secret `NPM_TOKEN`

### Error: "Version already exists"
**Fix:** Use higher version bump (patch → minor → major)

### Error: "Build failed"
**Fix:** Test locally first:
```bash
npm ci
npm run build
npm run test
npm run prepublishOnly
```

### Error: "Dry run but still published"
**Fix:** Double-check dry-run checkbox is ✅ checked

---

## 📋 Pre-Publish Checklist

Before clicking "Run workflow":

- [ ] All tests passing locally?
- [ ] Code reviewed and approved?
- [ ] README.md updated?
- [ ] Breaking changes documented?
- [ ] Correct version bump selected?
- [ ] Dry run tested (if major release)?

---

## 🔐 Security Reminders

- ✅ Never commit `NPM_TOKEN` to code
- ✅ Rotate token every 90 days
- ✅ Use "Automation" token type
- ✅ Keep `GITHUB_TOKEN` automatic (don't override)

---

## 📞 Need Help?

**Full Documentation:** [PUBLISHING.md](.github/PUBLISHING.md)  
**Issues:** https://github.com/Automations-Project/n8n-nodes-nodemation/issues  
**n8n Community:** https://community.n8n.io

---

**Typical publish time:** ~3 minutes  
**Manual intervention:** None (fully automated)  
**Rollback:** Not supported (publish new patch version instead)
