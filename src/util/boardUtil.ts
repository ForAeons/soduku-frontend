import { Board, CellState, ChunkState } from "../types";

/**
 *
 * @param size the size of the board (e.g. 9 for a 9x9 board). It must be
 * a perfect square.
 */
export const newGame = (size: number): Board => {
  if (Math.sqrt(size) % 1 !== 0) {
    throw new Error("Board size must be a perfect square");
  }

  return {
    size,
    chunkSize: Math.sqrt(size),
    cells: Array.from({ length: size }, () =>
      Array.from({ length: size }, () => ({
        value: "",
        state: CellState.INPROGRESS,
      }))
    ),
    rowState: Array.from({ length: size }, () => ChunkState.INPROGRESS),
    colState: Array.from({ length: size }, () => ChunkState.INPROGRESS),
    boxState: Array.from({ length: size }, () => ChunkState.INPROGRESS),
  };
};

export const UpdateBoard = (board: Board, newBoard: number[][]): void => {
  if (newBoard.length !== board.size) {
    throw new Error("New board must be the same size as the old board");
  }

  // Update the board
  for (let i = 0; i < newBoard.length; i++) {
    for (let j = 0; j < newBoard[i].length; j++) {
      board.cells[i][j].value = newBoard[i][j].toString();
    }
  }

  for (let i = 0; i < board.size; i++) {
    updateRow(board, i); // Update the row first
    updateColumn(board, i); // Update the column next
    updateBox(board, i); // Update the box last
  }
  updateCellStates(board); // Reset the modified state of the cell
};

/**
 * Update a specific cell in the board and update the state of the board (row, column, and box)
 * @param row the row of the cell
 * @param column the column of the cell
 * @param value the value to set the cell to
 * @returns
 */
export const UpdateCell = (
  board: Board,
  row: number,
  column: number,
  value: string
): void => {
  board.cells[row][column].value = value;

  const boxNum =
    Math.floor(row / board.chunkSize) * board.chunkSize +
    Math.floor(column / board.chunkSize);

  updateRow(board, row); // Update the row first
  updateColumn(board, column); // Update the column next
  updateBox(board, boxNum); // Update the box last

  updateCellStates(board); // Reset the modified state of the cell
};

/**
 * Checks whether the specified row is valid in the given board. Updates
 * the validRow property of the board accordingly.
 * @param board
 * @param row
 * @returns whether the row is valid
 */
const updateRow = (board: Board, row: number): void => {
  const rowValues = board.cells[row].map((cell) => cell.value);
  console.log(rowValues);
  const state = checkSet(board, rowValues);
  console.log(state);
  board.rowState[row] = state;
};

/**
 * Checks whether the specified column is valid in the given board. Updates
 * the validColumn property of the board accordingly.
 * @param board
 * @param row
 * @returns whether the column is valid
 */
const updateColumn = (board: Board, column: number): void => {
  const columnValues = board.cells.map((row) => row[column].value);
  const state = checkSet(board, columnValues);
  board.colState[column] = state;
};

/**
 * Checks whether the specified box is valid in the given board. Updates
 * the validBox property of the board accordingly.
 * @param board
 * @param row
 * @returns whether the box is valid
 */
const updateBox = (board: Board, box: number): void => {
  const boxValues = [];
  const startRow = Math.floor(box / board.chunkSize) * board.chunkSize;
  const startColumn = (box % board.chunkSize) * board.chunkSize;
  for (let row = startRow; row < startRow + board.chunkSize; row++) {
    for (
      let column = startColumn;
      column < startColumn + board.chunkSize;
      column++
    ) {
      boxValues.push(board.cells[row][column].value);
    }
  }
  const state = checkSet(board, boxValues);
  board.boxState[box] = state;
};

const checkSet = (board: Board, values: string[]): ChunkState => {
  const filteredValues = values.filter(
    (value) =>
      value !== "" && // value is not empty
      !Number.isNaN(Number(value)) && // value is a number
      Number(value) <= board.size && // value is within the range of the board
      Number(value) > 0
  );

  const set = new Set(filteredValues);
  if (set.size !== filteredValues.length) {
    return ChunkState.INCORRECT; // duplicate values
  }

  if (set.size === board.size) {
    return ChunkState.COMPLETE; // no duplicate values and all values are filled in
  }

  return ChunkState.INPROGRESS; // no duplicate values but not all values are filled in
};

const updateCellStates = (board: Board): void => {
  let isValidBoard = true;
  for (let i = 0; i < board.size; i++) {
    isValidBoard =
      isValidBoard &&
      board.rowState[i] !== ChunkState.INCORRECT &&
      board.colState[i] !== ChunkState.INCORRECT &&
      board.boxState[i] !== ChunkState.INCORRECT;
  }

  for (let r = 0; r < board.size; r++) {
    for (let c = 0; c < board.size; c++) {
      const cell = board.cells[r][c];
      cell.state = decideFinalState(
        isValidBoard,
        board.rowState[r],
        board.colState[c],
        board.boxState[
          Math.floor(r / board.chunkSize) * board.chunkSize +
            Math.floor(c / board.chunkSize)
        ]
      );
    }
  }
};

const decideFinalState = (
  isValidBoard: boolean,
  ...states: ChunkState[]
): CellState => {
  const r1 = states.filter((state) => state !== ChunkState.INCORRECT);
  // if one of the states is incorrect, the final state is incorrect
  if (r1.length < states.length) {
    return CellState.INCORRECT;
  }

  if (!isValidBoard) {
    return CellState.INPROGRESS;
  }

  const r2 = r1.filter((state) => state !== ChunkState.COMPLETE);
  // if one of the states is in complete, the final state is in complete
  if (r2.length < r1.length) {
    return CellState.COMPLETE;
  }

  return CellState.INPROGRESS;
};

/**
 * Resets the board to its initial state.
 */
export const ResetBoard = (board: Board): void => {
  board.cells.forEach((row) =>
    row.forEach((cell) => {
      cell.value = "";
      cell.state = CellState.INPROGRESS;
    })
  );
};
