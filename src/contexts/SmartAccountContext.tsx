import React, { useCallback, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import SmartAccount from "@biconomy/smart-account";
import { SmartAccountState, SmartAccountVersion } from "@biconomy/core-types";
import { supportedChains } from "../Utils/chainConfig.ts";
import { useWeb3AuthContext } from "./SocialLoginContext.tsx";
import { useProvider, useAccount, useSigner, useNetwork } from "wagmi";
import apiList from "../Utils/apiList.json";
export const ChainId = {
  MAINNET: 1, // Ethereum
  GOERLI: 5,
  POLYGON_MUMBAI: 80001,
  POLYGON_MAINNET: 137,
  ARBITRUM_ONE_MAINNET: 42161,
};

// Types
type Balance = {
  totalBalanceInUsd: number;
  alltokenBalances: any[];
};
type ISmartAccount = {
  version: string;
  smartAccountAddress: string;
  isDeployed: boolean;
};
type smartAccountContextType = {
  wallet: SmartAccount | null;
  state: SmartAccountState | null;
  balance: Balance;
  loading: boolean;
  isFetchingBalance: boolean;
  selectedAccount: ISmartAccount | null;
  smartAccountsArray: ISmartAccount[];
  activeChain: undefined | number;
  setSelectedAccount: React.Dispatch<
    React.SetStateAction<ISmartAccount | null>
  >;

  getSmartAccount: () => Promise<string>;
  getSmartAccountBalance: () => Promise<string>;
};

// Context
export const SmartAccountContext = React.createContext<smartAccountContextType>(
  {
    wallet: null,
    state: null,
    balance: {
      totalBalanceInUsd: 0,
      alltokenBalances: [],
    },
    loading: false,
    isFetchingBalance: false,
    selectedAccount: null,
    smartAccountsArray: [],
    activeChain: undefined,
    setSelectedAccount: () => {},
    getSmartAccount: () => Promise.resolve(""),
    getSmartAccountBalance: () => Promise.resolve(""),
  }
);
export const useSmartAccountContext = () => useContext(SmartAccountContext);

// Provider
export const SmartAccountProvider = ({ children }: any) => {
  const [wallet, setWallet] = useState<SmartAccount | null>(null);
  const [state, setState] = useState<SmartAccountState | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<ISmartAccount | null>(
    null
  );

  const provider = useProvider();
  const { address } = useAccount();
  const {
    //@ts-ignore
    chain,
  } = useNetwork();

  const [activeChain, setActiveChainId] = useState(chain?.id);
  useEffect(() => {
    setActiveChainId(chain?.id);
  }, [chain?.id]);

  const [smartAccountsArray, setSmartAccountsArray] = useState<ISmartAccount[]>(
    []
  );
  const [balance, setBalance] = useState<Balance>({
    totalBalanceInUsd: 0,
    alltokenBalances: [],
  });
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);
  const [loading, setLoading] = useState(false);

  const getSmartAccount = useCallback(async () => {
    if (!provider || !address) return "Wallet not connected";

    try {
      setLoading(true);
      //@ts-ignore
      const walletProvider = new ethers.providers.Web3Provider(
        //@ts-ignore
        window.ethereum
      );
      console.log("walletProvider", walletProvider);
      // New instance, all config params are optional

      const wallet = new SmartAccount(
        //@ts-ignore
        walletProvider,
        {
          //@ts-ignore
          activeNetworkId: activeChain!,
          supportedNetworksIds: supportedChains,
          networkConfig: [
            {
              chainId: activeChain!,
              //@ts-ignore
              dappAPIKey: apiList[activeChain!].account_abstraction,
            },
          ],
        }
      );
      console.log("wallet", wallet);

      // Wallet initialization to fetch wallet info

      const smartAccount = await wallet.init();

      setWallet(wallet);
      console.info("smartAccount", smartAccount);

      smartAccount.on("txHashGenerated", (response: any) => {
        console.log(
          "txHashGenerated event received in AddLP via emitter",
          response
        );
        //showSuccessMessage(`Transaction sent: ${response.hash}`, response.hash);
      });

      smartAccount.on("txHashChanged", (response: any) => {
        console.log(
          "txHashChanged event received in AddLP via emitter",
          response
        );
        /*         showSuccessMessage(
          `Transaction updated with hash: ${response.hash}`,
          response.hash
        ); */
      });

      smartAccount.on("txMined", (response: any) => {
        console.log("txMined event received in AddLP via emitter", response);
        /*         showSuccessMessage(
          `Transaction confirmed: ${response.hash}`,
          response.hash
        ); */
      });

      smartAccount.on("error", (response: any) => {
        console.log("error event received in AddLP via emitter", response);
      });

      // get all smart account versions available and update in state
      const { data } = await smartAccount.getSmartAccountsByOwner({
        //@ts-ignore
        chainId: activeChain,
        owner: address,
      });
      console.info("getSmartAccountsByOwner", data);
      const accountData: ISmartAccount[] = [];
      for (let i = 0; i < data.length; ++i) {
        accountData.push(data[i]);
      }
      setSmartAccountsArray(accountData);
      // set the first wallet version as default
      if (accountData.length) {
        wallet.setSmartAccountVersion(
          accountData[0].version as SmartAccountVersion
        );
        setSelectedAccount(accountData[0]);
      }

      // get address, isDeployed and other data
      const state1 = await smartAccount.getSmartAccountState();
      setState(state1);
      console.info("getSmartAccountState", state1, activeChain);

      setLoading(false);
      return "";
    } catch (error: any) {
      setLoading(false);
      console.error({ getSmartAccount: error });
      return error.message;
    }
  }, [provider, address, activeChain, chain]);

  const getSmartAccountBalance = async () => {
    if (!provider || !address) return "Wallet not connected";
    if (!state || !wallet) return "Init Smart Account First";

    try {
      setIsFetchingBalance(true);
      // ethAdapter could be used like this
      // const bal = await wallet.ethersAdapter().getBalance(state.address);
      // console.log(bal);
      // you may use EOA address my goerli SCW 0x1927366dA53F312a66BD7D09a88500Ccd16f175e
      const balanceParams = {
        chainId: activeChain,
        eoaAddress: state.address,
        tokenAddresses: [],
      };
      //@ts-ignore
      const balFromSdk = await wallet.getAlltokenBalances(balanceParams);
      console.info("getAlltokenBalances", balFromSdk);
      //@ts-ignore
      const usdBalFromSdk = await wallet.getTotalBalanceInUsd(balanceParams);
      console.info("getTotalBalanceInUsd", usdBalFromSdk);
      setBalance({
        totalBalanceInUsd: usdBalFromSdk.data.totalBalance,
        alltokenBalances: balFromSdk.data,
      });
      setIsFetchingBalance(false);
      return "";
    } catch (error: any) {
      setIsFetchingBalance(false);
      console.error({ getSmartAccountBalance: error });
      return error.message;
    }
  };

  useEffect(() => {
    if (wallet && selectedAccount) {
      console.log("setSmartAccountVersion", selectedAccount);
      wallet.setSmartAccountVersion(
        selectedAccount.version as SmartAccountVersion
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAccount, activeChain]);

  useEffect(() => {
    getSmartAccount();
  }, [getSmartAccount]);

  return (
    <SmartAccountContext.Provider
      value={{
        wallet,
        state,
        balance,
        loading,
        isFetchingBalance,
        selectedAccount,
        smartAccountsArray,
        setSelectedAccount,
        getSmartAccount,
        getSmartAccountBalance,
        activeChain,
      }}
    >
      {children}
    </SmartAccountContext.Provider>
  );
};
