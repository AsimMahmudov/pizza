"use client";

import LayoutSlice from "@/components/layout/LayoutSlice";
import ReduxProvider from "@/provider/ReduxProvider";
import React, { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const LayoutClient: FC<LayoutProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <LayoutSlice>{children}</LayoutSlice>
    </ReduxProvider>
  );
};

export default LayoutClient;
