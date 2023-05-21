import express = require('express')
import cors = require('cors')

const { Server } = require('socket.io')
const app = express()
const helmet = require('helmet')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/user.routes')

require("dotenv").config()

const server = require("http").createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost",
    credentials: "true"
  }
})

app.use(helmet());
app.use(cookieParser());
app.use(cors({
  origin: "",
  credentials: true
}));
app.use(express.json());

app.use('/api', userRouter);

io.on("connect", (socket: any) => {
  console.log(socket)
})

server.listen(4000, () => {
  console.log('listen 4000')
});

//https://youtu.be/fN25fMQZ2v0?t=3179
