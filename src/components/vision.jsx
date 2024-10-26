import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { slideIn, staggerContainer, zoomIn } from "../Utils/motion";
const vision = () => {
  return (
    <>
      <div id="vision"></div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <Box
          sx={{
            padding: { xs: "60px 20px", md: "90px 40px" },
            backgroundImage: `url('vision_bg.svg')`,
            backgroundColor: "#212121",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        >
          <Stack sx={{ flexDirection: "row", justifyContent: "center" }}>
            <motion.div
              variants={zoomIn(0.2, 0.6)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack
                gap={3}
                sx={{
                  maxWidth: { xs: "90%", sm: "90%", md: "80%" },
                  border: "3px solid #515151",
                  padding: { xs: "20px", xl: "30px" },
                  zIndex: "1",
                  backgroundColor: "#000",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "600",
                    color: "white",
                    fontSize: { xl: "40px" },
                  }}
                >
                  VISION
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xl: "26px" } }}
                  color="white"
                >
                  The objective of 0xGasless is to eliminate gas fees and
                  enhance accessibility in cryptocurrency trading, fostering
                  mass adoption. By building Gasless Swap DEX on all major Layer
                  1 (L1) chains, the team aims to enhance the user experience
                  for non-technical individuals. Gasless Swap eliminates gas
                  fees, making transactions more affordable and accessible to
                  new users.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xl: "26px" } }}
                  color="white"
                >
                  By offering a user-friendly, cost-effective, and decentralized
                  multichain platform, 0xGasless aims to empower a diverse range
                  of individuals to engage in the cryptocurrency world, driving
                  its widespread adoption.
                </Typography>
              </Stack>
            </motion.div>
          </Stack>
        </Box>
      </motion.div>
    </>
  );
};

export default vision;
