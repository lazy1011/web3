import { Button, Stack, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";
import { boxVariant, staggerContainer } from "../Utils/motion";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chhart() {
  const data = {
    labels: [
      "Team",
      "Fair Launch",
      "Liquidity Locked",
      "CEX",
      "Staking",
      "Airdrop",
    ],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div id="token"></div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <Stack
          gap="45px"
          sx={{
            padding: "20px 40px",
            alignItems: "center",
            backgroundColor: "black",
          }}
        >
          <motion.div variants={boxVariant(0.1)}>
            <Typography variant="h4" color="white" fontWeight="700">
              TOKENOMICS
            </Typography>
          </motion.div>

          <motion.div variants={boxVariant(0.2)}>
            <Stack
              alignItems="center"
              gap="20px"
              sx={{
                border: "3px solid white",
                padding: "35px",
                width: { xs: "60vw" },
              }}
            >
              <Typography
                variant="body1"
                color="white"
                sx={{ fontFamily: "DM Mono", fontSize: "19px" }}
              >
                Contract Address
              </Typography>
              <Stack gap="15px" alignItems="center">
                <Typography
                  variant="h6"
                  color="white"
                  sx={{
                    fontSize: { xs: "10px", sm: "19px" },
                    fontWeight: "700",
                  }}
                >
                  0x994A258c7Dec633b5b15376f850D5Ea701179E79
                </Typography>
              </Stack>

              <Stack
                sx={{ flexDirection: { xs: "coloumn", lg: "row" } }}
                gap="30px"
              >
                <Typography
                  variant="body1"
                  color="rgba(214, 214, 214, 1)"
                  sx={{ fontFamily: "DM Mono", textAlign: "center" }}
                >
                  Symbol
                  <Typography variant="body1" color="white">
                    $0xGas
                  </Typography>
                </Typography>
                <Typography
                  variant="body1"
                  color="rgba(214, 214, 214, 1)"
                  sx={{ fontFamily: "DM Mono", textAlign: "center" }}
                >
                  Decimal
                  <Typography variant="body1" color="white">
                    18
                  </Typography>
                </Typography>
                <Typography
                  variant="body1"
                  color="rgba(214, 214, 214, 1)"
                  sx={{ fontFamily: "DM Mono", textAlign: "center" }}
                >
                  Network
                  <Typography variant="body1" color="white">
                    ETHEREUM ERC-20
                  </Typography>
                </Typography>
                <Typography
                  variant="body1"
                  color="rgba(214, 214, 214, 1)"
                  sx={{ fontFamily: "DM Mono", textAlign: "center" }}
                >
                  Supply
                  <Typography variant="body1" color="white">
                    100,000,000
                  </Typography>
                </Typography>
              </Stack>
            </Stack>
          </motion.div>

          <Stack direction="row" gap="80px" marginBottom={"25px"}>
            <motion.div variants={boxVariant(0.6)}>
              <Stack alignItems="center">
                <Typography
                  variant="h4"
                  color="white"
                  sx={{ fontWeight: "700", fontSize: { lg: "40px" } }}
                >
                  5%
                </Typography>
                <Typography
                  variant="body1"
                  color="white"
                  sx={{ fontFamily: "DM Mono" }}
                >
                  Buy Tax
                </Typography>
              </Stack>
            </motion.div>
            <motion.div variants={boxVariant(0.6)}>
              <Stack alignItems="center">
                <Typography
                  variant="h4"
                  color="white"
                  sx={{ fontWeight: "700", fontSize: { lg: "40px" } }}
                >
                  5%
                </Typography>
                <Typography
                  variant="body1"
                  color="white"
                  sx={{ fontFamily: "DM Mono" }}
                >
                  Sell Tax
                </Typography>
              </Stack>
            </motion.div>
          </Stack>
        </Stack>
      </motion.div>
    </>
  );
}
