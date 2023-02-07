# Todo-App
This simple todo app allows the user to create as well as update their tasks. It also will keep track of the tasks status as well as the number of tasts the user 
currently has.
## Setup
Before being able to use this project, the first thing you will want to do it install all the required packages to ensure you have all the required dependencies you need.
In your terminal, run this command:
```
npm install
```
A `.env` file is required. Environment variables in this project are used for verifying the user information via `jsonwebtoken`.

## Technologies
This Todo application utilizes [PostgreSQL](https://www.postgresql.org/), [React.JS](https://reactjs.org/), [Bcrypt](https://www.npmjs.com/package/bcrypt), [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), and [Express](https://expressjs.com/).

## `PostGreSQL`
This technology is responsble for build and suppliying the database with the information.
The first step to beginning this project is to build the database. You can do so by running this command:
 ```
 npm run seed
 ```
 
 ### `Express`
 In order to be able to create a user, you must go into the ```.env``` file mentioned above. In this file, you need to add a string in order to have a jsonwebtoken secret
 It should be done in this format:
 ```
  JWT_SECRET = '{STRING HERE}'
 ```
 After that, you can now being running the server! To begin running your express server, execute this command in your terminal :
 ```
 npm run server:dev
 ```
 This dev dependenices utilizes `nodemon` to prevent the server from disconnecting. The server will continue to run so you can make instant request.

## `React.js`
This application uses React.js for frontend rendering using componenets. Time to get the frontend rendered. You can do so by running this command:
```
npm run start
```
