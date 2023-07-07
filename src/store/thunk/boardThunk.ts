import { createAsyncThunk } from "@reduxjs/toolkit";
import { Board } from "../../types";
import { Api } from "../../api";

const api = new Api();

export const GetSolution = createAsyncThunk(
  "board/getSolution",
  async (board: Board) => {
    // Convert board to payload
    const payload: string[][] = [];
    for (let i = 0; i < board.cells.length; i++) {
      payload[i] = [];
      for (let j = 0; j < board.cells[i].length; j++) {
        const value = board.cells[i][j].value || ".";
        payload[i].push(value);
      }
    }

    const response = await api.Post<string[][], number[][]>(
      "soduku/solve",
      payload
    );
    return response;
  }
);

export const GeneratePuzzle = createAsyncThunk(
  "board/generatePuzzle",
  async (difficulty: string) => {
    const response = await api.Get<number[][]>(
      `soduku/generate/?size=${9}&difficulty=${difficulty}`
    );
    return response;
  }
);
