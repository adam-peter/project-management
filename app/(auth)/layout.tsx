import React from "react";

import "@/styles/globals.css";
import GlassPane from "@/components/GlassPane";

type AuthLayoutType = { children: React.ReactNode };

const AuthLayout: React.FC<AuthLayoutType> = ({ children }) => {
  return (
    <html>
      <head />
      <body className="rainbow-mesh h-screen w-screen p-6">
        <GlassPane className="h-full flex w-full items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
};

export default AuthLayout;
