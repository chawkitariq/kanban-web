# Kanban Web

A project management web app inspired by tools like Jira and OpenProject, built using the [Kanban Api](https://github.com/chawkitariq/kanban-api). It helps teams manage tasks and workflows using the Kanban methodology.

## Requirements

- [Kanban Api](https://github.com/chawkitariq/kanban-api): Ensure the **Kanban Api** server is running.
- [Docker](https://docs.docker.com/engine/install/): Install Docker and Docker Compose.

## Setup

- Copy the `.env.example` file to `.env` to configure your environment variables.

## Usage

### Developement


```bash
# start application
docker compose -f docker-compose.dev.yml up
```

```bash
# stop application
docker compose -f docker-compose.dev.yml down
```

### Production

```bash
# start application
docker compose up
```

```bash
# stop application
docker compose down
```