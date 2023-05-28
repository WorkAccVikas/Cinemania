// eslint-disable-next-line no-unused-vars
import React from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Trending />
      <div style={{ height: "1000px" }}>123</div>
    </div>
  );
};

export default Home;
