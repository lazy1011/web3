import "./App.css";

import Head from "./components/Head";
import Swap from "./components/Swap";
import Swap2 from "./components/Swap2";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSmartAccountContext } from "./contexts/SmartAccountContext.tsx";
import { useWeb3AuthContext } from "./contexts/SocialLoginContext.tsx";
import LandingPage from "./pages/landingPage";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { polygon, polygonMumbai, arbitrum } from "wagmi/chains";
import { configureChains, createClient, WagmiConfig,chain } from "wagmi";
import { publicProvider } from "@wagmi/core/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { SmartAccountProvider } from "./contexts/SmartAccountContext.tsx";
import Mint from "./pages/mint.jsx";

const { chains, provider } = configureChains(
  [polygon, arbitrum ,polygonMumbai],
  [
    jsonRpcProvider({
      rpc: (chainId) => {
        if (chainId.id == 137) {
          return {
            http: "https://polygon-mainnet.g.alchemy.com/v2/ZLSEk8HyDPO8GF7NmrIZpRxxxKAY1zgr",
          };
        } else if (chainId.id == 42161) {
          return {
            http: "https://arb-mainnet.g.alchemy.com/v2/eCm1C8c0ke-nbr-n7sZ9S_UUovDTlTV6",
          };
        }
        else if (chainId.id == 80001) {
          return {
            http: "https://polygon-mumbai.g.alchemy.com/v2/EaKu789oxhWzYFvzEzOPAkCqIl2CwKj5",
          };
        }
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "c0b87a741558f262a9b652a396a3adc4",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function Whitepaper() {
  useEffect(() => {
    window.location.href =
      "https://cloudflare-ipfs.com/ipfs/bafybeiam7k5dyxsbt3y7vkgg5muysgifwukekgkyaisuym2tohunwzpamu";
  }, []);

  return null;
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mint" element={
        <div className="mint">
          <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
          <SmartAccountProvider>
        <Head/>
          <Mint/>
          </SmartAccountProvider>
          </RainbowKitProvider>
          </WagmiConfig>
        </div>}/>
        <Route
          path="/swap"
          element={
            <>
              <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider chains={chains}>
                  <SmartAccountProvider>
                    <div className="App">
                      <Head />
                      <div className="mainWindow">
                        <Routes>
                          <Route
                            path="/"
                            element={
                              <>
                                <Swap2 />
                              </>
                            }
                          />
                        </Routes>
                      </div>
                    </div>
                  </SmartAccountProvider>
                </RainbowKitProvider>
              </WagmiConfig>
            </>
          }
        />
        <Route
          path="/maticswap"
          element={
            <>
              <WagmiConfig client={wagmiClient}>
                <RainbowKitProvider chains={chains}>
                  <SmartAccountProvider>
                    <div className="App">
                      <Head />
                      <div className="mainWindow">
                        <Routes>
                          <Route
                            path="/"
                            element={
                              <>
                                <Swap2 />
                              </>
                            }
                          />
                        </Routes>
                      </div>
                    </div>
                  </SmartAccountProvider>
                </RainbowKitProvider>
              </WagmiConfig>
            </>
          }
        />
        <Route path="/whitepaper" element={<Whitepaper />} />
      </Routes>
    </>
  );
}

export default App;
