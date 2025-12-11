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
DOCKER_COMPOSE_DEV  := docker-compose.development.yaml
DOCKER_COMPOSE_PROD := docker-compose.production.yaml

# Application variables
APP_NAME ?= shadcn-next-app
NODE_ENV ?= development

# Docker variables
DOCKER_EXEC_NODE := docker compose -f $(DOCKER_COMPOSE_DEV) exec -it node
