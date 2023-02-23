import React from "react";

interface InputProps {
  className: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`border-gray w-full rounded-3xl border-2 border-solid px-6 py-2 text-lg ${className}`}
      {...props}
    />
  );
};

export default Input;
