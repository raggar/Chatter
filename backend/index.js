const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const { PubSub } = require('apollo-server');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

require('dotenv').config();

const resolvers = require('./graphql/resolvers'); // contain logic for each query/mutation (don't need to specify /index at the end since its default file)
const typeDefs = require('./graphql/typeDefs'); // where each query/mutation is defined
const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const app = express();
app.use(cors());
app.use('/join', router);

const httpServer = http.createServer(app);
const io = socketio(httpServer, {
  cors: '*',
});

const pubsub = new PubSub(); // uses websockets to listen for new posts

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // passed to every resolver that executes for a particular operation and enables resolvers to share helpful context
  context: ({ req }) => ({ req, pubsub }), // take request body and forward to context
});

server.applyMiddleware({ app });

io.on('connect', (socket) => {
  console.log('user has connected');
  socket.on('join', ({ name, room }, callback) => {
    console.log('a user has joined');
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    // the following sends data to the client
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // recieve messsage from client and sends it to each room
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

const PORT = process.env.port || 5000;

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database successfully :)');
    return httpServer.listen({ port: PORT });
  })
  .then(() => {
    console.log(
      `Graphql server is running at http://localhost:${PORT}${server.graphqlPath}`
    );
  })
  .catch((err) => {
    console.log(err);
  });
