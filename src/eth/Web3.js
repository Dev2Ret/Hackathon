import Web3 from "web3";

let web3 =
  window.ethereum === undefined
    ? new Web3(process.env.REACT_APP_WEB3_PROVIDER)
    : new Web3(window.ethereum);

export const ConnectedWeb3 = () => {
  return web3;
}

export const Contract = (meta) => {
  return new web3.eth.Contract(meta.abi, meta.address);
}

export const SelectedAddress = () => {
  return web3.eth.givenProvider.selectedAddress;
}


