import { useState } from "react";
import toast from "react-hot-toast";

const MatrixComponent = () => {
  const [matrix, setMatrix] = useState([
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ]);
  const [disabledCells, setDisabledCells] = useState(new Set<string>());
  type Player = "x" | "o";
  const [currentPlayer, setCurrentPlayer] = useState<Player>("x");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) {
    const value = e.target.value;
    
    const isValidValue = (value: string): boolean => {
      if (currentPlayer === "x") return /^[x]$/i.test(value);
      if (currentPlayer === "o") return /^[o]$/i.test(value);
      return false;
    };

    if (isValidValue(value)) {
      setMatrix((prevMatrix) => {
        const newMatrix = prevMatrix.map((r) => [...r]);
        newMatrix[row][col] = value;
        return newMatrix;
      });
      setDisabledCells((prevSet) => new Set(prevSet).add(`${row}-${col}`));
      setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
    } else {
      toast.error(`press ${currentPlayer}`);
    }
  }

  return (
    <>
      <h2 className="text-3xl">
        currentPlayer:
        <span
          className={currentPlayer === "x" ? "text-red-600" : "text-blue-600"}
        >
          &nbsp;
          {currentPlayer}
        </span>
      </h2>
      <table>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="p-[10px] text-center">
                  <div className="flex flex-row gap-3">
                    {cell}
                    {disabledCells.has(`${rowIndex}-${colIndex}`) ? (
                      <input
                        value={cell}
                        className="border-white opacity-50 border rounded-md w-8 text-center"
                        type="text"
                        disabled={true}
                      />
                    ) : (
                      <input
                        className={`border-white border rounded-md w-8 text-center ${
                          currentPlayer === "x"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                        type="text"
                        maxLength={1}
                        onChange={(e) => handleChange(e, rowIndex, colIndex)}
                      />
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MatrixComponent;
