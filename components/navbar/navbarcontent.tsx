import React from "react";
import LogoButton from "./logoButton";

const Navbarcontent = () => {
  return (
    <>
      <div className="flex items-center">
        <div className="md:flex flex-row items-center my-1">
          <LogoButton />
        </div>
      </div>
    </>
  );
};

export default Navbarcontent;
