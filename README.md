# Web Scrapping GE

A web scraping project that periodically extracts the latest football match events from Globo Esporte's website.

## Table of Contents

- [Stacks](#stacks)
- [Features](#features)
  - [General Flow](#general-flow)
- [Folder Structure](#folder-structure)
- [Installation](#installation-coming-soon)
- [Notes](#notes)
- [Routes](#routes)
- [Author](#author)

## Stacks

- TypeScript
- Node.js
- Fastify (HTTP server)
- Cheerio (HTML parsing and scraping)
- Axios (HTTP client)
- node-cron (for scheduled jobs)
- BullMQ (for job queue management)
- Vitest (for unit and integration testing)
- Redis (used by BullMQ for job queue storage)

## Features

- Periodically fetch active football matches from Globo Esporte
- Scrape live events from active matches every 30 seconds
- Generate a unique fingerprint for each event to prevent duplicates
- Determine when a match is over and stop scraping it
- Queue system for scraping individual matches concurrently

### General Flow

1. A cron job runs every 30 seconds to detect active matches.
2. For each active match, a job is created in the queue.
3. The job scrapes new events for that match and stores them if they're not duplicated.
4. When a match is over (`isGameOver()`), it is marked as saved and removed from the queue.

## Folder Structure

```
src/
├── core/                  # Global types, custom errors, interfaces
│   ├── errors/
│   ├── types/
│   └── interfaces/
├── jobs/                  # Scheduled and queued job definitions
├── http/                  # HTTP layer
│   ├── controllers/
│   └── routes/
├── domain/                # Domain logic (DDD structure)
│   ├── application/       # Use-cases and repository interfaces
│   │   ├── use-cases/
│   │   └── repositories/
│   └── enterprise/        # Domain entities and core business logic
│       └── entities/
├── infra/                 # Infrastructure (e.g., Redis, DB, services)
└── utils/                 # Helpers like fingerprint generator or parsers

test/                      # Automated tests with Vitest
```

## Installation (Coming Soon)

Instructions to set up the project locally will be added here.

## Notes

- Be cautious with the scraping frequency to avoid getting your IP banned. Globo Esporte may implement rate limiting.
- To detect an active match, look for the presence of the `<div class="bstn-aovivo-label">tempo real</div>` element.
- Each scraped event should be assigned a fingerprint (e.g., hash of timestamp + text) to avoid duplicates.
- `isGameOver()` should be modularized as a function that returns a boolean or Promise<boolean>, determining if scraping should stop.

## Routes

| Method | Route          | Description                      |
|--------|----------------|----------------------------------|
| GET    | /matches       | Returns all stored match events  |
| POST   | /scrape        | Manually triggers scraping       |
| GET    | /health        | Health check endpoint            |

## Author

- GitHub - [Felipe Santiago Morais](https://github.com/SantiagoMorais)
- LinkedIn - [Felipe Santiago](https://www.linkedin.com/in/felipe-santiago-873025288/)
- Instagram - [@felipe.santiago.morais](https://www.instagram.com/felipe.santiago.morais)
- Email - [contatofelipesantiago@gmail.com](mailto:contatofelipesantiago@gmail.com)
- [WhatsApp](https://api.whatsapp.com/send?phone=5531996951033&text=Hi%2C%20Felipe%21%20I%20got%20your%20contact%20from%20your%20github.)"