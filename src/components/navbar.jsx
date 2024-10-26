import {
  Typography,
  Button,
  IconButton,
  Divider,
  AppBar,
  Box,
  SwipeableDrawer,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { motion } from "framer-motion";
import { navVariants } from "../Utils/motion";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { toast } from "react-toastify";

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

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        
        <AppBar
          elevation={0}
          sx={{
            position: "relative",
            top: "0",
            left: "0",
            padding: { lg: "10px 30px", xs: "10px 10px" },
            flexDirection: "row",
            justifyContent: "space-between",
            background: "rgb(17,17,17)",
            boxShadow: "0px 3px 7px black",
          }}
        >
          <Stack direction="row" alignItems="center" gap="10px">
            <img src="logo.svg" alt="logo" width={80} />
            <Typography
              sx={{
                fontSize: { lg: "24px", xs: "18px" },
                fontWeight: "500",
                fontFamily: "DM Mono",
              }}
            >
              0xGasless
            </Typography>
          </Stack>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "row",
              gap: "30px",
              alignItems: "center",
            }}
          >
            <Typography variant="nav" sx={{ fontFamily: "DM Mono" }}>
              <a href="/#intro">INTRO</a>
            </Typography>
            <Typography variant="nav" sx={{ fontFamily: "DM Mono" }}>
              <a href="/#feature">FEATURES</a>
            </Typography>
            <Typography variant="nav" sx={{ fontFamily: "DM Mono" }}>
              <a href="/#token">TOKEN</a>
            </Typography>
            <Typography variant="nav" sx={{ fontFamily: "DM Mono" }}>
              <a href="/#vision">VISION</a>
            </Typography>
            <Typography variant="nav" sx={{ fontFamily: "DM Mono" }}>
              <a href="/#roadmap">ROADMAP</a>
            </Typography>
            <Typography variant="nav" sx={{ fontFamily: "DM Mono" }}>
              <a href="/#faq">FAQ</a>
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
            <Button
              style={{
                padding: "6px 10px",
                color: "white",
                // background: "linear-gradient(to right, #6C72CB, #CB69C1)",
                border: "1px solid white",
                width: "fit-content",
                transition: "0.4s",
              }}
              sx={{
                fontSize: { lg: "15px", xs: "10px" },
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
             <a href="/swap"> Enter dApp </a>
            </Button>
            <Button
              style={{
                padding: "6px 10px",
                color: "white",
                // background: "linear-gradient(to right, #6C72CB, #CB69C1)",
                border: "1px solid white",
                width: "fit-content",
                transition: "0.4s",
              }}
              sx={{
                fontSize: { lg: "15px", xs: "10px" },
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
             <a href="/mint"> Enter Mint </a>
            </Button>
          </Box>
          <IconButton sx={{ display: { md: "none" } }}>
            <FormatAlignLeftIcon
              onClick={() => setOpen(true)}
              sx={{ color: "white" }}
            />
          </IconButton>
          <SwipeableDrawer
            PaperProps={{
              sx: {
                background: "transparent",
                backdropFilter: "blur(10px)",
                width: "200px",
                display: open ? "flex" : "none",
              },
            }}
            open={open}
            anchor="right"
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
          >
            <div>
              <IconButton>
                <ChevronRightIcon
                  onClick={() => setOpen(false)}
                  sx={{ color: "white" }}
                />
              </IconButton>
            </div>
            <Divider sx={{ backgroundColor: "white" }} />
            <List>
              <ListItem>
                <Typography variant="nav" sx={{ fontFamily: "DM Mono" }}>
                  <a href="/#intro" onClick={() => setOpen(false)}>
                    INTRO
                  </a>
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="nav" sx={{ fontFamily: "DM Mono" }}>
                  <a href="/#feature" onClick={() => setOpen(false)}>
                    FEATURES
                  </a>
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="nav" sx={{ fontFamily: "DM Mono" }}>
                  <a href="/#token" onClick={() => setOpen(false)}>
                    TOKEN
                  </a>
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="nav" sx={{ fontFamily: "DM Mono" }}>
                  <a href="/#vision" onClick={() => setOpen(false)}>
                    VISION
                  </a>
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant="nav" sx={{ fontFamily: "DM Mono" }}>
                  <a href="/#roadmap" onClick={() => setOpen(false)}>
                    ROADMAP
                  </a>
                </Typography>
              </ListItem>
              <ListItem>
              <Typography variant="nav" sx={{ fontFamily: "DM Mono" }}>
                  <a href="/#faq" onClick={() => setOpen(false)}>
                    FAQ
                  </a>
                </Typography>
              </ListItem>

              <ListItem>
              <Button
              style={{
                padding: "6px 10px",
                color: "white",
                // background: "linear-gradient(to right, #6C72CB, #CB69C1)",
                border: "1px solid white",
                width: "fit-content",
                transition: "0.4s",
              }}
              sx={{
                fontSize: "14px",
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
             <a href="/mint"> Enter dApp </a>
            </Button>
              </ListItem>
              <ListItem>
              <Button
              style={{
                padding: "6px 10px",
                color: "white",
                // background: "linear-gradient(to right, #6C72CB, #CB69C1)",
                border: "1px solid white",
                width: "fit-content",
                transition: "0.4s",
              }}
              sx={{
                fontSize: "14px",
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
             <a href="/swap"> Enter Mint </a>
            </Button>
              </ListItem>
              <ListItem>
                <Stack direction="row" gap="8px" alignItems="center">
                  <IconButton
                    href="https://twitter.com/0xGasless"
                    target="_blank"
                  >
                    <TwitterIcon sx={{ color: "white" }} />
                  </IconButton>
                  <IconButton href="https://t.me/Gasless0x" target="_blank">
                    <TelegramIcon sx={{ color: "white" }} />
                  </IconButton>
                  
                </Stack>
              </ListItem>
            </List>
          </SwipeableDrawer>
        </AppBar>
      </motion.nav>
    </>
  );
}
