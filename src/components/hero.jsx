import { Stack, Typography, Box, Button, IconButton } from "@mui/material";
import Navbar from "./navbar";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { boxVariant, staggerContainer, slideIn } from "../Utils/motion";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const comingSoon = () =>
  toast("🦄 Coming soon!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
export default function Hero() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Box
        sx={{
          backgroundImage: `url('background.svg')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          marginTop: "-130px",
          paddingTop: "130px",
        }}
      >
        <Navbar />
        <Stack
          sx={{
            padding: { lg: "40px 20px", xs: "10px" },
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          {" "}
          <motion.div variants={slideIn("left", "tween", 0.2, 0.5)}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "34px",
                background: "#1A1A1A",
                padding: "12px",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  width: 6,
                  marginRight: 10,
                  borderRadius: "10px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  alignItems: "start",
                }}
              >
                <Typography variant="body" fontWeight="bold" color="white">
                  Contract addresss
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "4px",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body"
                    color="grey"
                    nowrap
                    sx={{
                      maxWidth: { xs: "270px", sm: "fit-content" },
                      wordWrap: "break-word",
                    }}
                  >
                    0x994A258c7Dec633b5b15376f850D5Ea701179E79
                  </Typography>

                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "0x994A258c7Dec633b5b15376f850D5Ea701179E79"
                      );
                      toast("Address copied", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                      });
                    }}
                  >
                    <ContentCopyIcon sx={{ color: "white", width: "20px" }} />
                  </IconButton>
                </div>
              </div>
            </div>
          </motion.div>
          <Stack
            sx={{
              gap: {
                xs: "2.5rem",
                lg: "4rem",
              },
            }}
          >
            <motion.div variants={boxVariant(0.3)}>
              <Typography
                color="#EDEDED"
                sx={{
                  fontSize: { lg: "30px", xs: "18px" },
                  fontWeight: "400",
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontFamily: "DM Mono",
                }}
              >
                <Box
                  sx={{
                    fontSize: { lg: "60px", xs: "40px" },
                    fontWeight: "700",
                    color: "white",
                    textTransform: "none",
                    letterSpacing: { lg: "10px", xs: "5px" },
                    fontFamily: "Poppins",
                  }}
                >
                  0xGasless
                </Box>
                Gasless Multi-Chain Privacy
                <br />
                preserving MEV
                <br />
                Free Swap
              </Typography>
            </motion.div>
            <motion.div variants={boxVariant(0.5)}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "30px",
                  marginBottom: "30px",
                }}
                sx={{ flexDirection: "row" }}
              >
                {/*  <Link to="/swap"> */}

                <Button
                  href="https://t.me/Gasless0x"
                  target="_blank"
                  style={{
                    color: "white",
                    // background: "linear-gradient(to right, #6C72CB, #CB69C1)",
                    border: "1px solid white",
                    width: "fit-content",
                    transition: "0.4s",
                  }}
                  sx={{
                    padding: { lg: "10px 14px", xs: "6px 8px" },
                    fontSize: { lg: "20px", xs: "18px" },
                    fontWeight: "400",
                    textTransform: "none",
                    transition: "0.4s",
                    "&:hover": {
                      background:
                        "linear-gradient(127deg,#1e1e1e, #642f7b,#35004b )",
                      border: "0",
                      transform: "Scale(1.03)",
                    },
                    "&:focus": {
                      background:
                        "linear-gradient(127deg,#1e1e1e, #642f7b,#35004b )",
                      border: "0",
                      transform: "Scale(1.03)",
                    },
                  }}
                >
                  Join
                  <IconButton
                    sx={{
                      display: { sm: "flex", xs: "none" },
                    }}
                  >
                    <ArrowForwardIcon sx={{ color: "white" }} />
                  </IconButton>
                </Button>

                {/* </Link> */}
                {/*   <Link to="/swap"> */}
                <a
                  href="https://cloudflare-ipfs.com/ipfs/bafybeiam7k5dyxsbt3y7vkgg5muysgifwukekgkyaisuym2tohunwzpamu"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    style={{
                      color: "white",
                      // background: "linear-gradient(to right, #6C72CB, #CB69C1)",
                      border: "1px solid white",
                      width: "fit-content",
                    }}
                    sx={{
                      padding: { lg: "10px 14px", sm: "6px 8px" },
                      fontSize: { lg: "20px", xs: "18px" },
                      fontWeight: "400",
                      textTransform: "none",
                      transition: "0.4s",
                      "&:hover": {
                        background:
                          "linear-gradient(127deg,#1e1e1e, #642f7b,#35004b )",
                        border: "0",
                        transform: "Scale(1.03)",
                      },
                      "&:focus": {
                        background:
                          "linear-gradient(127deg,#1e1e1e, #642f7b,#35004b )",
                        border: "0",
                        transform: "Scale(1.03)",
                      },
                    }}
                  >
                    Whitepaper
                    <IconButton
                      sx={{
                        display: { sm: "flex", xs: "none" },
                      }}
                    >
                      <ArrowForwardIcon sx={{ color: "white" }} />
                    </IconButton>
                  </Button>
                </a>
                {/*  </Link> */}
                <a
                  href="https://www.dextools.io/app/en/ether/pair-explorer/0xfbd802bfc22a686bc82223db91640217aa199845"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    style={{
                      color: "white",
                      // background: "linear-gradient(to right, #6C72CB, #CB69C1)",
                      border: "1px solid white",
                      width: "fit-content",
                      transition: "0.4s",
                    }}
                    sx={{
                      padding: { lg: "10px 14px", sm: "6px 10px" },
                      fontSize: { lg: "20px", xs: "18px" },
                      fontWeight: "400",
                      textTransform: "none",
                      transition: "0.4s",
                      "&:hover": {
                        background:
                          "linear-gradient(127deg,#1e1e1e, #642f7b,#35004b )",
                        border: "0",
                        transform: "Scale(1.03)",
                      },
                      "&:focus": {
                        background:
                          "linear-gradient(127deg,#1e1e1e, #642f7b,#35004b )",
                        border: "0",
                        transform: "Scale(1.03)",
                      },
                    }}
                    onClick={() => {}}
                  >
                    Chart
                    <IconButton
                      sx={{
                        display: { sm: "flex", xs: "none" },
                      }}
                    >
                      <ArrowForwardIcon
                        sx={{
                          color: "white",
                        }}
                      />
                    </IconButton>
                  </Button>
                </a>
              </Box>
            </motion.div>
          </Stack>
        </Stack>
      </Box>
    </motion.div>
  );
}
