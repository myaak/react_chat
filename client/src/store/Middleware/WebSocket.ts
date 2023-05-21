import { Action } from "@reduxjs/toolkit"

export const socketMiddleware = (socket: any) => (params: any) => (next: any) => (action: Action) => {
//  const { dispatch, getState } = params
  const { type } = action

  const SOCKET_CONNECT = 'socket/connect'
  const SOCKET_CLOSE = 'socket/close'

  switch (type) {
    case SOCKET_CONNECT:
      socket.onopen = () => {
        console.log("opened WS")
        socket.send("123")
      }
      socket.onmessage = (data: any) => {
        console.log(data)
      }
      socket.onclose = () => { }
      break

    case SOCKET_CLOSE:
      socket.close()
      break

    default:
      break
  }

  return next(action)
}
