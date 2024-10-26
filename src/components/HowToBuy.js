import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { boxVariant, staggerContainer } from "../Utils/motion";

const CostData = [
  {
    id: "01 ",
    title: "Create A wallet",
    content:
      "Download any crypto Wallet and follow the steps to make your wallet. Always remember to keep the 12-word seed phrase a secret! Do not share it with anyone ever! We will never ask you for your seed phrase, ever!",
  },
  {
    id: "02",
    title: "Go to Uniswap",
    content:
      "Go to uniswap.com and click on connect wallet. Select the wallet you just created and connect it.",
  },
  {
    id: "03",
    title: "Swap ETH for $0xGas",
    content:
      "Paste the contract address in the search bar and click on the settings icon. Set the slippage to 12% and swap ETH for $0xGas. You can also swap other tokens for $0xGas.",
  },
];

const HowToBuy = () => {
  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        <div id="buy"></div>
        <Stack
          sx={{
            background: "#111",
            padding: { xs: "10px 20px ", sm: "20px 30px", lg: "50px 30px" },
            alignItems: { xs: "normal", sm: "normal" },
            justifyContent: { xs: "center", sm: "normal" },
            gap: "20px",
          }}
          margin="-10px 0 0"
        >
          <motion.div variants={boxVariant(1)}>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: { xs: "29px", lg: "35px", xl: "60px" },
                color: "#fff",
                margin: "15px 0",
              }}
            >
              How To Buy
            </Typography>
          </motion.div>
          {CostData.map((element) => {
            return (
              <motion.div variants={boxVariant(1.2)}>
                <Box
                  sx={{
                    width: { xs: "98.5%", sm: "92%", lg: "94%", xl: "95%" },
                    height: { xs: 140, lg: 170, xl: 210 },
                    // backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    backgroundColor: "#fff",
                    // backdropFilter: 'blur(7px)',
                    // borderRadius: 4,
                    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    padding: { xs: "30px 5px", sm: "30px 40px", xl: "40px" },
                    marginBottom: { xs: "5px", xl: "15px" },
                    display: "flex",
                    flexDirection: "row",
                    alignItems: { xs: "center", md: "center" },
                    justifyContent: { xs: "center", md: "normal" },
                    gap: { xs: "10px", lg: "20px" },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "6px",
                      borderRight: "1px solid rgba(0, 0, 0, 0.44)",
                      height: "100%",
                      padding: "15px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: {
                          xs: "14px",
                          md: "18px",
                          lg: "21px",
                          xl: "27px",
                        },
                        color: "#111",
                      }}
                    >
                      Step
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "700",
                        fontSize: {
                          xs: "25px",
                          md: "40px",
                          lg: "48px",
                          xl: "68px",
                        },
                        color: "#111",
                      }}
                    >
                      {element.id}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: {
                          xs: "14px",
                          md: "19px",
                          lg: "20px",
                          xl: "29px",
                        },
                        color: "111",
                      }}
                    >
                      {element.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "12px",
                          md: "15px",
                          lg: "16px",
                          xl: "21px",
                        },
                        color: "#111",
                      }}
                    >
                      {element.content}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            );
          })}
        </Stack>
      </motion.div>
    </>
  );
};

export default HowToBuy;
