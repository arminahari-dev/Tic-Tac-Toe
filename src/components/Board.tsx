import React from "react";
import Cell from "./Cell";

interface BoardProps {
  matrix: string[][];
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => void;
  gameOver: boolean;
  blur: boolean;
}

const Board: React.FC<BoardProps> = ({
  matrix,
  handleChange,
  gameOver,
  blur,
}) => {
  return (
    <table className={`${blur && "blur-md"}`}>
      <tbody>
        {matrix.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={colIndex} className="p-[10px] text-center">
                <Cell
                  value={cell}
                  onChange={(e) => handleChange(e, rowIndex, colIndex)}
                  disabled={cell !== "" || gameOver}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Board;
