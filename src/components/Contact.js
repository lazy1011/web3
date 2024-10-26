import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { BsDiscord } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { MdCall } from "react-icons/md";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { boxVariant, staggerContainer } from "../Utils/motion";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";

const CustBox = styled(Box)({
  width: 140,
  height: 140,
  background: "#111",
  backdropFilter: "blur(7px)",
  borderRadius: "50%",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  cursor: "pointer",
});

const Contact = () => {
  return (
    <>
      <div id="join"></div>
      {/* <motion.div 
       variants={staggerContainer}
       initial="hidden"
       whileInView="show"
       viewport={{ once: false, amount: 0.25 }}
      >
    
      <Stack
        sx={{
          background: "url(ai-rev-bg.png)",
          alignItems: "center",
          justifyContent: "center",
          padding: { xs: "60px 0 90px" },
        }}
      >
        <motion.div variants={boxVariant(1)}>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { xs: "35px", sm: "35px" },
            color: "#111",
            padding: "10px",
            marginBottom: "10px",
            textTransform: "UpperCase",
            textAlign: "center",
          }}
        >
          Join Gasless Revolution
        </Typography>
        </motion.div>
        <motion.div variants={boxVariant(1.1)}>
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: { xs: "17px", md: "23px" },
            color: "#212121",
            padding: "10px",
            marginBottom: "15px",
            textAlign: "center",
          }}
        >
          Join our community, and be a part of the Gasless Revolution
        </Typography>
        </motion.div>
        <motion.div variants={boxVariant(1.3)}>
        <Stack
          sx={{
            flexDirection: { md: "row", xs: "column" },
            gap: "30px",
            margin: "20px",
          }}
        >
          <a
            href="https://twitter.com/0xGasless?s=21"
            target="_blank"
            rel="noreferrer"
          >
            <CustBox>
              <BsTwitter style={{ color: "blue", fontSize: "43px" }} />
              <Typography sx={{ color: "#fff" }}>Twitter</Typography>
            </CustBox>
          </a>
          <a href="https://t.me/Gasless0x" target="_blank" rel="noreferrer">
            <CustBox>
              <FaTelegram style={{ color: "blue", fontSize: "43px" }} />
              <Typography sx={{ color: "#fff" }}>Telegram</Typography>
            </CustBox>
          </a>
          <a href="" target="_blank">
            <CustBox>
              <BsDiscord style={{ color: "blue", fontSize: "43px" }} />
              <Typography sx={{ color: "#fff" }}>Discord</Typography>
            </CustBox>
          </a>
        </Stack>
        </motion.div>
      </Stack>
      </motion.div> */}
      <Stack
        sx={{
          background: "black",
          flexDirection: { md: "row", xs: "column" },
          alignItems: "center",
          justifyContent: "space-between",
          padding: { md: "16px 28px", xs: "10px" },
          gap: "15px",
        }}
      >
        <Stack direction="row" alignItems="center" gap="10px">
          <img src="logo.svg" alt="logo" width={50} />
          <Typography
            sx={{
              fontSize: { lg: "20px", xs: "15px" },
              fontWeight: "500",
              fontFamily: "DM Mono",
              color: "white",
            }}
          >
            0xGasless
          </Typography>
        </Stack>
        <Typography
          sx={{
            fontSize: { lg: "20px", xs: "15px" },
            fontWeight: "500",
            fontFamily: "DM Mono",
            color: "white",
          }}
        >
          ©️ ️0xGasless. All rights reserved
        </Typography>
        <Stack direction="row" gap="8px" alignItems="center">
          <IconButton href="https://twitter.com/0xGasless" target="_blank">
            <TwitterIcon
              sx={{
                color: "white",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  color: "#B25FD5",
                  transform: "Scale(1.2)",
                },
                "&:focus": {
                  color: "#B25FD5",
                  transform: "Scale(1.03)",
                },
              }}
            />
          </IconButton>
          <IconButton href="https://t.me/Gasless0x" target="_blank">
            <TelegramIcon
              sx={{
                color: "white",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  color: "#B25FD5",
                  transform: "Scale(1.2)",
                },
                "&:focus": {
                  color: "#B25FD5",
                  transform: "Scale(1.03)",
                },
              }}
            />
          </IconButton>
          
        </Stack>
      </Stack>
    </>
  );
};

export default Contact;
