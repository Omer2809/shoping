import React from "react";
import Showcase from "../common/showcase";
import { NavItemButton } from "../styles/styledButtons";

const styles = {
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  justifyContent: "center",
  flexDirection: "column",
  height: "100vh"
}

const WelcomeScreen = () => {
  return (
    <div style={styles}>
      <Showcase />
      <NavItemButton primary="true" secondary="true" to="/login" style={{ zIndex: 35,marginTop:10 }}>
        Login Here
      </NavItemButton>
    </div>
  );
};

export default WelcomeScreen;
