# Makefile for shadcn-next-app

# Include variables first
include .env
include makefiles/variables.mk

# Default target
.DEFAULT_GOAL := help

.PHONY: help
help: ## Show this help message
	@printf "$(BOLD)shadcn-next-app Commands$(RESET)\n"
	@printf "\n"
	@printf "$(BOLD)$(YELLOW)Docker & Environment:$(RESET)\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' makefiles/docker.mk | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(BLUE)%-20s$(RESET) %s\n", $$1, $$2}'
	@printf "\n"
	@printf "$(BOLD)$(YELLOW)Application:$(RESET)\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' makefiles/app.mk | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(BLUE)%-20s$(RESET) %s\n", $$1, $$2}'
	@printf "\n"

# Include modular makefiles
include makefiles/docker.mk
include makefiles/app.mk
