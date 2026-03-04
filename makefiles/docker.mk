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

# Production environment shortcuts
.PHONY: prod-up
prod-up: ## Start production environment
	@$(MAKE) up ENV=prod

.PHONY: prod-down
prod-down: ## Stop production environment
	@$(MAKE) down ENV=prod

.PHONY: prod-start
prod-start: ## Start stopped production containers
	@$(MAKE) start ENV=prod

.PHONY: prod-stop
prod-stop: ## Stop production containers
	@$(MAKE) stop ENV=prod

.PHONY: prod-restart
prod-restart: ## Restart production containers
	@$(MAKE) restart ENV=prod

.PHONY: prod-rebuild
prod-rebuild: ## Rebuild production environment
	@$(MAKE) rebuild ENV=prod

.PHONY: prod-logs
prod-logs: ## View production container logs
	@$(MAKE) logs ENV=prod

.PHONY: prod-ps
prod-ps: ## List production containers
	@$(MAKE) ps ENV=prod
