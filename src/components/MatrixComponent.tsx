import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ShowWinner from "./ShowWinner";

const MatrixComponent = () => {
  const [matrix, setMatrix] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  type Player = "x" | "o";
  const [currentPlayer, setCurrentPlayer] = useState<Player>("x");
  const [gameWinner, setGameWinner] = useState<string>("");
  const [gameOver, setGameOver] = useState(false);

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
      setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
    } else {
      toast.error(`press ${currentPlayer}`);
    }
  }

  useEffect(() => {
    function checkWinner() {
      for (let row = 0; row < 3; row++) {
        if (
          matrix[row][0] &&
          matrix[row][0] === matrix[row][1] &&
          matrix[row][1] === matrix[row][2]
        ) {
          return matrix[row][0];
        }
      }

      for (let col = 0; col < 3; col++) {
        if (
          matrix[0][col] &&
          matrix[0][col] === matrix[1][col] &&
          matrix[1][col] === matrix[2][col]
        ) {
          return matrix[0][col];
        }
      }

      if (
        matrix[0][0] &&
        matrix[0][0] === matrix[1][1] &&
        matrix[1][1] === matrix[2][2]
      ) {
        return matrix[0][0];
      }
      if (
        matrix[0][2] &&
        matrix[0][2] === matrix[1][1] &&
        matrix[1][1] === matrix[2][0]
      ) {
        return matrix[0][2];
      }
    }
    const winner = checkWinner();
    if (winner) {
      setGameWinner(winner);
      setGameOver(true);
    }
  }, [matrix]);

  function handleRestart() {
    setMatrix([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setCurrentPlayer("x");
    setGameWinner("");
    setGameOver(false);
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
                  <input
                    value={cell}
                    className={`border-white border rounded-md w-8 text-center ${
                      gameOver && "opacity-50 cursor-not-allowed"
                    }`}
                    type="text"
                    maxLength={1}
                    onChange={(e) => handleChange(e, rowIndex, colIndex)}
                    disabled={cell !== "" || gameOver}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {gameWinner && <ShowWinner winner={gameWinner} />}
      <button
        onClick={handleRestart}
        className="bg-sky-500 hover:bg-sky-700 px-4 py-2 rounded-md"
      >
        restart the game
      </button>
    </>
  );
};

export default MatrixComponent;
