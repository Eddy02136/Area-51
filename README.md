# Area-51

An automation platform that connects multiple services to create 
custom action-reaction workflows.

**Example:** When a Twitch streamer goes live → automatically like a YouTube video.

## Features

- Connect multiple third-party accounts (Discord, Twitch, YouTube, Spotify, GitHub, NASA)
- Create custom triggers (Actions) and automated responses (Reactions)
- Web interface (React) and mobile app (Android)
- REST API with Swagger documentation (`/doc`)
- JWT authentication

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React, TypeScript, CSS |
| Backend | Node.js, NestJS, MongoDB |
| Mobile | Java (Android) |
| Infra | Docker, Docker Compose |

## Getting Started

### Prerequisites

- Docker & Docker Compose

## Configuration

Create a `back-end/.env` file based on `.env.example`.

You need to create an app on each platform to get the credentials:

- **Spotify** -> [developer.spotify.com](https://developer.spotify.com/documentation/web-api)
- **Discord** -> [discord.com/developers](https://discord.com/developers/applications)
- **YouTube** -> [console.cloud.google.com](https://console.cloud.google.com)
- **Twitch** -> [dev.twitch.tv](https://dev.twitch.tv/console)
- **GitHub** -> [github.com/settings/developers](https://github.com/settings/developers)
- **NASA** -> Use `DEMO_KEY` for testing, or get a free key at 
[api.nasa.gov](https://api.nasa.gov) (no app creation needed)

For each service, set the redirect URI to `http://localhost:8080/{service}/callback`.

### Run

```bash
git clone https://github.com/Eddy02136/Area-51.git
cd Area-51
docker compose up -d --build
```

- Web app → [http://localhost:8081](http://localhost:8081)
- API Swagger → [http://localhost:8080/doc](http://localhost:8080/doc)
- Services & actions → [http://localhost:8080/about.json](http://localhost:8080/about.json)

## Contributors

- Eddy Gardes
- Benjamin Gayaud
- Alexandre Chouteau
- Antonin Campi
- Jacques Sapin