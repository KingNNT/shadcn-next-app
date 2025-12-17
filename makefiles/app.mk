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
