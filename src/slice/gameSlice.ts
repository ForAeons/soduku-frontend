import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "../types";

const initialState: Game = {
  boardSize: 9,
};

export const GameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {
    setBoardSize: (state, action: PayloadAction<number>) => {
      state.boardSize = action.payload;
    },
  },
});
