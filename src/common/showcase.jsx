import React from "react";
import "../styles/showcase.css";
// import headerImage from "../images/0007.png";

const Showcase = () => {
  return (
    <div className="showcase-content">
      {/* <img src={headerImage} className="logo" alt="background" style={{width:180,height:180}}/> */}
      <img
        src="https://i.imgur.com/dHzSCmK.png"
        className="logo"
        alt="background"
        style={{ width: 180, height: 180 }}
      />
      <h1 className="gym-name">
        <span className="primarySpan">Shoping </span> zone
      </h1>
      <p className="quote">it's more than just a shop ...</p>
    </div>
  );
};

export default Showcase;
