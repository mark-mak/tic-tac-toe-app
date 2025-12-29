# Version Control Guide

## Git Setup

### Initial Setup
```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Tic-Tac-Toe React Native app with TypeScript"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/tic-tac-toe-app.git

# Push to remote
git push -u origin main
```

## Recommended Branching Strategy

### Main Branches
- `main` - Production-ready code
- `develop` - Development branch for integration

### Feature Branches
```bash
# Create feature branch
git checkout -b feature/new-feature-name

# Work on feature
git add .
git commit -m "feat: add new feature"

# Merge back to develop
git checkout develop
git merge feature/new-feature-name
```

## Commit Message Convention

Use conventional commits format:

```
feat: new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semi colons, etc
refactor: code restructuring
test: adding tests
chore: maintain, dependencies, build
```

### Examples:
```bash
git commit -m "feat: add winning animation"
git commit -m "fix: resolve cell click issue on Android"
git commit -m "docs: update README with build instructions"
git commit -m "chore: update dependencies to latest versions"
```

## Version Tagging

### Semantic Versioning (MAJOR.MINOR.PATCH)

```bash
# For bug fixes
git tag -a v1.0.1 -m "Fix: Cell selection bug"
git push origin v1.0.1

# For new features (backward compatible)
git tag -a v1.1.0 -m "Feature: Add game statistics"
git push origin v1.1.0

# For breaking changes
git tag -a v2.0.0 -m "Breaking: New game engine"
git push origin v2.0.0
```

## Makefile Integration

Add these commands to your Makefile:

```makefile
# Git operations
git-status:
	@git status

git-commit:
	@git add .
	@git commit

git-push:
	@git push

# Create release tag
release-patch:
	@npm version patch
	@git push && git push --tags

release-minor:
	@npm version minor
	@git push && git push --tags

release-major:
	@npm version major
	@git push && git push --tags
```

## Version in package.json

Update version in `package.json`:
```json
{
  "name": "tic-tac-toe-app",
  "version": "1.0.0",
  ...
}
```

Automatically bump version:
```bash
# Patch: 1.0.0 → 1.0.1
npm version patch

# Minor: 1.0.0 → 1.1.0
npm version minor

# Major: 1.0.0 → 2.0.0
npm version major
```

## Recommended Git Workflow

1. **Daily work:**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/my-feature
   # ... make changes ...
   git add .
   git commit -m "feat: describe changes"
   git push origin feature/my-feature
   ```

2. **Before release:**
   ```bash
   git checkout main
   git merge develop
   npm version minor  # or patch/major
   git push origin main --tags
   make build-apk  # Build production version
   ```

3. **Hotfix:**
   ```bash
   git checkout -b hotfix/fix-name main
   # ... fix issue ...
   git commit -m "fix: critical bug"
   git checkout main
   git merge hotfix/fix-name
   npm version patch
   git push origin main --tags
   ```

## Files That Should Be Committed

✅ **Commit these:**
- Source code (`src/`, `App.tsx`)
- Configuration (`package.json`, `tsconfig.json`, `babel.config.js`, etc.)
- Documentation (`README.md`, `CHANGELOG.md`)
- Build configs (`eas.json`, `app.json`)
- Makefile
- `.gitignore`

❌ **Don't commit:**
- `node_modules/`
- `.expo/`
- Build outputs (`.apk`, `.aab`, `.ipa`)
- Environment files with secrets (`.env`)
- IDE configs (`.vscode/`, `.idea/`)
- Cache files

## GitHub/GitLab Integration

### Create `.github/workflows/ci.yml` for CI/CD:
```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npx tsc --noEmit
      - run: npm test  # if you add tests
```

## Quick Start Commands

```bash
# Initialize version control
make git-init      # New command to add

# Daily workflow
make git-status
make git-commit
make git-push

# Release workflow
make release-patch   # For bug fixes
make release-minor   # For new features
make release-major   # For breaking changes
```
