import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { Modal } from "antd";
import { activeChainId } from "../Utils/chainConfig.ts";
import tokenList from "../Utils/tokenList.json";
import { useState, useRef, useEffect } from "react";
import { mintNFT } from "../Utils/nft-apis";
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import {
  nftContractABI,
  nftContractAddress,
} from "../Utils/contracts-constant";
export default function Mint() {
  const { data: signer } = useSigner();
  const getInstance = async () => {
    try {
      let instance = new ethers.Contract(
        nftContractAddress,
        nftContractABI,
        signer
      );
      return instance;
    } catch (error) {
      console.log("No instance get");
    }
  };

  const [tokenOne, setTokenOne] = useState(
    tokenList[activeChainId.toString()][0]
  );
  const { address } = useAccount();

  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [supply, setSupply] = useState("");
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    setImage(file);
  };
  function modifyToken(i) {
    setTokenOne(tokenList[activeChainId.toString()][i]);
    setIsOpen(false);
  }

  const toastId = useRef(null);
  const mintYourNft = async () => {
    setLoader(true);
    if (!name && !description && !link && !supply && !image) {
      alert("Please fill all the fields");
      setLoader(false);
      return;
    }
    toastId.current = toast("⏳ NFT is Uploading", {
      theme: "dark",
      autoClose: 5000,
      closeButton: true
    });
    let metadataURI = await mintNFT(name, description, link, supply, image);
    toast.update(toastId.current, {
      render:"🦄 NFT is Minting",
      type: toast.TYPE.INFO,
      theme: "dark",
      autoClose: 5000,
      closeButton: true
    });
    if (metadataURI) {
      let instance = await getInstance();
      let tx = await instance.mintNFT(address, metadataURI);
    }
    setLoader(false);
    toast.update(toastId.current, {
      render:"👏 NFT is Minted",
      type: toast.TYPE.SUCCESS,
      theme: "dark",
      autoClose: 5000,
      closeButton: true
    });
  };

  
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
      >
        <div className="modalContent">
          {tokenList[activeChainId.toString()].map((e, i) => {
            return (
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyToken(i)}
              >
                <img src={e.img} alt={e.ticker} className="tokenLogo" />
                <div className="tokenChoiceNames">
                  <div className="tokenName">{e.name}</div>
                  <div className="tokenTicker">{e.ticker}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
      {/* <Head/> */}
      <Stack gap="32px" sx={{ maxWidth: "550px", padding: "12px" }}>
        <Stack>
          <Typography variant="h4" color="white">
            Mint Your NFT
          </Typography>
          <Typography variant="body2" color="white">
            * Required Fields
          </Typography>
        </Stack>
        <Stack gap="8px">
          <Typography variant="h6" color="white">
            Image, Video, Audio, or 3D Model
          </Typography>
          <Typography variant="body2" color="white">
            File types supported: JPEG,JPG,PNG,GIF :100 MB
          </Typography>
          {/* // Image Upload Section */}
          <div className="box-decoration mt4">
            <div onClick={handleClick} style={{ cursor: "pointer" }}>
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="upload NFT"
                  className="img-display-after"
                />
              ) : (
                <img
                  src="imgplaceholder.jpg"
                  alt="upload NFT"
                  className="img-display-before"
                />
              )}

              <input
                id="image-upload-input"
                accept=".jpeg,.jpg,.png,.gif"
                type="file"
                onChange={handleImageChange}
                ref={hiddenFileInput}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </Stack>
        <Stack gap="8px">
          <Typography variant="h6" color="white">
            Name*
          </Typography>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item Name"
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset ": {
                  borderColor: "white",
                },
                "& fieldset ": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
        </Stack>
        <Stack gap="8px">
          <Typography variant="h6" color="white">
            External Link
          </Typography>
          <Typography variant="body2" color="white">
            OpenSea will include a link to this URL on this item's detail page,
            so that users can click to learn more about it. You are welcome to
            link to your own webpage with more details.
          </Typography>
          <TextField
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="http://yoursiteURL"
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset ": {
                  borderColor: "white",
                },
                "& fieldset ": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
        </Stack>
        <Stack gap="8px">
          <Typography variant="h6" color="white">
            Description
          </Typography>
          <Typography variant="body2" color="white">
            The description will be included on the item's detail page
            underneath its image. Markdown syntax is supported.
          </Typography>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            minRows={3}
            maxRows={5}
            inputProps={{ style: { color: "white" } }}
            placeholder="Prvoide a detailed description about your item."
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset ": {
                  borderColor: "white",
                },
                "& fieldset ": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
        </Stack>
        <Stack gap="8px">
          <Typography variant="h6" color="white">
            Supply
          </Typography>
          <Typography variant="body2" color="white">
            The number of items that can be minted. No gas cost to you!
          </Typography>
          <TextField
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            sx={{
              input: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset ": {
                  borderColor: "white",
                },
                "& fieldset ": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
        </Stack>
        <Stack gap="8px">
          <Typography variant="h6" color="white">
            Blockchain
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              border: "2px solid white",
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            <Stack direction="row" gap="16px" alignItems="center">
              <img src={tokenOne.img} alt="assetOneLogo" className="mintimg" />
              <Typography variant="body1" color="white">
                Polygon Chain
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Button
          variant="contained"
          onClick={mintYourNft}
          style={{ background: "white", color: "black", margin: "28px 0px" }}
        >
          Create
        </Button>
      </Stack>
    </Box>
  );
}
