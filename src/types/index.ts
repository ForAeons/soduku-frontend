export type Game = {
  boardSize: number;
};

/**
 * Represents the state of a cell. A cell is invalid if it contains a value that
 * is not a number between 1 and 9 or if its row, column, or box contains a
 * duplicate value. A cell is complete if it is in progress and its row, column,
 * and box are all valid and complete. A cell is in progress if it is neither
 * empty, invalid, nor incorrect.
 */
export enum CellState {
  INCORRECT,
  INPROGRESS,
  COMPLETE,
}

/**
 * Represents the state of ta chunk of the board. A chunk is a 3x3 box of cells or
 * a row or column of cells.
 *
 * A chunk is incorrect if it ontains duplicate values or holds an invalid value.
 * A chunck is correct if it is fully filled in and contains no duplicate values.
 * A chunk is in progress if it is neither incorrect nor correct.
 */
export enum ChunkState {
  INCORRECT,
  INPROGRESS,
  COMPLETE,
}

export type Cell = {
  value: string;
  state: CellState;
};

/**
 * Represents the state of a board. The board is represented as a 2D array of
 * cells. The board also keeps track of the validity of each row, column, and
 * box. This is used to quickly update the state of cells when a cell is
 * modified.
 *
 * A row is valid if it contains no duplicate values.
 *
 */
export type Board = {
  size: number;
  chunkSize: number;
  cells: Cell[][];

  rowState: ChunkState[];
  colState: ChunkState[];
  boxState: ChunkState[];
};
