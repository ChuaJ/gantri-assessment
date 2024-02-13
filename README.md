# Gantri Assessment

## Setup

### Prerequisites
1. A PostgreSQL server with newly created database 
    - Project default database name reference is `development`

### Steps to run this project:

1. Run `npm i` command to install dependencies.
2. Setup database settings:
    - Create a `.env` file in project root following `.env.example`
    - Alternatively, directly update `config.ts` with your database credentials
3. Run `npm run migration:up` command to create database tables.
4. Seed `art` table with Tate Modern art data set
5. Run `npm start` to start server
    - Default settings will run server on `http://localhost:3000/api`

### Available endpoints

- GET `/api/art` - View the entire art data set
- GET `/api/art/:id` - View art data by ID
- POST `/api/art/:id/comments` - Add a comment for an art data entry
    - Example POST body:
    ```json
    {
        "userID": "67e0759d-80ed-4b20-82c5-dbf83110065b",
        "name": "Jesse",
        "content": "Wow!"
    }
    ```
- POST `/api/users` - Create user
    - Example POST body:
        ```json
        {
            "name": "Jesse",
            "age": 28,
            "location": "San Francisco"
        }
        ```
- GET `/api/users` - See all users
