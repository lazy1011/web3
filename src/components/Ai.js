import React from "react";
import { Box, Typography } from "@mui/material";
import AiBg from "../assets/ai-bg.png";
import { motion } from "framer-motion";
import { boxVariant, staggerContainer } from "../Utils/motion";
const Ai = () => {
  return (
    <>
      <Box position="relative" sx={{ overflowX: "hidden" }}>
        <Box
          component="img"
          sx={{
            height: { xs: 340, md: 400, xl: 570 },
            width: "100%",
            // background:"url('./assets/ai-bg.png')"
          }}
          alt="background-image"
          src={AiBg}
        />
        <motion.div variants={boxVariant(0.35)}>
          <Box
            position="absolute"
            top="0"
            left="0"
            sx={{
              height: { xs: 340, md: 400, xl: 570 },
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "30px", md: "45px", xl: "60px" },
                color: "#D9D9D9",
                fontWeight: "600",
                textAlign: "center",
                width: { xs: "75%", md: "50%" },
              }}
            >
              Ensuring Gasless, Multichain Platform for Accessible Trading
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default Ai;
