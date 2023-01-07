import "bootstrap/dist/css/bootstrap.min.css";
import NavbarBr from "./components/NavbarBr";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NFTcard from "@molecules/NFTCard";
import Raffles from "@components/Raffles";
import UploadNFT from "@components/UploadNFT";
import NotFound from "@components/NotFound";
import RaffleDetail from "@components/RaffleDetail";
import Market from "@components/Martket";
import { AccountsProvider } from "@contexts/AccountsContext";

function App() {
  return (
    <div className="App">
      <AccountsProvider>
        <NavbarBr />
        <Routes>
          <Route index element={<NFTcard />}></Route>
          <Route path="raffles" element={<Raffles />}></Route>
          <Route path="raffles/:chain" element={<Raffles />}></Route>
          <Route
            path="raffles/:chain/:contractId"
            element={<RaffleDetail />}
          ></Route>
          <Route path="uploadnft" element={<UploadNFT />}></Route>
          <Route path="market" element={<Market />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AccountsProvider>
    </div>
  );
}

export default App;
