.PHONY: help install dev backend dev-full build preview test test-watch lint clean

.DEFAULT_GOAL := help

help: ## Show available make targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install project dependencies
	npm install

dev: ## Start the Vite frontend development server
	npm run dev

backend: ## Start the json-server mock backend
	npm run backend

dev-full: ## Start both frontend and backend servers concurrently
	npm run dev:full

build: ## Build the application for production
	npm run build

preview: ## Preview the production build locally
	npm run preview

test: ## Run unit tests once
	npx vitest run

test-watch: ## Run unit tests in watch mode
	npm run test:unit

lint: ## Lint and auto-fix project files
	npm run lint

clean: ## Remove build artifacts and dependencies
	rm -rf dist node_modules
