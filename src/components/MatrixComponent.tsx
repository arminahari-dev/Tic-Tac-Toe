import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ShowWinner from "./ShowWinner";
import XAscii from "./XMark";

const MatrixComponent: React.FC = () => {
  type Player = "x" | "o";
  const [matrix, setMatrix] = useState<Array<string[]>>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("x");
  const [gameWinner, setGameWinner] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isDraw, setIsDraw] = useState<boolean>(false);
  const [blur, setBlur] = useState<boolean>(false);
  const [disableAutoMode, setDisableAutoMode] = useState<boolean>(false);

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
      setDisableAutoMode(true);
    }
    const allCellsFilledWithNoWinner =
      matrix.flat().every((cell) => cell !== "") && !winner;
    if (allCellsFilledWithNoWinner) {
      setIsDraw(true);
      setBlur(true);
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
    setIsDraw(false);
    setBlur(false);
    setDisableAutoMode(false);
  }

  function getRandomMatrixIndex() {
    const emptyCell = [];

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (matrix[row][col] === "") {
          emptyCell.push([row, col]);
        }
      }
    }
    const randomIndex = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    return randomIndex;
  }

  const randomIndex = getRandomMatrixIndex();

  function handleAutoMode() {
    setMatrix((prevMatrix) => {
      const newMatrix = prevMatrix.map((r) => [...r]);
      newMatrix[randomIndex[0]][randomIndex[1]] = "o";
      return newMatrix;
    });
    setCurrentPlayer((prev) => (prev === "x" ? "o" : "x"));
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
      <div className="relative">
        <table className={`${blur && "blur-md"}`}>
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
        {isDraw && <XAscii size={3} />}
      </div>
      {gameWinner && <ShowWinner winner={gameWinner} />}
      <button
        onClick={handleRestart}
        className="bg-sky-500 hover:bg-sky-700 px-4 py-2 rounded-md"
      >
        restart the game
      </button>
      <button
        disabled={disableAutoMode || currentPlayer === "x"}
        onClick={handleAutoMode}
        className={`bg-sky-500 hover:bg-sky-700 px-4 py-2 rounded-md ${
          currentPlayer === "x" || gameOver
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        Auto mode
      </button>
    </>
  );
};

export default MatrixComponent;
