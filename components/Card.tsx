import React from "react";

interface CardProps {
  className: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div className={`rounded-3xl bg-white px-10 py-4 drop-shadow-xl ${className}`}>
      {children}
    </div>
  );
};

export default Card;
