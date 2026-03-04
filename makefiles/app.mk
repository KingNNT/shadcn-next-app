# Application commands
# These commands work with the current environment (default: local)

.PHONY: shell
shell: up ## Start containers and connect to shell
	@printf "$(CYAN)Connecting to $(ENV) container...$(RESET)\n"
	$(DC) exec -it app bash

.PHONY: dev
dev: up ## Start containers and development server
	@printf "$(CYAN)Starting development server...$(RESET)\n"
	$(DC) exec -it app yarn dev

.PHONY: build
build: up ## Start containers and build application
	@printf "$(CYAN)Building application...$(RESET)\n"
	$(DC) exec -it app yarn build
	@printf "$(GREEN)Build completed$(RESET)\n"

.PHONY: lint
lint: up ## Start containers and run linter
	@printf "$(CYAN)Running linter...$(RESET)\n"
	$(DC) exec -it app yarn lint

.PHONY: install
install: up ## Start containers and install dependencies
	@printf "$(CYAN)Installing dependencies...$(RESET)\n"
	$(DC) exec -it app yarn install
	@printf "$(GREEN)Dependencies installed$(RESET)\n"

.PHONY: exec
exec: up ## Execute a command in the container (usage: make exec CMD="yarn add package")
	@printf "$(CYAN)Executing command: $(CMD)$(RESET)\n"
	$(DC) exec -it app $(CMD)

.PHONY: test
test: ## Run all tests (unit + integration)
	@printf "$(CYAN)Running tests...$(RESET)\n"
	yarn test

.PHONY: test-unit
test-unit: ## Run unit tests only
	@printf "$(CYAN)Running unit tests...$(RESET)\n"
	yarn test:unit

.PHONY: test-integration
test-integration: ## Run integration tests only
	@printf "$(CYAN)Running integration tests...$(RESET)\n"
	yarn test:integration

.PHONY: test-watch
test-watch: ## Run tests in watch mode
	@printf "$(CYAN)Starting test watch mode...$(RESET)\n"
	yarn test:watch

.PHONY: test-coverage
test-coverage: ## Run tests with coverage report
	@printf "$(CYAN)Running tests with coverage...$(RESET)\n"
	yarn test:coverage

.PHONY: test-e2e
test-e2e: ## Run E2E tests (Playwright)
	@printf "$(CYAN)Running E2E tests...$(RESET)\n"
	yarn test:e2e

# Production environment shortcuts
.PHONY: prod-shell
prod-shell: ## Connect to production container shell
	@$(MAKE) shell ENV=prod

.PHONY: prod-build
prod-build: ## Build application in production
	@$(MAKE) build ENV=prod

.PHONY: prod-lint
prod-lint: ## Run linter in production
	@$(MAKE) lint ENV=prod

.PHONY: prod-install
prod-install: ## Install dependencies in production
	@$(MAKE) install ENV=prod

.PHONY: prod-exec
prod-exec: ## Execute command in production (usage: make prod-exec CMD="...")
	@$(MAKE) exec ENV=prod CMD="$(CMD)"
