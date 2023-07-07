import React from "react";
import { useSelector, useDispatch } from "react-redux";
import store, { RootState } from "../store";
import SingleCell from "./cell";
import { BoardSlice } from "../store/slice";
import { GeneratePuzzle, GetSolution } from "../store/thunk/boardThunk";

const Board: React.FC = () => {
  const sodukuBoard = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(BoardSlice.actions.reset());
  };

  const handleGeneratePuzzle = () => {
    store.dispatch(GeneratePuzzle("expert"));
  };

  const handleAutoSolve = () => {
    store.dispatch(GetSolution(sodukuBoard));
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col w-max h-auto">
      <div className="grid grid-cols-9 grid-rows-9 gap-2">
        {sodukuBoard.cells.flatMap((row, rowIndex) => {
          return row.map((cell, colIndex) => {
            return (
              <SingleCell
                key={rowIndex * 31 + colIndex}
                cell={cell}
                row={rowIndex}
                column={colIndex}
              />
            );
          });
        })}
      </div>
      <div className="flex flex-row justify-between mt-3 ">
        <button
          className=" bg-purple-400 rounded-md py-1 px-2 hover:bg-purple-300 shadow-md"
          onClick={handleGeneratePuzzle}
        >
          Generate Puzzle
        </button>
        <button
          className=" bg-yellow-400 rounded-md py-1 px-2 hover:bg-yellow-300 shadow-md"
          onClick={handleReset}
        >
          Reset Board
        </button>
        <button
          className="bg-teal-400 rounded-md py-1 px-2 hover:bg-teal-300 shadow-md"
          onClick={handleAutoSolve}
        >
          Solve4Me
        </button>
      </div>
    </div>
  );
};

export default Board;
