# Specialist Search Platform

This is the server-side of a platform for searching specialists, allowing users to find professionals in various fields through an advanced search system. Specialists are automatically ranked in multiple categories based on their skills, ensuring accurate search results and platform efficiency.

## Tech Stack:
- **Node.js** — for server-side logic.
- **TypeScript** — for writing typed code.
- **Express** — for creating the REST API.
- **MongoDB** and **Mongoose** — for database management.
- **Redis** — for session storage.
- **WebSocket** — for implementing chat functionality (planned).
- **Docker** — for containerizing the application.
- **ElasticSearch** — for search optimization.
- **Jest** — for testing.
- **GitHub Actions** — for automating deployment and testing processes.
- **Passport.js** — for user authentication via email.

## Features:
- **Email** registration and authentication via **Passport.js**.
- Local session storage in **Redis**.
- Advanced **ElasticSearch**-based search system with **Deepl API** integration for automatically translating search queries into English.
- Automated categorization system: specialists do not manually select categories — the system automatically determines the best-fit categories based on their skills.
- A **rating system** that is based on user activity over the past 30 days, average task cost, response time, and reviews (rated from 1 to 10).
- Ratings are assigned to both users and mentors/consultants.
- Interaction with experts can be both free and paid.
- **Task creation** and acceptance within the chat: a user can create a task, and another can accept or reject it.
- **Randomization** of search results to enhance visibility for users with lower ratings.

## MongoDB Schema Visualization:
For a visual representation of the MongoDB schema,  [check out the following link](https://dbdiagram.io/d/66f02eafa0828f8aa6a77277).

## Development Status:
Please note that the platform is still under development. The server-side functionality is being actively worked on, and significant parts are not yet implemented. The client-side will be developed and deployed in a separate repository once the server-side functionality is in place.
