# Nest.js Project

This is a sample Nest.js project demonstrating CRUD operations for managing users, integrated with MongoDB and RabbitMQ.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/nestjs-project.git
    ```

2. **Install dependencies:**

    ```bash
    cd nestjs-project
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and provide the following environment variables:

    ```
    MONGODB_URI=mongodb://localhost:27017/your-database-name
    RABBITMQ_URL=amqp://localhost
    ```

    Replace `your-database-name` with the name of your MongoDB database.

## Usage

1. **Start the server:**

    ```bash
    npm run start
    ```

2. The server should now be running on `http://localhost:3000`.

## API Endpoints

- **GET /users**: Retrieve all users.
- **GET /users/:id**: Retrieve a user by ID.
- **POST /users**: Create a new user.
- **PUT /users/:id**: Update an existing user.
- **DELETE /users/:id**: Delete a user by ID.

## Folder Structure

nestjs-project/
├── src/
│ ├── user/
│ │ ├── user.controller.ts
│ │ ├── user.schema.ts
│ │ ├── user.service.ts
│ ├── rabbitmq/
│ │ ├── rabbitmq.module.ts
│ │ ├── rabbitmq.service.ts
│ ├── app.module.ts
├── .env
├── package.json
├── README.md

