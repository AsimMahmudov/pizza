import React from "react";
import Hero from "./hero/Hero";
import Colla from "./colla/Colla";
import Souse from "./souse/Souse";

const HeroPage = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: "url('https://wallpaper.dog/large/20483614.jpg')",
          height: "500px",
          backgroundSize: "cover",
          width: "100%",
          // background: "red",
        }}
      ></div>
      <div>
        <Hero />
        <Colla />
        <Souse />
      </div>
    </>
  );
};

export default HeroPage;
