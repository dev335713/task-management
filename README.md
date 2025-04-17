# Task Manager API

This is a full-featured Task Manager API built with Node.js, Express, and MongoDB.

## Setup Instructions

```bash
git clone <repo-url>
cd task-manager-api
npm install
npm run dev
```

## Features
- User authentication (JWT)
- Tasks and Projects with dependencies
- User collaboration and comments
- Filtering, sorting, pagination
- Monitoring and API rate limiting
- Docker support

## Postman Collection
Import the collection from `postman/TaskManagerAPI.postman_collection.json`

## Database Setup
Uses MongoDB. Ensure it's running on `localhost:27017` or update the URI in `.env`.

## Tests
```bash
npm test
```

## Docker
```bash
docker-compose up --build
```

## For Testing Purpose I had deployed it at https://task-management-7wop.onrender.com/