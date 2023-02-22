import React from "react";
import clsx from "clsx";

type GlassPaneType = { children: React.ReactNode; className: string };

const GlassPane: React.FC<GlassPaneType> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "rounded-xl border-2 border-solid border-gray-200 bg-slate-200/40 backdrop-blur-lg backdrop-saturate-200 ",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
