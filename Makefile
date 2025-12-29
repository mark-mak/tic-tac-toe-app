.PHONY: help install start android ios web clean build-apk build-aab build-ipa

# Default target
help:
	@echo "Tic-Tac-Toe React Native App - Available Commands:"
	@echo ""
	@echo "Development:"
	@echo "  make install       - Install dependencies"
	@echo "  make start         - Start Expo development server"
	@echo "  make android       - Run on Android device/emulator"
	@echo "  make ios           - Run on iOS simulator (macOS only)"
	@echo "  make web           - Run in web browser"
	@echo ""
	@echo "Build (Production):"
	@echo "  make build-apk     - Build Android APK (for distribution)"
	@echo "  make build-aab     - Build Android App Bundle (for Play Store)"
	@echo "  make build-ipa     - Build iOS IPA (for App Store)"
	@echo "  make build-ios-dev - Build iOS development IPA (for testing)"
	@echo ""
	@echo "Version Control:"
	@echo "  make version       - Show current app version"
	@echo "  make git-init      - Initialize Git repository"
	@echo "  make git-status    - Show Git status"
	@echo "  make git-commit    - Stage and commit changes"
	@echo "  make git-push      - Push to remote"
	@echo "  make release-patch - Bump patch version (1.0.0 → 1.0.1)"
	@echo "  make release-minor - Bump minor version (1.0.0 → 1.1.0)"
	@echo "  make release-major - Bump major version (1.0.0 → 2.0.0)"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean         - Clean cache and build artifacts"
	@echo "  make clear-cache   - Clear Expo and Metro cache"

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

# Start development server
start:
	@echo "Starting Expo development server..."
	ANDROID_HOME=$(HOME)/Android/Sdk npm start

# Run on Android
android:
	@echo "Running on Android..."
	ANDROID_HOME=$(HOME)/Android/Sdk npm run android

# Run on iOS (macOS only)
ios:
	@echo "Running on iOS..."
	npm run ios

# Run on web
web:
	@echo "Running on web..."
	npm run web

# Build Android APK (development build)
build-apk:
	@echo "Building Android APK..."
	@echo "This requires EAS Build. Setting up..."
	@if [ ! -f eas.json ]; then \
		npx eas-cli@latest build:configure; \
	fi
	@echo "Building APK for internal distribution..."
	npx eas-cli@latest build --platform android --profile preview

# Build Android App Bundle (for Play Store)
build-aab:
	@echo "Building Android App Bundle (AAB) for Play Store..."
	@if [ ! -f eas.json ]; then \
		npx eas-cli@latest build:configure; \
	fi
	@echo "Building AAB for Play Store submission..."
	npx eas-cli@latest build --platform android --profile production

# Build iOS IPA (macOS only)
build-ipa:
	@echo "Building iOS IPA for App Store..."
	@if [ ! -f eas.json ]; then \
		npx eas-cli@latest build:configure; \
	fi
	@echo "Building IPA for App Store submission..."
	npx eas-cli@latest build --platform ios --profile production

# Build iOS for development (install on registered devices)
build-ios-dev:
	@echo "Building iOS development build..."
	@if [ ! -f eas.json ]; then \
		npx eas-cli@latest build:configure; \
	fi
	@echo "Building development IPA (can install on registered devices)..."
	npx eas-cli@latest build --platform ios --profile development

# Clean cache and build artifacts
clean:
	@echo "Cleaning cache and build artifacts..."
	rm -rf .expo
	rm -rf node_modules/.cache
	rm -rf android/app/build
	rm -rf ios/build
	@echo "Clean complete!"

# Clear Expo and Metro cache
clear-cache:
	@echo "Clearing Expo and Metro cache..."
	rm -rf .expo
	rm -rf node_modules/.cache
	rm -rf ~/.expo
	rm -rf ~/.cache/metro-bundler
	@echo "Cache cleared!"

# Quick start with cache clear
fresh-start: clear-cache
	@echo "Starting fresh..."
	ANDROID_HOME=$(HOME)/Android/Sdk npx expo start --clear

# Git and Version Control
version:
	@echo "Current version: $$(node -p "require('./package.json').version")"

git-init:
	@echo "Initializing Git repository..."
	@git init
	@git add .
	@git commit -m "Initial commit: Tic-Tac-Toe React Native app"
	@echo "✅ Git initialized! Add remote with: git remote add origin <your-repo-url>"

git-status:
	@git status

git-commit:
	@git add .
	@git commit

git-push:
	@git push

# Version bumping (creates git tag automatically)
release-patch:
	@echo "Bumping patch version (bug fixes)..."
	@npm version patch
	@git push && git push --tags
	@echo "✅ Patch version released!"

release-minor:
	@echo "Bumping minor version (new features)..."
	@npm version minor
	@git push && git push --tags
	@echo "✅ Minor version released!"

release-major:
	@echo "Bumping major version (breaking changes)..."
	@npm version major
	@git push && git push --tags
	@echo "✅ Major version released!"
