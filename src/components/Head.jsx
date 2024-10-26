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
  Popover,
} from "@mui/material";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navVariants } from "../Utils/motion";
import formatNumber from "./format.js";
import { ToastContainer, toast } from "react-toastify";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSmartAccountContext } from "../contexts/SmartAccountContext.tsx";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount,useBalance } from "wagmi";
// import {Popover} from 'antd'

const comingSoon = () => {
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
};

export default function Head(props) {
  const { sw } = props;
  const [open, setOpen] = useState(false);
  const { isConnected } = useAccount();
  const { wallet } = useSmartAccountContext();

  const coin = [
    { name: "Arbitrum", img: "binance.png" },
    { name: "Ethereum", img: "eth.svg" },
    { name: "Polygon", img: "polygon.png" },
    { name: "BSC", img: "binance.png" },
  ];
  const [opt, setOpt] = useState(1);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const opeen = Boolean(anchorEl);
  const id = opeen ? "simple-popover" : undefined;

  useEffect(() => {
    console.log("wallet head", wallet);
  }, [wallet]);
  const { data, isError} = useBalance({
    address: '0x994A258c7Dec633b5b15376f850D5Ea701179E79',
  })
let formatted = formatNumber(`${data?.formatted}`);


  return (
    <>
    
      
      <motion.nav
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <ToastContainer />
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
            marginBottom: "20px",
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
              <a href="/"> 0xGasless </a>
            </Typography>
          </Stack>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "row",
              gap: "30px",
              alignItems: "center",
            }}
          >
            {/* <Popover
              id={id}
              open={opeen}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              style={{ margin: "10px" }}
            >
              <>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap="8px"
                  padding="14px"
                  onClick={() => {
                    comingSoon();
                    handleClose();
                  }}
                  sx={{ cursor: "pointer", backgroundColor: "#2E2E2E" }}
                >
                  <img src={coin[0].img} alt="eth" className="eth" width={28} />
                  <Typography
                    variant="nav"
                    sx={{
                      fontWeight: "700",
                      color: "white",
                      fontFamily: "DM Mono",
                    }}
                  >
                    {coin[0].name}
                  </Typography>
                </Stack>
             
                <Divider sx={{ color: "white" }} />

                <Stack
                  direction="row"
                  alignItems="center"
                  gap="8px"
                  padding="14px"
                  onClick={() => {
                    comingSoon();
                    handleClose();
                  }}
                  sx={{ cursor: "pointer", backgroundColor: "#2E2E2E" }}
                >
                  <img src={coin[2].img} alt="eth" className="eth" width={28} />
                  <Typography
                    variant="nav"
                    sx={{
                      fontWeight: "700",
                      color: "white",
                      fontFamily: "DM Mono",
                    }}
                  >
                    {coin[2].name}
                  </Typography>
                </Stack>
              </>
            </Popover> */}
            {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent={"center"}
              gap="12px"
              onClick={handleClick}
              sx={{ cursor: "pointer" }}
            >
              <img src={coin[opt].img} alt="eth" className="eth" width={28} />
              <Typography
                variant="nav"
                sx={{
                  fontWeight: "700",
                  color: "white",
                  fontFamily: "DM Mono",
                }}
              >
                {coin[opt].name}
              </Typography>
              <IconButton sx={{ padding: 0 }}>
                <KeyboardArrowDownIcon sx={{ color: "white", padding: 0 }} />
              </IconButton>
            </Stack>
            <Typography variant="body1" color="white" sx={{padding:"8px",backgroundColor:"#0E76FD",borderRadius:"8px  "}}>Balance: {formatted}</Typography>
            {isConnected && wallet?.address && sw && (
              <div
                className="connectButton1"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigator.clipboard.writeText(wallet?.address);
                  toast("🦄 Smart wallet address copied", {
                    position: "bottom-left",
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
                Smart Wallet:{" "}
                {wallet.address.slice(0, 4) + "..." + wallet.address.slice(38)}
              </div>
            )}
            {
              /*               <div
                className="connectButton"
                onClick={() => provider?.connect()}
              >
                {provider && provider.connected && provider.accounts[0]
                  ? provider.accounts[0].slice(0, 4) +
                    "..." +
                    provider.accounts[0].slice(38)
                  : "Connect"}
              </div> */ <ConnectButton />
            }
          </Box>
          <IconButton sx={{ display: { sm: "none" } }}>
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
                gap: "15px",
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
                <Stack
                  direction="row"
                  alignItems="center"
                  gap="8px"
                  onClick={handleClick}
                  sx={{ cursor: "pointer" }}
                >
                  <img
                    src={coin[opt].img}
                    alt="eth"
                    className="eth"
                    width={40}
                  />
                  <Typography
                    variant="nav"
                    sx={{
                      marginRight: "25px",
                      fontWeight: "700",
                      color: "white",
                      fontFamily: "DM Mono",
                    }}
                  >
                    {coin[opt].name}
                  </Typography>
                  <IconButton onClick={handleClick}>
                    <KeyboardArrowDownIcon sx={{ color: "white" }} />
                  </IconButton>
                </Stack>
              </ListItem>
              {/*               <ListItem onClick={() => setOpen(false)}>
                <div
                  className="connectButton"
                  onClick={() => {
                    setOpen(false);
                    connect();
                  }}
                >
                  {isConnected && smartWallet !== undefined && address
                    ? smartWallet.slice(0, 4) +
                      "..." +
                      smartWallet.slice(38) +
                      "<------>" +
                      address.slice(0, 4) +
                      "..." +
                      address.slice(38)
                    : "Connect"}
                </div>
              </ListItem> */}
            </List>
          </SwipeableDrawer>
        </AppBar>
      </motion.nav>
    </>
  );
}
