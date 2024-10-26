import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const Search = ({ setToggleSearchMenu, setType }) => {
  return (
    <>
      <Stack
        sx={{
          position: "absolute",
          padding: "30px 20px",
          background: "#fff",
          zIndex: "999",
        }}
      >
        <CloseIcon
          onClick={() => {
            setToggleSearchMenu(false);
          }}
          style={{
            cursor: "pointer",
            fontSize: "21px",
            alignSelf: "flex-end",
            margin: "0 0 15px 0",
          }}
        />
        <TextField placeholder="search" />
        <Button
          onClick={(e) => {
            setType(e.target.value);
          }}
          value="ETH"
        >
          Ethereum
        </Button>
        <Button
          onClick={(e) => {
            setType(e.target.value);
          }}
          value="BTC"
        >
          Bitcoin
        </Button>
      </Stack>
    </>
  );
};

export default Search;
