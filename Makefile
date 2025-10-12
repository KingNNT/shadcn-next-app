# Makefile for shadcn-next-app

# Include variables first
include .env
include make/variables.mk

# Default target
.DEFAULT_GOAL := help

.PHONY: help
help: ## Show this help message
	@printf "$(BOLD)shadcn-next-app Commands$(RESET)\n"
	@printf "\n"
	@printf "$(BOLD)$(YELLOW)Docker & Environment:$(RESET)\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' make/docker.mk | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(BLUE)%-20s$(RESET) %s\n", $$1, $$2}'
	@printf "\n"
	@printf "$(BOLD)$(YELLOW)Application:$(RESET)\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' make/app.mk | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(BLUE)%-20s$(RESET) %s\n", $$1, $$2}'
	@printf "\n"

# Include modular makefiles
include make/docker.mk
include make/app.mk
