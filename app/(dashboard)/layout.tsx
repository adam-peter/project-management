import React from "react";

import "@/styles/globals.css";
import GlassPane from "@/components/GlassPane";

type DashboardLayoutType = { children: React.ReactNode };

const DashboardLayout: React.FC<DashboardLayoutType> = ({ children }) => {
  return (
    <html>
      <head />
      <body className="rainbow-mesh h-screen w-screen p-6">
        <GlassPane className="height-full flex w-full items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
};

export default DashboardLayout;
