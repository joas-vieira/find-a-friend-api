# Find A Friend API

Backend API for managing pet adoptions by city, with ONG login, pet listing, filters, and WhatsApp contact.

[🔗 Challenge Details](https://efficient-sloth-d85.notion.site/Desafio-03-0b927eb32dbd4f21ab40224ffdf6cf19)

## Installation

```bash
# Clone the repository
https://github.com/joas-vieira/find-a-friend-api.git
git@github.com:joas-vieira/find-a-friend-api.git

# Navigate into the project folder
cd find-a-friend-api
```

## How to Use

```bash
# Install dependencies
npm install

# Create a .env file based on the .env.example
cp .env.example .env

# Up the Docker containers
docker-compose up -d

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run start:dev
```

## Testing

```bash
# Run unit tests
npm run test:unit

# Run e2e tests
npm run test:e2e
```
