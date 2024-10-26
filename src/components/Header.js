import React from "react";
import Eth from "../assets/Ethereum.svg";
import { Link } from "react-router-dom";
import { Typography, MenuItem, Select } from "@mui/material";
function Header(props) {
  const { address, isConnected, connect } = props;

  return (
    <header>
      <div className="leftH">
        {/* <img src={Logo} alt="logo" className="logo" /> */}
        <Link to="/" className="link">
          <div className="headerItem">
            <Typography
              sx={{ fontSize: "25px", marginRight: "25px", fontWeight: "700" }}
            >
              0xGasless
            </Typography>
          </div>
        </Link>
      </div>
      <div className="rightH">
        <div className="headerItem">
          <img src={Eth} alt="eth" className="eth" width={40} />
          <Typography
            sx={{
              fontSize: "25px",
              marginRight: "25px",
              fontWeight: "700",
              color: "white",
            }}
          >
            Hello
          </Typography>
        </div>
        <div className="connectButton" onClick={connect}>
          {isConnected
            ? address.slice(0, 4) + "..." + address.slice(38)
            : "Connect"}
        </div>
      </div>
    </header>
  );
}

export default Header;
