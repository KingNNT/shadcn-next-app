# Color definitions for terminal output
RED    := \033[0;31m
GREEN  := \033[0;32m
YELLOW := \033[0;33m
BLUE   := \033[0;34m
PURPLE := \033[0;35m
CYAN   := \033[0;36m
BOLD   := \033[1m
RESET  := \033[0m

# Docker compose files
DOCKER_COMPOSE_BASE := docker-compose.yml
DOCKER_COMPOSE_PROD := docker-compose.production.yml

# Compose commands for each environment
# Local uses default behavior (auto-loads docker-compose.override.yml)
DC_LOCAL := docker compose
# Production requires explicit files
DC_PROD  := docker compose -f $(DOCKER_COMPOSE_BASE) -f $(DOCKER_COMPOSE_PROD)

# Default environment (can be overridden: make ENV=prod up)
ENV ?= local

# Dynamic compose command based on ENV
ifeq ($(ENV),prod)
  DC := $(DC_PROD)
else
  DC := $(DC_LOCAL)
endif

# Application variables
APP_NAME ?= shadcn-next-app
NODE_ENV ?= development
