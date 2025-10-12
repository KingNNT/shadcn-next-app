# Application commands

.PHONY: shell
shell: up ## Start containers and connect to shell
	@printf "$(CYAN)Connecting to development container...$(RESET)\n"
	docker compose -f $(DOCKER_COMPOSE_DEV) exec -it app bash

.PHONY: dev
dev: up ## Start containers and development server
	@printf "$(CYAN)Starting development server...$(RESET)\n"
	docker compose -f $(DOCKER_COMPOSE_DEV) exec -it app yarn dev

.PHONY: build
build: up ## Start containers and build application
	@printf "$(CYAN)Building application...$(RESET)\n"
	docker compose -f $(DOCKER_COMPOSE_DEV) exec -it app yarn build
	@printf "$(GREEN)✓ Build completed$(RESET)\n"

.PHONY: lint
lint: up ## Start containers and run linter
	@printf "$(CYAN)Running linter...$(RESET)\n"
	docker compose -f $(DOCKER_COMPOSE_DEV) exec -it app yarn lint

.PHONY: install
install: up ## Start containers and install dependencies
	@printf "$(CYAN)Installing dependencies...$(RESET)\n"
	docker compose -f $(DOCKER_COMPOSE_DEV) exec -it app yarn install
	@printf "$(GREEN)✓ Dependencies installed$(RESET)\n"
