# Docker commands for development environment

.PHONY: up
up: ## Start development containers
	@printf "$(CYAN)Starting development environment...$(RESET)\n"
	docker compose -f $(DOCKER_COMPOSE_DEV) up -d
	@printf "$(GREEN)✓ Development environment started$(RESET)\n"

.PHONY: down
down: ## Stop and remove development containers
	@printf "$(YELLOW)Stopping development environment...$(RESET)\n"
	docker compose -f $(DOCKER_COMPOSE_DEV) down
	@printf "$(GREEN)✓ Development environment stopped$(RESET)\n"

.PHONY: start
start: ## Start stopped development containers
	@printf "$(CYAN)Starting development containers...$(RESET)\n"
	docker compose -f $(DOCKER_COMPOSE_DEV) start
	@printf "$(GREEN)✓ Development containers started$(RESET)\n"

.PHONY: stop
stop: ## Stop development containers
	@printf "$(YELLOW)Stopping development containers...$(RESET)\n"
	docker compose -f $(DOCKER_COMPOSE_DEV) stop
	@printf "$(GREEN)✓ Development containers stopped$(RESET)\n"

.PHONY: restart
restart: ## Restart development containers (without rebuilding)
	@printf "$(CYAN)Restarting development containers...$(RESET)\n"
	docker compose -f $(DOCKER_COMPOSE_DEV) restart
	@printf "$(GREEN)✓ Development containers restarted$(RESET)\n"

.PHONY: rebuild
rebuild: ## Rebuild and restart development containers
	@printf "$(CYAN)Rebuilding and restarting development environment...$(RESET)\n"
	docker compose -f $(DOCKER_COMPOSE_DEV) up -d --build
	@printf "$(GREEN)✓ Development environment rebuilt and restarted$(RESET)\n"
