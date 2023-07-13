import React from "react";
import loader from "../../assets/imgs/loader.gif";
import "./Loader.scss";

export const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="Loader" />
    </div>
  );
};
