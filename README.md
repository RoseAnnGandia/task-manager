# Simple Task Manager - Node.js + Express + TypeScript

## 📚 Table of Contents
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [🚀 Getting Started](#-getting-started)
  - [1. Clone the repository:](#1-clone-the-repository)
  - [2. Install dependencies:](#2-install-dependencies)
  - [3. Setup environment variables:](#3-setup-environment-variables)
  - [4. Run the application:](#4-run-the-application)
- [Run Tests with Jest:](#run-tests-with-jest)
- [API Structure Overview](#api-structure-overview)
- [API Testing with Bruno](#api-testing-with-bruno)
- [Generate TypeDoc Documentation](#generate-typedoc-documentation)
- [Known Limitations](#known-limitations)
- [References](#references)
- [🙌 Contributions](#-contributions)


This is a simple RESTful API project built with **Node.js**, **Express.js**, and **TypeScript**, using **MongoDB Atlas** as the database. It follows a modular structure to ensure scalability and maintainability. The project also uses **Bruno** for API testing and **Jest** for writing unit and integration tests.

## Project Structure

The project is organized into the following structure:

```
task-manager/              # Project root folder
├── bruno/                 # Bruno workspace (for API testing)
├── config/                # Configuration files (e.g., DB, app settings)
├── docs/                  # Generated documentation by TypeDoc
├── src/                   # Application source code
│   ├── controllers/       # Route handlers
│   ├── middlewares/       # Express middlewares (auth, validation, etc.)
│   ├── models/            # Database schemas (Mongoose models)
│   ├── routes/            # API route definitions
│   ├── services/          # Business logic (e.g., authentication, token)
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions (error handlers, etc.)
│   ├── app.ts             # Initializes Express app and middleware
│   └── index.ts           # Main entry point (starts the server)
├── tests/                 # Test files using Jest
├── .env                   # TypeScript compiler options
├── .gitignore             # Git ignored files (e.g., node_modules, .env)
├── jest.config.js         # Jest configuration file
├── nodemon.json           # Nodemon config for dev server
├── package-lock.json      # NPM dependency lock file
├── package.json           # NPM configuration
├── README.md              # Project documentation
├── tsconfig.json          # Base TypeScript configuration
├── tsconfig.paths.json    # Custom path aliases for TypeScript
└── typedoc.json           # TypeDoc configuration

```

## Requirements

- Node.js
- MongoDB Atlas account (for cloud database)
- TypeScript (for development)
- Bruno (for testing)
  
## Getting Started

### 1. Clone the repository:

```bash
  git clone https://github.com/RoseAnnGandia/task-manager.git
  cd task-manager
```
### 2. Install dependencies:
```bash
  npm install
```
### 3. Setup environment variables:
Create an `.env` file in the root directory and add the following configuration:
```
PORT=your_preferred_port
MONGODB_URI=your_mongodb_atlas_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret_key
REFRESH_TOKEN_SECRET=your_refresh_token_key
```
Replace the MONGODB_URI with your MongoDB Atlas connection string. You can get this from your MongoDB Atlas dashboard.

### 4. Run the application:
To start the application in development mode, use Nodemon:
```bash
  npm run dev
```
This will start the server on the port defined in the `.env` file. Nodemon will automatically restart the server whenever a change is detected in your source files.

## Run Tests with Jest
To run tests using Jest, use the following command:
```bash
npm run test
```
This will run all the tests in the tests folder.
✅ Note: Testing is not yet complete. Only sample tests for `/signup` and `/signin` are currently implemented.

## API Structure Overview
**Controllers:**
Controllers contain the logic to handle incoming HTTP requests. The controllers process the request, perform any necessary business logic, and return a response to the client.

**Middlewares:**
Middlewares are used for tasks like authentication, validation, logging, etc. They run before the actual route handlers and can modify the request or response objects.

**Models:**
Models define the structure of your data. This app uses Mongoose models to interact with a MongoDB database.

**Routes:**
Routes define the endpoints of the API and map them to specific controller functions. For example, routes could define endpoints like /signup and /signin for user authentication.

**Services:**
Services contain business logic that may involve interacting with models. For example, the authService handles user sign-up and sign-in logic.

**Types:**
Types contain TypeScript interfaces and types, ensuring that the data in the app is correctly typed.

**Utils:**
Utility functions are reusable pieces of code that help in various parts of the application, like error handling, data validation, etc.



**Notes:** 
- The testing is not complete. Currently, only a few sample tests have been created for authentication endpoints like /signup and /signin. Additional tests will be added in the future to cover more use cases and ensure the robustness of the application.
- MongoDB indexing for efficient query execution is not yet implemented in this project. The database queries are currently not optimized with indexes. Implementing indexing for common query fields, such as userId or createdAt, will be considered in future updates to enhance query performance.




## API Testing with Bruno
For testing purposes, the Bruno environment configuration can be set up to include the following variables. These variables are used in the requests (e.g., POST /signin, GET /tasks, etc.) to avoid hardcoding sensitive values like userId, accessToken, etc.

1. Path to the Environment File:
  - Location: bruno/environments/local.bru
  - Note: This file contains the environment variables for Bruno to execute API requests.

2. Example Configuration:
  The local.bru file should look like this:
```
{
  "endpoint": "http://localhost:3001",
  "taskId": "68149d01bafc6e5d49c9d0cb",
  "userId": "67e162073eab8ac8181eef76",
  "accessToken": "",
  "refreshToken": "",
  "email": "juandelacruz@gmail.com",
  "password": "juan123"
}
```
3. Description of Variables:
  - endpoint: Base URL for the API (e.g., http://localhost:3001 during local development).
  - taskId: A sample task ID to query in test cases.
  - userId: The unique ID of the user (usually from a previous test or setup).
  - accessToken: The token to authenticate requests to protected routes (e.g., Bearer {{token}}).
  - refreshToken: Used for refreshing the accessToken.
  - email: A test email for user-related actions.
  - password: A test password for user sign-in.
4. Important Notes:
  - Ensure that you do not commit the actual local.bru file to version control (i.e., add it to .gitignore).
  - For security, set the accessToken and refreshToken dynamically via authentication tests to avoid exposing sensitive credentials in source control.
  

## Generate TypeDoc Documentation
```bash
npm run docs
```
- This will read from the `typedoc.json` configuration file and output HTML documentation to the `/docs` folder.
- Navigate to `docs/index.html` in your browser.

## Known Limitations
- MongoDB query indexing is not yet implemented.
- Only basic authentication tests are present.

## References
- [Node.js](https://nodejs.org/en/about)
- [Typescript](https://www.typescriptlang.org/)
- [Express.js](https://www.typescriptlang.org/)
- [Ts-Jest](https://kulshekhar.github.io/ts-jest/docs/)
- [Js-Jest](https://jestjs.io/docs/getting-started)
- [Bruno](https://www.usebruno.com/)
  
## 🙌 Contributions
Feel free to fork, suggest improvements, or create issues.


