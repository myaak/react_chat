import express = require('express')
import cors = require('cors')

const { Server } = require('socket.io')
const app = express()
const helmet = require('helmet')

const userRouter = require('./routes/user.routes')



require("dotenv").config()

const server = require("http").createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost",
    credentials: "true"
  }
})

app.use(helmet())
app.use(cors({
  origin: "",
  credentials: true
}))
app.use(express.json())

app.use('/auth', userRouter);

io.on("connect", (socket: any) => {
  console.log(socket)
})

server.listen(4000, () => {
  console.log('listen 4000')
});

