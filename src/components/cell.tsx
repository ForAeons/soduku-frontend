import { Cell, CellState } from "../types/index.ts";
import BoardSlice from "../store/slice/boardSlice.ts";
import { useDispatch } from "react-redux";

const CellStateToClassName = (state: CellState): string => {
  switch (state) {
    case CellState.INCORRECT:
      return "bg-red-300 hover:bg-red-200";
    case CellState.COMPLETE:
      return "bg-green-300 hover:bg-green-200";
    case CellState.INPROGRESS:
      return "bg-blue-300 hover:bg-blue-200";
  }
};

interface CellProps {
  cell: Cell;
  row: number;
  column: number;
}

const SingleCell: React.FC<CellProps> = ({ cell, row, column }: CellProps) => {
  const dispatch = useDispatch();

  const className =
    CellStateToClassName(cell.state) +
    " shadow-md hover:shadow-xl h-12 w-12 rounded-md text-center transition-all duration-300";

  return (
    <div>
      <input
        className={className}
        type="text"
        value={cell.value}
        onChange={(e) => {
          dispatch(
            BoardSlice.actions.modifyCell({
              value: e.target.value,
              row,
              column,
            })
          );
        }}
      />
    </div>
  );
};

export default SingleCell;
