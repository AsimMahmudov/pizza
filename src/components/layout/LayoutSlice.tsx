import React, { FC, ReactNode } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import scss from "./LayoutSlice.module.scss";

interface LayoutSliceProps {
  children: ReactNode;
}

const LayoutSlice: FC<LayoutSliceProps> = ({ children }) => {
  return (
    <div className={scss.LayoutSlice}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutSlice;
