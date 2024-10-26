import { Box, Stack, Typography } from "@mui/material";
import Image from "mui-image";
import { motion } from "framer-motion";
import { boxVariant, staggerContainer } from "../Utils/motion";

export default function About() {
  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
      >
        <Box
          sx={{
            padding: { lg: "50px 0px", xs: "10px" },
            backgroundImage: `url('background2.svg')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            overflowX: "hidden",
            backgroundSize: "cover",
            backgroundColor: "black",
          }}
          id="intro"
        >
          <motion.div variants={boxVariant(0.1)}>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: { lg: "150px", xs: "0px" },
                padding: { lg: "0px 40px", xs: "10px" },
              }}
            >
              <Stack
                sx={{
                  width: { xs: "20px" },

                  display: { xs: "none", sm: "block" },
                }}
              >
                <Image
                  src="deisgn.svg"
                  width={180}
                  height={180}
                  style={{
                    marginLeft: "-120px",
                    marginTop: "550px",
                    zIndex: "0",
                  }}
                />
              </Stack>
              <Stack
                gap={3}
                sx={{
                  maxWidth: "800px",
                  border: "3px solid white",
                  padding: "20px",
                  zIndex: "1",
                  backgroundColor: "black",
                }}
              >
                <Typography variant="h4" fontWeight={700} color="white">
                  Introduction
                </Typography>
                <Typography variant="body1" color="white">
                  Gasless Swap is a groundbreaking technology enabling
                  decentralized trading of cryptocurrencies without central
                  authorities or gas fees. Through atomic swaps executed via
                  secure smart contracts on the blockchain, users can directly
                  exchange digital assets. What sets Gasless Swap apart is its
                  elimination of gas fees, a significant concern for traders.
                  Transactions are executed off-chain, alleviating the cost
                  burden.
                </Typography>
                <Typography variant="body1" color="white">
                  Gasless Swap is entirely decentralized, enhancing security,
                  transparency, and resistance to hacking attempts.
                </Typography>
                <Typography variant="body1" color="white">
                  This revolutionary technology revolutionizes cryptocurrency
                  trading by providing a secure, transparent, and cost-effective
                  solution, eliminating gas fees, and the need for a central
                  authority.
                </Typography>
              </Stack>
              <Stack
                sx={{
                  width: { xs: "20px" },
                  display: { xs: "none", sm: "block" },
                }}
              >
                <Image
                  src="logo.svg"
                  width={100}
                  height={120}
                  style={{
                    marginLeft: "-100px",
                    marginTop: "-100px",
                    zIndex: "2",
                  }}
                />
              </Stack>
            </Stack>
          </motion.div>

          <Stack
            padding={"40px"}
            sx={{
              backgroundColor: "white",
              marginTop: "80px",
              gap: "45px",
              justifyContent: "center",
            }}
            id="feature"
          >
            <motion.div
              variants={boxVariant(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Typography
                variant="h4"
                fontWeight={700}
                color="black"
                marginBottom="20px"
              >
                FEATURES
              </Typography>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: "25px",
                  justifyContent: { xs: "center", md: "space-evenly" },
                }}
              >
                <Stack
                  sx={{
                    gap: "16px",
                    padding: "15px",
                    border: "3px solid black",
                  }}
                >
                  <Box height={"90%"}>
                    <Typography
                      variant="h5"
                      color="black"
                      fontWeight={700}
                      textAlign="center"
                    >
                      Gasless Swaps
                    </Typography>
                    <Typography variant="body1" color="black" marginTop={2}>
                      Gasless swaps at 0xGasless allow users to bypass
                      traditional gas fees by paying with the token they are
                      swapping. With the implementation of account abstraction
                      technology, it eliminates the need to purchase and hold
                      Ethereum, making trading more accessible and
                      user-friendly.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "70px",
                      height: "70px",
                      backgroundColor: "black",
                      borderRadius: "50%",
                    }}
                  />
                </Stack>
                <Stack
                  sx={{
                    gap: "16px",
                    border: "3px solid black",
                    padding: "15px",
                  }}
                >
                  <Box height={"90%"}>
                    <Typography
                      variant="h5"
                      color="black"
                      fontWeight={700}
                      textAlign="center"
                    >
                      Multi-Chain
                    </Typography>
                    <Typography variant="body1" color="black" marginTop={2}>
                      0xGasless is dedicated to building decentralized exchanges
                      (DEXs) on all major Layer 1 (L1) blockchain networks. This
                      multichain approach ensures widespread access to trading
                      opportunities and accommodates diverse user preferences,
                      fostering a vibrant and inclusive ecosystem for
                      cryptocurrency traders.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "70px",
                      height: "70px",
                      backgroundColor: "black",
                      borderRadius: "50%",
                    }}
                  />
                </Stack>
                <Stack
                  sx={{
                    gap: "16px",
                    border: "3px solid black",
                    padding: "15px",
                  }}
                >
                  <Box height={"90%"}>
                    <Typography
                      variant="h5"
                      color="black"
                      fontWeight={700}
                      textAlign="center"
                    >
                      MEV Free Gasless Bridge
                    </Typography>
                    <Typography variant="body1" color="black" marginTop={2}>
                      0xGasless revolutionizes cross-chain asset transfers by
                      providing a secure and efficient solution. Users can
                      seamlessly transfer assets between different chains
                      without the risk of Miner Extractable Value (MEV)
                      extraction, ensuring privacy, cost-effectiveness, and
                      trust in the transaction process.
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "70px",
                      height: "70px",
                      backgroundColor: "black",
                      borderRadius: "50%",
                    }}
                  />
                </Stack>
                <Stack
                  sx={{
                    gap: "16px",
                    border: "3px solid black",
                    padding: "15px",
                  }}
                >
                  <Box height={"90%"}>
                    <Typography
                      variant="h5"
                      color="black"
                      fontWeight={700}
                      textAlign="center"
                    >
                      Anonymous Swap
                    </Typography>
                    <Typography variant="body1" color="black" marginTop={2}>
                      Execute private and secure transactions with anonymous
                      swaps on zkEVMs, leveraging zero-knowledge proofs and
                      ZK-SNARKs for privacy-preserving blockchain transactions.
                      Your identity and trade details remain confidential
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      width: "70px",
                      height: "70px",
                      backgroundColor: "black",
                      borderRadius: "50%",
                    }}
                  />
                </Stack>
              </Stack>
            </motion.div>
          </Stack>
        </Box>
      </motion.div>
    </>
  );
}
