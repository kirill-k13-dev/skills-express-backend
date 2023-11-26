## Backend for Skills

Node.js + Express + Sequelize

## How to setup?

- Clone repo
- `npm i`
- `cp .env.example .env`

## Prerequisites
You must have the following installed:

Node.js v14+
NPM v6+ (comes installed with newer Node versions)
You can check which versions of Node.js and NPM you currently have installed with the following commands:
- `node --version`
- `npm --version`

## Running DB Migrations

- npx sequelize-cli db:create
- npx sequelize-cli db:migrate

## How to run application?

1. Development: 
    - `npm run dev` (using nodemon)
2. Production:
    - `npm start:server` 
    
