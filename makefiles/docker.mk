# Docker commands for all environments
# Usage: make <command> [ENV=local|dev|prod]
# Default: ENV=local

.PHONY: up
up: ## Start containers for current environment (default: local)
	@printf "$(CYAN)Starting $(ENV) environment...$(RESET)\n"
	$(DC) up -d
	@printf "$(GREEN)$(ENV) environment started$(RESET)\n"

.PHONY: down
down: ## Stop and remove containers for current environment
	@printf "$(YELLOW)Stopping $(ENV) environment...$(RESET)\n"
	$(DC) down
	@printf "$(GREEN)$(ENV) environment stopped$(RESET)\n"

.PHONY: start
start: ## Start stopped containers for current environment
	@printf "$(CYAN)Starting $(ENV) containers...$(RESET)\n"
	$(DC) start
	@printf "$(GREEN)$(ENV) containers started$(RESET)\n"

.PHONY: stop
stop: ## Stop containers for current environment
	@printf "$(YELLOW)Stopping $(ENV) containers...$(RESET)\n"
	$(DC) stop
	@printf "$(GREEN)$(ENV) containers stopped$(RESET)\n"

.PHONY: restart
restart: ## Restart containers (without rebuilding) for current environment
	@printf "$(CYAN)Restarting $(ENV) containers...$(RESET)\n"
	$(DC) restart
	@printf "$(GREEN)$(ENV) containers restarted$(RESET)\n"

.PHONY: rebuild
rebuild: ## Rebuild and restart containers for current environment
	@printf "$(CYAN)Rebuilding and restarting $(ENV) environment...$(RESET)\n"
	$(DC) up -d --build
	@printf "$(GREEN)$(ENV) environment rebuilt and restarted$(RESET)\n"

.PHONY: logs
logs: ## View container logs for current environment
	$(DC) logs -f

.PHONY: ps
ps: ## List containers for current environment
	$(DC) ps

# Environment-specific shortcuts
.PHONY: up-local
up-local: ## Start local environment
	@$(MAKE) up ENV=local

.PHONY: up-dev
up-dev: ## Start development/staging environment
	@$(MAKE) up ENV=dev

.PHONY: up-prod
up-prod: ## Start production environment
	@$(MAKE) up ENV=prod

.PHONY: down-local
down-local: ## Stop local environment
	@$(MAKE) down ENV=local

.PHONY: down-dev
down-dev: ## Stop development/staging environment
	@$(MAKE) down ENV=dev

.PHONY: down-prod
down-prod: ## Stop production environment
	@$(MAKE) down ENV=prod

.PHONY: rebuild-local
rebuild-local: ## Rebuild local environment
	@$(MAKE) rebuild ENV=local

.PHONY: rebuild-dev
rebuild-dev: ## Rebuild development/staging environment
	@$(MAKE) rebuild ENV=dev

.PHONY: rebuild-prod
rebuild-prod: ## Rebuild production environment
	@$(MAKE) rebuild ENV=prod
