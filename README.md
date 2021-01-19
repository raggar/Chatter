# Chatter

## Project Description

Chatter is a full-stack social media application that helps people connect and communicate online. Users are able to register for an account and can subsequently create individual posts that are displayed on the application's home screen in real-time. Those posts can then be liked and commented on by other Chatter users. The platform also enables registrants to communicate in real-time through private chat rooms.

Demo Link: https://client-chatter.herokuapp.com/

## Features

- Account registration and authentication (JWT Tokens and Password Hashing)
- Session and login state persistence (local storage)
- Ability to add, delete and update both posts and comments
- User live chat (Socket.io)
- User video chat (Twilio API)

## How to run the application

1. Install Node.js from the https://nodejs.org/en/
2. Clone the project by running `$git clone https://github.com/RahulAggarwal1016/Chatter.git`
3. Cd and run the command `$npm i` in the backend folder to install all the required dependencies and packages (listed below)
4. Run `$npm run dev` to initiate the backend server (should open at http:/localhost:4444)
5. Cd and run the command `$npm i` in the frontend folder to install all the required dependencies and packages (listed below)
6. Run `$npm run dev` to initiate the client side application (should open at http://localhost:7777)
7. You're all done!

## Technologies and Services Used

React.js, Apollo-client, Nodemailer, Node.js, Express.js, Apollo-Server, GraphQL, MongoDB, Socket.io, Sentry, Twilio

## External Packages - Frontend

- "@apollo/client": "^3.2.7",
- "@sentry/browser": "^5.29.2",
- "@sentry/react": "^5.29.2",
- "@sentry/tracing": "^5.29.2",
- "@testing-library/jest-dom": "^5.11.4",
- "@testing-library/react": "^11.1.0",
- "@testing-library/user-event": "^12.1.10",
- "apollo-link-context": "^1.0.20",
- "emailjs-com": "^2.6.4",
- "graphql": "^15.4.0",
- "graphql-tag": "^2.11.0",
- "history": "^5.0.0",
- "install": "^0.13.0",
- "jwt-decode": "^3.1.2",
- "moment": "^2.29.1",
- "npm": "^6.14.9",
- "query-string": "^6.13.7",
- "react": "^17.0.1",
- "react-dom": "^17.0.1",
- "react-emoji": "^0.5.0",
- "react-router-dom": "^5.2.0",
- "react-scripts": "4.0.0",
- "react-scroll-to-bottom": "^4.0.0",
- "semantic-ui-css": "^2.4.1",
- "semantic-ui-react": "^2.0.1",
- "socket.io-client": "^3.0.4",
- "web-vitals": "^0.2.4"

## External Packages - Backend

- "apollo-server": "^2.19.0",
- "apollo-server-express": "^2.19.1",
- "bcryptjs": "^2.4.3",
- "body-parser": "^1.19.0",
- "child_process": "^1.0.2",
- "cors": "^2.8.5",
- "dotenv": "^8.2.0",
- "express": "^4.17.1",
- "express-pino-logger": "^5.0.0",
- "graphql": "^15.4.0",
- "jsonwebtoken": "^8.5.1",
- "mongoose": "^5.10.15",
- "node-env-run": "^4.0.2",
- "nodemon": "^2.0.7",
- "npm-run-all": "^4.1.5",
- "pino-colada": "^2.1.0",
- "socket.io": "^3.0.4",
- "twilio": "^3.54.1"

## Image Gallery 

![Screen Shot 2021-01-10 at 4 49 31 PM](https://user-images.githubusercontent.com/35639417/104136458-41c1ff80-5364-11eb-89b1-2a9e9a82ccbd.png)
![Screen Shot 2021-01-10 at 4 49 23 PM](https://user-images.githubusercontent.com/35639417/104136459-425a9600-5364-11eb-9ced-a2418f722b2c.png)
![Screen Shot 2021-01-10 at 4 50 13 PM](https://user-images.githubusercontent.com/35639417/104136460-425a9600-5364-11eb-9473-1029a067812d.png)
![Screen Shot 2021-01-10 at 4 50 24 PM](https://user-images.githubusercontent.com/35639417/104136461-425a9600-5364-11eb-8e6c-3efda901eb82.png)
![Screen Shot 2021-01-10 at 4 51 43 PM](https://user-images.githubusercontent.com/35639417/104136462-42f32c80-5364-11eb-8ea4-6d7cf3df67ea.png)
![Screen Shot 2021-01-10 at 4 52 07 PM](https://user-images.githubusercontent.com/35639417/104136463-42f32c80-5364-11eb-85ca-bfa59eb657c1.png)
