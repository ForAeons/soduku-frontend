import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import SingleCell from "./cell";
import { BoardSlice, GameSlice } from "../slice";
import { useDispatch } from "react-redux";

const Board: React.FC = () => {
  const sodukuBoard = useSelector((state: RootState) => state.board);
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  const nextBoardSize = game.boardSize === 9 ? 16 : 9;

  const gridClassName = (size: number): string =>
    `grid grid-cols-${size} grid-rows-${size} gap-2`;

  const handleReset = () => {
    dispatch(BoardSlice.actions.reset());
  };

  const handleNewGame = () => {
    dispatch(
      BoardSlice.actions.newGame({
        size: nextBoardSize,
      })
    );
    dispatch(GameSlice.actions.setBoardSize(nextBoardSize));
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-col w-max h-auto">
      <div className={gridClassName(game.boardSize)}>
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
          className=" bg-yellow-400 rounded-md py-1 px-2 hover:bg-yellow-300 shadow-md"
          onClick={handleReset}
        >
          Reset Board
        </button>
        <button
          className="bg-purple-400 rounded-md py-1 px-2 hover:bg-purple-300 shadow-md"
          onClick={handleNewGame}
        >
          {`New ${nextBoardSize} x ${nextBoardSize} Game`}
        </button>
        <button className="bg-teal-400 rounded-md py-1 px-2 hover:bg-teal-300 shadow-md">
          Solve4Me
        </button>
      </div>
    </div>
  );
};

export default Board;
