import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { socketMiddleware } from "./Middleware/WebSocket";
import { webSocketUrl } from "../server-info";

export const store = configureStore({
  reducer: {
  },
  middleware: [socketMiddleware(new WebSocket(webSocketUrl)), ...getDefaultMiddleware()]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
