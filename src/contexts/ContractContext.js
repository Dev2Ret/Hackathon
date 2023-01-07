// import { createContext } from "react";
// import Web3 from "web3";
// import { RaffleABI } from "@abis/Raffle";

// // export const RaffleContract = undefined;

// export const RaffleManagerContract = createContext(getRaffleManagerContractMethods());

// // export const aa = createContext(setProvider());

// let web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER);

// function getRaffleManagerContractMethods() {

//   const web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER);

//   let contract = new web3.eth.Contract(
//     RaffleABI,
//     "0x6355f6638e4a005c3bf94f1d0ffe7161072950bd"
//   );
//   // contract.methods.showAll().call().then(console.log);
//   return contract.methods;
// }

// // function setProvider() {
// //   if(window.ethereum !== undefined) {
// //     if (MetaMaskOnboarding.isMetaMaskInstalled()) {
// //       web3 = new Web3(window.ethereum);
// //       // window.ethereum.request({ method: "eth_requestAccounts" }).call();
// //     }
// //   }

// //   console.log('web3 : ', web3.currentProvider);
// // }
