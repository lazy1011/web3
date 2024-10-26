import { NFTStorage } from "nft.storage";

const NFT_STORAGE_KEY = process.env.REACT_APP_NFT_STORAGE_API;

export const mintNFT = async (
  name,description,link,supply,image
) => {

  // First we use the nft.storage client library to add the image and metadata to IPFS / Filecoin
  const client = new NFTStorage({ token: NFT_STORAGE_KEY });
  const nft = {
    image, // use image Blob as `image` field
    name,
    description,
    properties: {
      supply,
      link
    }
  }

  const metadata = await client.store(nft);
  
  // the returned metadata.url has the IPFS URI we want to add.
  // our smart contract already prefixes URIs with "ipfs://", so we remove it before calling the `mintToken` function
  // const metadataURI = metadata.url.replace(/^ipfs:\/\//, "");
  return metadata.url;
};


