import { Button } from "react-bootstrap";
import "@styles/Mintcard.css";
import Web3 from "web3";


// async function connectWallet() {
//   try {
//     if (window.ethereum) {
//       let web3 = new Web3(window.ethereum);
//       await window.ethereum.send("eth_requestAccounts");
//       let account = await web3.eth.getAccounts(); // grab the wallet address
//       account = account[0];
//       document.getElementById("wallet-address").textContent = account; // 받은 account 정보를 해당 id를 가진 tag로

//       contract = new web3.eth.Contract(ABI, ADDRESS);
//       document.getElementById("mint").onclick = async () => {
//         const _mintAmount = Number(
//           document.querySelector("[name=amount]").value
//         ); // input에서 지정한
//         const mintRate = Number(await contract.methods.cost().call());
//         const totalAmount = mintRate * _mintAmount;
//         contract.methods
//           .mint(account, _mintAmount)
//           .send({ from: account, value: String(totalAmount) });
//       };
//     }
//   } catch (ex) {
//     console.log(ex);
//   }
// }

export default function Mintcard() {
  return (
    <div className="row">
      <form
        class="gradient col-lg-5 mt-5"
        style={{ borderRadius: "25px", boxShadow: "1px 1px 10px #FFD700" }}
      >
        <h4 style={{ color: "#FFFFFF" }}>Mint Portal</h4>
        <h5>Please connect your wallet</h5>
        <Button style={{ marginBottom: "5px" }}>
          Connect wallet
        </Button>
        <div
          class="card"
          id="wallet-address"
          style={{ marginTop: "3px", boxShadow: "1px 1px 4px #000000" }}
        >
          <label for="floatingInput">Wallet Address</label>
          <input
            type="number"
            name="amount"
            defaultValue="1"
            min="1"
            max="5"
          ></input>
          <label>Please select the amount of NFTs to mint</label>
          <Button>Mint/Buy</Button>
        </div>
        <label>Price 0.06 ETH each mint.</label>
      </form>
    </div>
  );
}
