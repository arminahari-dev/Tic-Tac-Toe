import React from "react";

interface XProps {
  size: number;
}

const XMark: React.FC<XProps> = ({ size }) => {
  function generateXMark(size: number): string {
    let output = "";
    for (let i = 0; i < size; i++) {
      let row = "";
      for (let j = 0; j < size; j++) {
        row += j === i || j === size - 1 - i ? "X" : " ";
      }
      output += row + "\n";
    }
    return output;
  }

  return (
    <div className="top-0 left-[34%] absolute">
      <pre className="text-[30px]">{generateXMark(size)}</pre>
    </div>
  );
};

export default XMark;
