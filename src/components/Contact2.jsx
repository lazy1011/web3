import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { BsDiscord } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import styled from "@emotion/styled";

const CustBox = styled(Box)({
  width: 90,
  height: 90,
  background: "#111",
  backdropFilter: "blur(3.5px)",
  borderRadius: "50%",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  cursor: "pointer",
});

const Contact2 = () => {
  return (
    <>
      <div id="join"></div>
      <Stack
        sx={{
          background: "url(ai-rev-bg.png)",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "20px 0 20px" },
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "24px",
            color: "#111",
            padding: "5px",
            marginBottom: "5px",
            textTransform: "UpperCase",
            textAlign: "center",
          }}
        >
          Join Gasless Revolution
        </Typography>
        <Stack
          sx={{
            flexDirection: "row",
            gap: "25px",
            margin: "10px",
          }}
        >
          <a
            href="https://twitter.com/0xGasless?s=21"
            target="_blank"
            rel="noreferrer"
          >
            <CustBox>
              <BsTwitter
                style={{ color: "rgb(142,98,153)", fontSize: "24.5px" }}
              />
              <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                Twitter
              </Typography>
            </CustBox>
          </a>
          <a href="https://t.me/Gasless0x" target="_blank" rel="noreferrer">
            <CustBox>
              <FaTelegram
                style={{ color: "rgb(142,98,153)", fontSize: "24.5px" }}
              />
              <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                Telegram
              </Typography>
            </CustBox>
          </a>
          <a href="" target="_blank">
            <CustBox>
              <BsDiscord
                style={{ color: "rgb(142,98,153)", fontSize: "24.5px" }}
              />
              <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                Discord
              </Typography>
            </CustBox>
          </a>
        </Stack>
      </Stack>
    </>
  );
};

export default Contact2;
