import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { newGame, UpdateCell, ResetBoard } from "../util/boardUtil";

// Payload type for the modifyCell action
type modifyCellPayload = {
  row: number;
  column: number;
  value: string;
};

type resetPayload = {
  size: number;
};

export const BoardSlice = createSlice({
  name: "board",
  initialState: newGame(9),
  reducers: {
    modifyCell: (draft, action: PayloadAction<modifyCellPayload>) => {
      UpdateCell(
        draft,
        action.payload.row,
        action.payload.column,
        action.payload.value
      );
    },
    reset: (draft) => {
      ResetBoard(draft);
    },
    newGame: (_, action: PayloadAction<resetPayload>) => {
      return newGame(action.payload.size);
    },
  },
});

export default BoardSlice;
