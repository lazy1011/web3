import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message } from "antd";

import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import tokenList from "../Utils/tokenList.json";
import axios from "axios";
import { Typography } from "@mui/material";
import { useSmartAccountContext } from "../contexts/SmartAccountContext.tsx";
import { toast } from "react-toastify";
import { useAccount, useProvider, useSigner,useBalance } from "wagmi";
import { ethers } from "ethers";
import { Biconomy } from "@biconomy/mexa";
import { tokenABI } from "../Utils/abi.js";
import apiList from "../Utils/apiList.json";
import {
  SignTypedDataVersion,
  recoverTypedSignature,
} from "@metamask/eth-sig-util";

function Swap2(props: any) {
  const {
    selectedAccount,
    getSmartAccountBalance,
    isFetchingBalance,
    activeChain: activeChainId,
  } = useSmartAccountContext();
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const provider = signer?.provider as any;
  const [messageApi, contextHolder] = message.useMessage();
  const [slippage, setSlippage] = useState(2.5);
  const [tokenOneAmount, setTokenOneAmount] = useState<string | null>(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  //@ts-ignore
  const [tokenOne, setTokenOne] = useState(
    //@ts-ignore
    tokenList[activeChainId ? activeChainId : 137][0]
  );
  const [tokenTwo, setTokenTwo] = useState(
    //@ts-ignore
    tokenList[activeChainId ? activeChainId : 137][1]
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
  const [swBalanceOne, setSwBalanceOne] = useState("0");
  const [swBalanceTwo, setSwBalanceTwo] = useState("0");
  const [gasPrice, setGasPrice] = useState("0");

  useEffect(() => {
    let timer: any;
    const handleInput = async () => {
      if (tokenOneAmount === null) return;
      const tokenOut = await fetchQuote(
        tokenOne,
        tokenTwo,
        //@ts-ignore
        ethers.utils.parseUnits(tokenOneAmount, tokenOne.decimals)
      );
      if (tokenOneAmount && tokenOut) {
        setTokenTwoAmount(
          //@ts-ignore
          (Number(tokenOut) / 10 ** tokenTwo.decimals).toFixed(3)
        );
        console.log("Hello", tokenOneAmount);
      }
    };
    timer = setTimeout(handleInput, 1000);
    return () => clearTimeout(timer);
    //@ts-ignore
  }, [tokenOneAmount]);

  function handleSlippageChange(e: any) {
    setSlippage(e.target.value);
  }

  function handleDestination(e: any) {
    setDestination(e.target.value);
  }

  useEffect(() => {
    console.log("selectedAccount", selectedAccount);
  }, [selectedAccount]);
  //@ts-ignore
  async function getBalance(address, tokenContractAddress, provider, decimals) {
    if (tokenContractAddress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
      const balance = await provider.getBalance(address);

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
  const domainType = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "verifyingContract", type: "address" },
    { name: "salt", type: "bytes32" },
  ];

  const metaTransactionType = [
    { name: "nonce", type: "uint256" },
    { name: "from", type: "address" },
    { name: "functionSignature", type: "bytes" },
  ];

  useEffect(() => {
    let intervalId: any;
    async function fetchBalances() {
      try {
        if (isConnected) {
          setTimeout(async () => {
            const balanceOne = await getBalance(
              address,
              tokenOne.address,
              provider,
              tokenOne.decimals
            );
            const balanceTwo = await getBalance(
              address,
              tokenTwo.address,
              provider,
              tokenTwo.decimals
            );
            setBalanceOne(balanceOne);
            setBalanceTwo(balanceTwo);
            const swTokenBalanceOne = selectedAccount?.smartAccountAddress
              ? await getBalance(
                  selectedAccount.smartAccountAddress,
                  tokenOne.address,
                  provider,
                  tokenOne.decimals
                )
              : "0";

            const swTokenBalanceTwo = selectedAccount?.smartAccountAddress
              ? await getBalance(
                  selectedAccount.smartAccountAddress,
                  tokenTwo.address,
                  provider,
                  tokenTwo.decimals
                )
              : "0";

            // assuming setBalanceOne and setBalanceTwo are the state setters for balances of the tokens.

            setSwBalanceOne(swTokenBalanceOne);
            setSwBalanceTwo(swTokenBalanceTwo);
          }, 500);
        }
      } catch (e) {
        console.log("error bal", e);
      }
    }

    if (address && provider) {
      fetchBalances();
      intervalId = setInterval(() => {
        fetchBalances();
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [
    wallet,
    selectedAccount?.smartAccountAddress,
    tokenOne,
    tokenTwo,
    isConnected,
    provider,
    activeChainId,
  ]);

  /*   function getBalanceByContractAddress(address, data) {
    for (let token of data.alltokenBalances) {
      if (token.contract_address == address) {
        return token.balance;
      }
    }
    return "0.00";
  } */

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  async function changeAmount(e: any, token: any = undefined) {
    try {
      const amount = token ? token : e.target.value;
      setTokenOneAmount(amount);
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

  function openModal(asset: any) {
    setChangeToken(asset);
    setIsOpen(true);
  }

  function modifyToken(i: any) {
    //setPrices(null);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
    if (changeToken === 1) {
      //@ts-ignore
      setTokenOne(tokenList[activeChainId][i]);
      //fetchPrices(tokenList[i].address, tokenTwo.address);
    } else {
      //@ts-ignore
      setTokenTwo(tokenList[activeChainId][i]);
      //fetchPrices(tokenOne.address, tokenList[i].address);
    }
    setIsOpen(false);
  }

  useEffect(() => {
    //@ts-ignore
    setTokenTwo(tokenList[activeChainId ? activeChainId : 137][1]);
    //@ts-ignore
    setTokenOne(tokenList[activeChainId ? activeChainId : 137][0]);
  }, [activeChainId]);
  /*   useEffect(() => {
    async function getEthPrice() {
      const res = await axios.get(`https://api.coincap.io/v2/rates/polygon`);
   
      setEthPrice(res.data.data.rateUsd);
    }

    getEthPrice();
  }, []); */
  //@ts-ignore
  async function fetchQuote(one, two, tokenOneAmount) {
    try {
      const res = await axios.get(
        `https://api.1inch.io/v5.0/${activeChainId}/quote/`,
        {
          params: {
            fromTokenAddress: one.address,
            toTokenAddress: two.address,
            amount: tokenOneAmount.toString(),
          },
        }
      );
      console.log(res.data);
      setEstimatedGas(res.data.estimatedGas);
      return res.data.toTokenAmount;
    } catch (error: any) {
      if (error.response.data.statusCode == 400) {
        setErrorMsg(error.response.data.description);
      } else {
        setErrorMsg("");
      }
    }
  }

  async function fetchDexSwap() {
    if (
      !tokenOneAmount ||
      !isConnected ||
      (parseFloat(tokenOneAmount) > parseFloat(balanceOne) &&
        parseFloat(tokenOneAmount) > parseFloat(swBalanceOne)) ||
      !wallet ||
      !selectedAccount?.smartAccountAddress
    )
      return;
    const id = toast.loading("⏳ Preparing meta transaction...", {
      theme: "dark",
      position: "bottom-left",
    });
    try {
      setIsLoading(true);

      if (parseFloat(swBalanceOne) >= parseFloat(tokenOneAmount)) {
        toast.update(id, {
          render: "Preparing Swap now ...",
          type: "info",
          isLoading: true,
          theme: "dark",
          icon: "⏳",
        });
        const allowance = await axios.get(
          `https://api.1inch.io/v5.0/${activeChainId}/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${selectedAccount?.smartAccountAddress}`
        );
        console.log(allowance);
        let smartAccount = wallet;
        const txs = [];
        if (
          tokenOne.address !== "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" &&
          Number(allowance.data.allowance) <
            //@ts-ignore
            Number(parseFloat(tokenOneAmount * 10 ** tokenOne.decimals))
        ) {
          const approve = await axios.get(
            `https://api.1inch.io/v5.0/${activeChainId}/approve/transaction?tokenAddress=${
              tokenOne.address
            }&amount=${ethers.utils
              .parseUnits(tokenOneAmount, tokenOne.decimals)
              .toString()}`
          );

          const tx1 = {
            to: approve.data.to,
            data: approve.data.data,
          };
          txs.push(tx1);
        }

        const tx = await axios.get(
          `https://api.1inch.io/v5.0/${activeChainId}/swap?fromTokenAddress=${
            tokenOne.address
          }&toTokenAddress=${tokenTwo.address}&amount=${ethers.utils
            .parseUnits(tokenOneAmount, tokenOne.decimals)
            .toString()}&fromAddress=${
            selectedAccount.smartAccountAddress
          }&destReceiver=${address}&slippage=${slippage}&disableEstimate=true`
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
        return;
      }
      //@ts-ignore
      // biconomy object creation
      const biconomy = new Biconomy(window.ethereum, {
        //@ts-ignore
        apiKey: apiList[`${activeChainId}`].meta_tx,
        debug: true,
        strictMode: true,
        contractAddresses: [tokenOne.address],
        // list of contract address you want to enable gasless on
      });

      // The first argument of the Biconomy class is an EIP 1193 type provider that has to be passed.
      // If there is a type mismatch you'll have to set the type of the provider as
      // External Provider
      /*       type ExternalProvider = {
        isMetaMask?: boolean;
        isStatus?: boolean;
        host?: string;
        path?: string;
        sendAsync?: (
          request: { method: string; params?: Array<any> },
          callback: (error: any, response: any) => void
        ) => void;
        send?: (
          request: { method: string; params?: Array<any> },
          callback: (error: any, response: any) => void
        ) => void;
        request?: (request: {
          method: string;
          params?: Array<any>;
        }) => Promise<any>;
      }; */

      await biconomy.init();
      // To create contract instances you can do:
      const contractInstance = new ethers.Contract(
        //@ts-ignore
        tokenOne.address,
        tokenOne.address == "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"
          ? tokenABI.abi
          : tokenOne.isNonces
          ? tokenABI.abi3
          : tokenABI.abi2,
        //@ts-ignore
        biconomy.ethersProvider
      );
      let nonce;
      if (tokenOne.isNonces) {
        nonce = await contractInstance.nonces(address);
      } else {
        nonce = await contractInstance.getNonce(address);
      }

      let contractInterface = new ethers.utils.Interface(
        tokenOne.address == "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"
          ? tokenABI.abi
          : tokenOne.isNonces
          ? tokenABI.abi3
          : tokenABI.abi2
      );

      let functionSignature = contractInterface.encodeFunctionData("transfer", [
        selectedAccount.smartAccountAddress,
        ethers.utils.parseUnits(tokenOneAmount, tokenOne.decimals).toString(),
      ]);

      let message;
      let dataToSign;
      const deadline: number = parseInt(
        (Date.now() / 1000 + 30 * 60).toFixed(0)
      );
      let signature;
      if (!tokenOne.isPermit) {
        message = {
          nonce: parseInt(nonce),
          //@ts-ignore
          from: ethers.utils.getAddress(address),
          functionSignature: functionSignature,
        };
        dataToSign = JSON.stringify({
          types: {
            EIP712Domain: domainType,
            MetaTransaction: metaTransactionType,
          },
          domain: tokenOne.domainData,
          primaryType: "MetaTransaction",
          message: message,
        });
        signature = await provider.send("eth_signTypedData_v3", [
          //@ts-ignore
          ethers.utils.getAddress(address),
          dataToSign,
        ]);
      } else {
        message = {
          // @ts-ignore
          owner: ethers.utils.getAddress(address),
          spender: selectedAccount.smartAccountAddress,
          value: ethers.utils
            .parseUnits(tokenOneAmount, tokenOne.decimals)
            .toString(),
          nonce: parseInt(nonce),
          deadline: deadline,
        };
        const Permit = [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ];
        dataToSign = JSON.stringify({
          types: {
            EIP712Domain: [
              { name: "name", type: "string" },
              { name: "version", type: "string" },
              { name: "chainId", type: "uint256" },
              { name: "verifyingContract", type: "address" },
            ],
            Permit: Permit,
          },
          domain: tokenOne.domainData,
          primaryType: "Permit",
          message: message,
        });
        signature = await provider.send("eth_signTypedData_v4", [
          //@ts-ignore
          ethers.utils.getAddress(address),
          dataToSign,
        ]);
      }

      /*       const DOMAIN_SEPARATOR =
        "0x" +
        eth_sig_utils.TypedDataUtils.hashStruct(
          "EIP712Domain",
          domainData,
          // @ts-ignore
          domainType,
          SignTypedDataVersion.V4
        ).toString("hex"); */

      /*       const META_TRANSACTION_TYPEHASH = ethers.utils.keccak256(
                ethers.utils.toUtf8Bytes(
                  "MetaTransaction(uint256 nonce,address from,bytes functionSignature)"
                )
              ); */
      /*       const DOMAIN_SEPARATOR = ethers.utils.solidityKeccak256(
        ["bytes"],
        [
          ethers.utils.defaultAbiCoder.encode(
            ["bytes32", "bytes32", "bytes32", "uint256", "address"],
            [
              ethers.utils.keccak256(
                ethers.utils.toUtf8Bytes(
                  "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                )
              ),
              ethers.utils.keccak256(ethers.utils.toUtf8Bytes("Revolt 2 Earn")),
              ethers.utils.keccak256(ethers.utils.toUtf8Bytes("1")),
              137,
              tokenOne.address,
            ]
          ),
        ]
      );
      console.log("DOMAIN_SEPARTOR", DOMAIN_SEPARATOR); */

      const recovered = await recoverTypedSignature({
        data: JSON.parse(dataToSign),
        signature: signature,
        version: SignTypedDataVersion.V4,
      });

      console.log(
        "recovered",
        ethers.utils.getAddress(recovered),
        //@ts-ignore
        ethers.utils.getAddress(address) === ethers.utils.getAddress(recovered),
        //@ts-ignore
        ethers.utils.getAddress(address)
      );

      let { r, s, v } = getSignatureParameters(signature);
      /* 
      const recoveredAddress = ethers.utils.verifyMessage(
        ethers.utils.arrayify(dataToSign),
        signature
      );
      const signerCheck = recoveredAddress == address; // => true
      console.log("SIGNER CHECK: ", signerCheck, recoveredAddress, address); */
      let data;
      if (!tokenOne.isPermit) {
        data =
          await contractInstance.populateTransaction.executeMetaTransaction(
            //@ts-ignore
            ethers.utils.getAddress(address),
            functionSignature,
            r,
            s,
            v
          );
      } else {
        data = await contractInstance.populateTransaction.permit(
          //@ts-ignore
          ethers.utils.getAddress(address),
          selectedAccount.smartAccountAddress,
          ethers.utils.parseUnits(tokenOneAmount, tokenOne.decimals).toString(),
          deadline, // 3O MINUTES Deadline
          v,
          r,
          s
        );
      }

      let txParams = {
        data: data?.data,
        to: tokenOne.address,
        //@ts-ignore
        from: ethers.utils.getAddress(address),
        signatureType: "EIP712_SIGN",
      };

      const bicoProvider = await biconomy.provider;
      //@ts-ignore
      const tx1 = await bicoProvider.send("eth_sendTransaction", [txParams]);
      console.log("tx1", tx1);
      toast.update(id, {
        render: "Preparing Swap now ...",
        type: "info",
        isLoading: true,
        theme: "dark",
        icon: "⏳",
      });

      biconomy.on("txMined", async (data: any) => {
        console.log(data);
        await timeout(2000);
        const allowance = await axios.get(
          `https://api.1inch.io/v5.0/${activeChainId}/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${selectedAccount?.smartAccountAddress}`
        );
        console.log(allowance);
        let smartAccount = wallet;
        const txs = [];
        const amount = tokenOne.tax
          ? ethers.utils
              .parseUnits(tokenOneAmount, tokenOne.decimals)
              .sub(
                ethers.utils
                  .parseUnits(tokenOneAmount, tokenOne.decimals)
                  .mul(ethers.BigNumber.from(tokenOne.tax))
                  .div(100)
              )
              .sub(1)
              .toString()
          : ethers.utils
              .parseUnits(tokenOneAmount, tokenOne.decimals)
              .sub(1)
              .toString();
        if (tokenOne.isPermit) {
          const data = contractInterface.encodeFunctionData("transferFrom", [
            //@ts-ignore
            ethers.utils.getAddress(address),
            selectedAccount.smartAccountAddress,
            ethers.utils
              .parseUnits(tokenOneAmount, tokenOne.decimals)
              .sub(1)
              .toString(),
          ]);
          const trxFrom = {
            to: tokenOne.address,
            data: data,
          };
          txs.push(trxFrom);
          /* 
          const transferFromTx = await smartAccount.sendTransaction({
            transaction: trxFrom,
          });
          await transferFromTx.wait(); */
        }

        if (
          tokenOne.address !== "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE" &&
          ethers.BigNumber.from(allowance.data.allowance).lt(amount)
        ) {
          const approve = await axios.get(
            `https://api.1inch.io/v5.0/${activeChainId}/approve/transaction?tokenAddress=${tokenOne.address}&amount=${amount}`
          );

          const tx1 = {
            to: approve.data.to,
            data: approve.data.data,
          };
          txs.push(tx1);
          console.log("not approved");
        }

        console.log(
          `https://api.1inch.io/v5.0/${activeChainId}/swap?fromTokenAddress=${tokenOne.address}&toTokenAddress=${tokenTwo.address}&amount=${amount}&fromAddress=${selectedAccount.smartAccountAddress}&destReceiver=${address}&slippage=${slippage}&disableEstimate=true`
        );

        const tx = await axios.get(
          `https://api.1inch.io/v5.0/${activeChainId}/swap?fromTokenAddress=${tokenOne.address}&toTokenAddress=${tokenTwo.address}&amount=${amount}&fromAddress=${selectedAccount.smartAccountAddress}&destReceiver=${address}&slippage=${slippage}&disableEstimate=true`
        );

        console.log(tx.data);

        const tx2 = {
          to: tx.data.tx.to,
          data: tx.data.tx.data,
          value: tx.data.tx.value,
        };
        console.log(tx2);
        txs.push(tx2);
        if (activeChainId != 137) {
          smartAccount.on("txHashGenerated", (response: any) => {
            console.log("txMined event received via emitter", response);
            setIsLoading(false);
            getSmartAccountBalance();
            setTokenOneAmount(null);
            setTokenTwoAmount(null);
            toast.dismiss(id);
            toast("Transaction Successful", {
              type: "success",
              position: "bottom-left",
              autoClose: 5000,
              isLoading: false,
              icon: "👏",
              hideProgressBar: false,
              pauseOnHover: true,
              progress: undefined,
              theme: "dark",
            });
          });
        }
        console.log(smartAccount.getConfig().activeNetworkId);
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
        if (activeChainId == 137) {
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
        }
      });
    } catch (e: any) {
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

  const getSignatureParameters = (signature: string) => {
    if (!ethers.utils.isHexString(signature)) {
      throw new Error(
        'Given value "'.concat(signature, '" is not a valid hex string.')
      );
    }
    var r = signature.slice(0, 66);
    var s = "0x".concat(signature.slice(66, 130));
    var v: any = "0x".concat(signature.slice(130, 132));
    v = ethers.BigNumber.from(v).toNumber();
    if (![27, 28].includes(v)) v += 27;
    return {
      r: r,
      s: s,
      v: v,
    };
  };

  const settings = (
    <>
      <div>Slippage Tolerance</div>
      <div style={{ marginBottom: "15px" }}>
        <Radio.Group value={slippage} onChange={handleSlippageChange}>
          <Radio.Button value={0.5}>0.5%</Radio.Button>
          <Radio.Button value={2.5}>2.5%</Radio.Button>
          <Radio.Button value={5}>5.0%</Radio.Button>
          <Radio.Button value={25}>25.0%</Radio.Button>
        </Radio.Group>
      </div>
      {/*       <div>Swap to main Address?</div>
      <div>
        <Radio.Group value={destination} onChange={handleDestination}>
          <Radio.Button value={true}>Yes</Radio.Button>
          <Radio.Button value={false}>No</Radio.Button>
        </Radio.Group>
      </div> */}
    </>
  );
  const { data, isError} = useBalance({
    address: '0x994A258c7Dec633b5b15376f850D5Ea701179E79',
  })

  function setPrice() {
    changeAmount(undefined, Number(parseFloat(balanceOne)).toString());
  }
  return (
    <>
      <Modal
        open={isOpen}
        footer={null}
        onCancel={() => setIsOpen(false)}
        title="Select a token"
      >
        <div className="modalContent">
          {/* @ts-ignore */}
          {tokenList[activeChainId ? activeChainId : 137].map((e, i) => {
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
            // @ts-ignore
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
            // @ts-ignore
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
              Balance:{" "}
              {Number(
                parseFloat(balanceOne) + parseFloat(swBalanceOne)
              ).toFixed(3)}
              <div className="max" onClick={setPrice}>
                MAX
              </div>
            </div>
          )}
          <div className="assetTwo" onClick={() => openModal(2)}>
            <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
            {tokenTwo.ticker}
            <DownOutlined />
          </div>
          {isConnected && !isFetchingBalance && (
            <div className="assetTwoBalance">
              Balance:{" "}
              {Number(
                parseFloat(balanceTwo) + parseFloat(swBalanceTwo)
              ).toFixed(3)}
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
                  130880333007 *
                  (activeChainId! == 137 ? 1 : 5)) /
                10 ** 18
              ).toFixed(4)}{" "}
            </span>
            in gas fee using 0xGasless
          </Typography>
        )}
        {errorMsg && (
          <span style={{ fontWeight: "bold", color: "red" }}>{errorMsg}</span>
        )}
        <div
          className="swapButton"
          // @ts-ignore
          disabled={
            (data && data?.formatted<"100000")||
            isLoading ||
            !tokenOneAmount ||
            !isConnected ||
            (parseFloat(tokenOneAmount) > parseFloat(balanceOne) &&
              parseFloat(tokenOneAmount) > parseFloat(swBalanceOne)) 
          }
          onClick={fetchDexSwap}
        >
          Swap
        </div>
      </div>
    </>
  );
}

export default Swap2;
