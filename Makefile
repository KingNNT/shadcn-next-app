# Makefile for shadcn-next-app

# Include variables first
include .env
include makefiles/variables.mk

# Default target
.DEFAULT_GOAL := help

.PHONY: help
help: ## Show this help message
	@printf "\n"
	@printf "  $(BOLD)$(CYAN)+----------------------------------------------------------+$(RESET)\n"
	@printf "  $(BOLD)$(CYAN)|$(RESET)  $(BOLD)shadcn-next-app$(RESET)                                       $(BOLD)$(CYAN)|$(RESET)\n"
	@printf "  $(BOLD)$(CYAN)+----------------------------------------------------------+$(RESET)\n"
	@printf "\n"
	@printf "  $(BOLD)$(YELLOW)Docker$(RESET)\n"
	@printf "  $(DIM)----------------------------------------------------------$(RESET)\n"
	@printf "  $(BLUE)%-16s$(RESET) $(DIM)/$(RESET) $(BLUE)%-16s$(RESET) %s\n" "up" "prod-up" "Start containers"
	@printf "  $(BLUE)%-16s$(RESET) $(DIM)/$(RESET) $(BLUE)%-16s$(RESET) %s\n" "down" "prod-down" "Stop and remove containers"
	@printf "  $(BLUE)%-16s$(RESET) $(DIM)/$(RESET) $(BLUE)%-16s$(RESET) %s\n" "start" "prod-start" "Start stopped containers"
	@printf "  $(BLUE)%-16s$(RESET) $(DIM)/$(RESET) $(BLUE)%-16s$(RESET) %s\n" "stop" "prod-stop" "Stop containers"
	@printf "  $(BLUE)%-16s$(RESET) $(DIM)/$(RESET) $(BLUE)%-16s$(RESET) %s\n" "restart" "prod-restart" "Restart containers (no rebuild)"
	@printf "  $(BLUE)%-16s$(RESET) $(DIM)/$(RESET) $(BLUE)%-16s$(RESET) %s\n" "rebuild" "prod-rebuild" "Rebuild and restart containers"
	@printf "  $(BLUE)%-16s$(RESET) $(DIM)/$(RESET) $(BLUE)%-16s$(RESET) %s\n" "logs" "prod-logs" "View container logs"
	@printf "  $(BLUE)%-16s$(RESET) $(DIM)/$(RESET) $(BLUE)%-16s$(RESET) %s\n" "ps" "prod-ps" "List containers"
	@printf "\n"
	@printf "  $(BOLD)$(YELLOW)Application$(RESET)\n"
	@printf "  $(DIM)----------------------------------------------------------$(RESET)\n"
	@printf "  $(BLUE)%-16s$(RESET)                    %s\n" "dev" "Start development server"
	@printf "  $(BLUE)%-16s$(RESET) $(DIM)/$(RESET) $(BLUE)%-16s$(RESET) %s\n" "shell" "prod-shell" "Connect to container shell"
	@printf "  $(BLUE)%-16s$(RESET) $(DIM)/$(RESET) $(BLUE)%-16s$(RESET) %s\n" "build" "prod-build" "Build application"
	@printf "  $(BLUE)%-16s$(RESET) $(DIM)/$(RESET) $(BLUE)%-16s$(RESET) %s\n" "lint" "prod-lint" "Run linter"
	@printf "  $(BLUE)%-16s$(RESET) $(DIM)/$(RESET) $(BLUE)%-16s$(RESET) %s\n" "install" "prod-install" "Install dependencies"
	@printf "  $(BLUE)%-16s$(RESET) $(DIM)/$(RESET) $(BLUE)%-16s$(RESET) %s\n" "exec" "prod-exec" "Execute command (CMD=\"...\")"
	@printf "\n"
	@printf "  $(BOLD)$(YELLOW)Testing$(RESET)\n"
	@printf "  $(DIM)----------------------------------------------------------$(RESET)\n"
	@printf "  $(BLUE)%-16s$(RESET)                    %s\n" "test" "Run all tests (unit + integration)"
	@printf "  $(BLUE)%-16s$(RESET)                    %s\n" "test-unit" "Run unit tests only"
	@printf "  $(BLUE)%-16s$(RESET)                    %s\n" "test-integration" "Run integration tests only"
	@printf "  $(BLUE)%-16s$(RESET)                    %s\n" "test-watch" "Run tests in watch mode"
	@printf "  $(BLUE)%-16s$(RESET)                    %s\n" "test-coverage" "Run tests with coverage report"
	@printf "  $(BLUE)%-16s$(RESET)                    %s\n" "test-e2e" "Run E2E tests (Playwright)"
	@printf "\n"
	@printf "  $(DIM)Usage: make <command>$(RESET)\n"
	@printf "\n"

# Include modular makefiles
include makefiles/docker.mk
include makefiles/app.mk
