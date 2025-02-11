import React from "react";

interface CellProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onChange, disabled }) => {
  return (
    <input
      value={value}
      className={`border-white border rounded-md w-8 text-center ${
        disabled && "opacity-50 cursor-not-allowed"
      }`}
      type="text"
      maxLength={1}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default Cell;
