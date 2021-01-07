Chatter
Project Description
Chatter is a full-stack social media application designed to help people conenct and communicate online. Users are able to register for an account and can subsequently create individial posts that are displayed on the application's home screen in real-time. Those posts can then be liked and commented on by other Chatter users. The platforms also enables users to communicate in real-time through private chat rooms.

Demo: Coming Soon!

Features
Account registration and authentication (JWT Tokens and Password Hashing)
Session and login state persistence (local storage)
Ability to add, delete and update both posts and comments
User live chat (Socket.io)
How to run the application
Install Node.js from the https://nodejs.org/en/
Clone the project by running $git clone https://github.com/RahulAggarwal1016/Chatter.git
Cd and run the command $npm i in the backend folder to install all the required dependencies and packages (listed below)
Run $npm run dev to initiate the backend server (should open at http:/localhost:4444)
Cd and run the command $npm i in the frontend folder to install all the required dependencies and packages (listed below)
Run $npm run dev to initiate the client side application (should open at http://localhost:7777)
You're all done!
Technologies and Services Used
React.js, Apollo-client, Nodemailer, Node.js, Express.js, Apollo-Server, GraphQL, MongoDB, Socket.io, Sentry

External Packages - Frontend
"@apollo/client": "^3.2.7",
"@sentry/browser": "^5.29.2",
"@sentry/react": "^5.29.2",
"@sentry/tracing": "^5.29.2",
"@testing-library/jest-dom": "^5.11.4",
"@testing-library/react": "^11.1.0",
"@testing-library/user-event": "^12.1.10",
"apollo-link-context": "^1.0.20",
"emailjs-com": "^2.6.4",
"graphql": "^15.4.0",
"graphql-tag": "^2.11.0",
"history": "^5.0.0",
"install": "^0.13.0",
"jwt-decode": "^3.1.2",
"moment": "^2.29.1",
"npm": "^6.14.9",
"query-string": "^6.13.7",
"react": "^17.0.1",
"react-dom": "^17.0.1",
"react-emoji": "^0.5.0",
"react-router-dom": "^5.2.0",
"react-scripts": "4.0.0",
"react-scroll-to-bottom": "^4.0.0",
"semantic-ui-css": "^2.4.1",
"semantic-ui-react": "^2.0.1",
"socket.io-client": "^3.0.4",
"web-vitals": "^0.2.4"
External Packages - Backend
"apollo-server": "^2.19.0",
"apollo-server-express": "^2.19.1",
"bcryptjs": "^2.4.3",
"child_process": "^1.0.2",
"cors": "^2.8.5",
"dotenv": "^8.2.0",
"express": "^4.17.1",
"graphql": "^15.4.0",
"jsonwebtoken": "^8.5.1",
"mongoose": "^5.10.15",
"socket.io": "^3.0.4"
