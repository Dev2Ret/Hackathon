import Web3 from "web3"; // 'web3/dist/web3.min.js'
import chains from "@atoms/chains";
import profile from "@atoms/profile";
import { useState } from "react";

const useWeb3 = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  const getChainId = async () => {
    const chainId = await window.ethereum.request({
      // 메타마스크가 사용하고 있는 네트워크의 체인 아이디를 return
      method: "eth_chainId",
    });

    return chainId;
  };

  const getRequestAccounts = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  };
};

export default function Connectwallet() {
  // async function getBalance() {
  //   const getBalance = await web3.eth.getBalance(
  //     "0x9acbB72Cf67103A30333A32CD203459c6a9c3311"
  //   );
  //   const ethBalance = web3.utils.fromWei(getBalance);
  // }

  return <div></div>;
}
