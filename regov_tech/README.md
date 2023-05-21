# My App

This is a web application built with React, Typescript, MUI, ExpressJS, and MongoDB. It allows users to register, login, and view their user data on the homepage.

## Features

- User Registration: Users can create an account by providing their username and password. The user information is stored in a MongoDB database.
- User Login: Registered users can log in to the application using their credentials.
- Homepage: After successful login, users are redirected to the homepage where they can view their user data retrieved from the database.

## API Endpoints
The backend server exposes the following API endpoints:

- **/api/login (POST)**: Endpoint for user login. Expects the username and password in the request body.
- **/api/register (POST)**: Endpoint for user registration. Expects the username and password in the request body.
- **/api/user (GET)**: Endpoint to retrieve user data. Requires authentication using JSON Web Tokens (JWT).

## Technologies Used
- React
- Typescript
- Material-UI (MUI)
- ExpressJS
- MongoDB