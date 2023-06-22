# CoffeeDoor Brewbar & Coffee shop

Full backend part for CoffeeDoor online store

![Logo](https://i.ibb.co/VxVb9gn/logo-700x191.webp)

## Features

-   Node JS, Express
-   use Mongo DB for database
-   Express validator for field validations
-   Multer for image upload
-   JWT Token
-   Bcrypt for creating password hash
-   4 models for database: Store, Menu, Users, Orders
-   CRUD operations for all models

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_DB`

`SECRET_KEY`

`TELEGRAM_TOKEN`

`TELEGRAM_CHAT_ID`

## Deploy on Heroku

[https://coffeedoor-backend-express.herokuapp.com](https://coffeedoor-backend-express.herokuapp.com)

## Run Locally

Clone the project

```bash
  git clone https://github.com/DKotykhin/Coffeedoor-backend-express.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
npm run dev
# or
yarn
```

Open [http://localhost:3005](http://localhost:3005) with your browser to see the result.

## Author

-   [@DKotykhin](https://github.com/DKotykhin)
