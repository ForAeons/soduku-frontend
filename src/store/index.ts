import { configureStore } from "@reduxjs/toolkit";
import { BoardSlice, GameSlice } from "./slice";

const store = configureStore({
  reducer: {
    board: BoardSlice.reducer,
    game: GameSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
