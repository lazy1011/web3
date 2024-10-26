import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message } from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import tokenList from "../Utils/tokenList.json";
import axios from "axios";
import { activeChainId } from "../Utils/chainConfig.ts";
import { Typography } from "@mui/material";
import { useSmartAccountContext } from "../contexts/SmartAccountContext.tsx";
import { toast } from "react-toastify";
import { useAccount, useProvider } from "wagmi";
import { ethers } from "ethers";

function Swap(props) {
  const {
    selectedAccount,
    getSmartAccountBalance,

    isFetchingBalance,
  } = useSmartAccountContext();
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const [messageApi, contextHolder] = message.useMessage();
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
  const [tokenOne, setTokenOne] = useState(
    tokenList[activeChainId.toString()][0]
  );
  const [tokenTwo, setTokenTwo] = useState(
    tokenList[activeChainId.toString()][1]
  );
  const [isOpen, setIsOpen] = useState(false);
  const [changeToken, setChangeToken] = useState(1);
  const { state: walletState, wallet } = useSmartAccountContext();

  const [isLoading, setIsLoading] = useState(false);
  const [destination, setDestination] = useState(false);
  const [estimatedGas, setEstimatedGas] = useState("0");
  const [ethPrice, setEthPrice] = useState("0.81");
  const [balanceOne, setBalanceOne] = useState("0");
  const [balanceTwo, setBalanceTwo] = useState("0");
  const [gasPrice, setGasPrice] = useState("0");
  function handleSlippageChange(e) {
    setSlippage(e.target.value);
  }

  function handleDestination(e) {
    setDestination(e.target.value);
  }

  useEffect(() => {
    console.log("selectedAccount", selectedAccount);
  }, [selectedAccount]);

  async function getBalance(address, tokenContractAddress, provider, decimals) {
    if (tokenContractAddress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
      const balance = await provider.getBalance(address);
      console.log("balance", balance, ethers.utils.formatUnits(balance, 18));
      return ethers.utils.formatUnits(balance, 18);
    } else {
      const contract = new ethers.Contract(
        tokenContractAddress,
        ["function balanceOf(address owner) view returns (uint256)"],
        provider
      );
      const balance = await contract.balanceOf(address);
      console.log(
        "balance",
        balance,
        ethers.utils.formatUnits(balance, Number(decimals))
      );
      return ethers.utils.formatUnits(balance, Number(decimals));
    }
  }

  useEffect(() => {
    async function fetchBalances() {
      if (isConnected && selectedAccount?.smartAccountAddress) {
        const balanceOne = await getBalance(
          selectedAccount?.smartAccountAddress,
          tokenOne.address,
          provider,
          tokenOne.decimals
        );
        const balanceTwo = await getBalance(
          selectedAccount?.smartAccountAddress,
          tokenTwo.address,
          provider,
          tokenTwo.decimals
        );

        // assuming setBalanceOne and setBalanceTwo are the state setters for balances of the tokens.
        setBalanceOne(balanceOne);
        setBalanceTwo(balanceTwo);
      }
    }

    if (wallet) fetchBalances();
  }, [selectedAccount, tokenOne, tokenTwo, isConnected, wallet]);

  /*   function getBalanceByContractAddress(address, data) {
    for (let token of data.alltokenBalances) {
      if (token.contract_address == address) {
        return token.balance;
      }
    }
    return "0.00";
  } */

  async function changeAmount(e) {
    try {
      setTokenOneAmount(e.target.value);

      const tokenOut = await fetchQuote(
        tokenOne,
        tokenTwo,
        parseFloat(e.target.value * 10 ** tokenOne.decimals).toFixed(0)
      );
      if (e.target.value && tokenOut) {
        setTokenTwoAmount(
          (Number(tokenOut) / 10 ** tokenTwo.decimals).toFixed(3)
        );
      } else {
        setTokenTwoAmount(null);
      }
    } catch (e) {
      setTokenTwoAmount(null);
      console.log(e);
    }
  }
  function switchTokens() {
    //setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
    //fetchPrices(two.address, one.address);
  }

  function openModal(asset) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i) {
    //setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      setTokenOne(tokenList[activeChainId.toString()][i]);
      //fetchPrices(tokenList[i].address, tokenTwo.address);
    } else {
      setTokenTwo(tokenList[activeChainId.toString()][i]);
      //fetchPrices(tokenOne.address, tokenList[i].address);
    }
    setIsOpen(false);
  }

  /*   useEffect(() => {
    async function getEthPrice() {
      const res = await axios.get(`https://api.coincap.io/v2/rates/polygon`);
   
      setEthPrice(res.data.data.rateUsd);
    }

    getEthPrice();
  }, []); */

  async function fetchQuote(one, two, tokenOneAmount) {
    const res = await axios.get(
      `https://api.1inch.io/v5.0/${activeChainId}/quote/`,
      {
        params: {
          fromTokenAddress: one.address,
          toTokenAddress: two.address,
          amount: tokenOneAmount,
        },
      }
    );
    console.log(res.data);
    setEstimatedGas(res.data.estimatedGas);
    return res.data.toTokenAmount;
  }

  async function fetchDexSwap() {
    if (
      !tokenOneAmount ||
      !isConnected ||
      parseFloat(tokenOneAmount) > parseFloat(balanceOne) ||
      !wallet ||
      !selectedAccount?.smartAccountAddress
    )
      return;
    const id = toast.loading("⏳ Preparing transaction...", {
      theme: "dark",
      position: "bottom-left",
    });
    try {
      setIsLoading(true);

      const allowance = await axios.get(
        `https://api.1inch.io/v5.0/${activeChainId}/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${selectedAccount?.smartAccountAddress}`
      );
      console.log(allowance);
      let smartAccount = wallet;
      const txs = [];
      if (
        tokenOne.address !== "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" &&
        Number(allowance.data.allowance) <
          Number(parseFloat(tokenOneAmount * 10 ** tokenOne.decimals))
      ) {
        const approve = await axios.get(
          `https://api.1inch.io/v5.0/${activeChainId}/approve/transaction?tokenAddress=${
            tokenOne.address
          }&amount=${Number(
            parseFloat(tokenOneAmount * 10 ** tokenOne.decimals)
          )}`
        );

        const tx1 = {
          to: approve.data.to,
          data: approve.data.data,
        };
        txs.push(tx1);
        console.log("not approved");
      }

      const tx = await axios.get(
        `https://api.1inch.io/v5.0/${activeChainId}/swap?fromTokenAddress=${
          tokenOne.address
        }&toTokenAddress=${tokenTwo.address}&amount=${Number(
          parseFloat(tokenOneAmount * 10 ** tokenOne.decimals)
        )}&fromAddress=${
          destination ? address : selectedAccount?.smartAccountAddress
        }&slippage=${slippage}&disableEstimate=true`
      );
      console.log(tx.data);

      const tx2 = {
        to: tx.data.tx.to,
        data: tx.data.tx.data,
        value: tx.data.tx.value,
      };
      console.log(tx2);
      txs.push(tx2);

      const txResponse = await smartAccount.sendTransactionBatch({
        transactions: txs,
      });

      toast.update(id, {
        render: "Sending transaction...",
        type: "info",
        isLoading: true,
        theme: "dark",
        icon: "⏳",
      });

      const txHash = await txResponse.wait();
      console.log("txHash", txHash);
      setIsLoading(false);
      getSmartAccountBalance();
      setTokenOneAmount(null);
      setTokenTwoAmount(null);

      toast.update(id, {
        render: "Transaction Successful ",
        type: "success",
        isLoading: false,
        icon: "👏",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      toast.update(id, {
        render: "Transaction Failed" + e.message,
        theme: "dark",
        type: "error",
        isLoading: false,
        icon: "❌",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div style={{ marginBottom: "15px" }}>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
        </Radio.Group>
      </div>
      <div>Swap to main Address?</div>
      <div>
        <Radio.Group value={destination} onChange={handleDestination}>
          <Radio.Button value={true}>Yes</Radio.Button>
          <Radio.Button value={false}>No</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );

  return (
    <>
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
      <div className="tradeBox">
        <div className="tradeBoxHeader">
          <h4>Gasless swap</h4>
          <Popover
            content={settings}
            title="Settings"
            trigger="click"
            placement="bottomRight"
          >
            <SettingOutlined className="cog" />
          </Popover>
        </div>
        <div className="inputs">
          <Input
            inputMode="decimal"
            type="number"
            d
            backgroundColor="#212121"
            placeholder="0"
            value={tokenOneAmount}
            onChange={changeAmount}
            //disabled={!prices}
          />
          <Input
            backgroundColor="#212121"
            style={{
              backgroundColor: "#212121",
            }}
            placeholder="0"
            value={tokenTwoAmount}
            disabled={true}
          />
          <div className="switchButton" onClick={switchTokens}>
            <ArrowDownOutlined className="switchArrow" />
          </div>
          <div className="assetOne" onClick={() => openModal(1)}>
            <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
            {tokenOne.ticker}

            <DownOutlined />
          </div>
          {isConnected && !isFetchingBalance && (
            <div className="assetOneBalance">
              Balance: {Number(parseFloat(balanceOne)).toFixed(3)}
            </div>
          )}
          <div className="assetTwo" onClick={() => openModal(2)}>
            <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
            {tokenTwo.ticker}
            <DownOutlined />
          </div>
          {isConnected && !isFetchingBalance && (
            <div className="assetTwoBalance">
              Balance: {Number(parseFloat(balanceTwo)).toFixed(3)}
            </div>
          )}
        </div>

        {tokenTwoAmount && (
          <Typography
            style={{
              color: "white",
              marginTop: "10px",
              marginBottom: "10px",
              fontWeight: "medium",
              fontSize: "14px",
            }}
          >
            Savings of{" "}
            <span style={{ fontWeight: "bold", color: "#348451" }}>
              $
              {(
                (parseFloat(ethPrice) *
                  parseFloat(estimatedGas) *
                  1.1 *
                  130880333007) /
                10 ** 18
              ).toFixed(4)}{" "}
            </span>
            in gas fee using 0xGasless
          </Typography>
        )}
        <div
          className="swapButton"
          disabled={
            isLoading ||
            !tokenOneAmount ||
            !isConnected ||
            tokenOneAmount > parseFloat(balanceOne)
          }
          onClick={fetchDexSwap}
        >
          Swap
        </div>
      </div>
    </>
  );
}

export default Swap;
