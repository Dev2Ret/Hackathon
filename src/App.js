import "bootstrap/dist/css/bootstrap.min.css";
import NavbarBr from "./components/NavbarBr";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AccountsProvider } from "@contexts/AccountsContext";
import NFTCard from "@molecules/NFTCard";
import Raffles from "@components/Raffles";
import UploadNFT from "@components/UploadNFT";
import NotFound from "@components/NotFound";
import RaffleDetail from "@components/RaffleDetail";
import Dashboard from "@components/Dashboard";

function App() {
  return (
    <div className="App">
      <AccountsProvider>
        <NavbarBr />
        <Routes>
          <Route index element={<UploadNFT />}></Route>
          <Route path="raffles" element={<Raffles />}></Route>
          <Route path="raffles/:chain" element={<Raffles />}></Route>
          <Route
            path="raffles/:chain/:contractAddress"
            element={<RaffleDetail />}
          ></Route>
          <Route path="uploadnft" element={<UploadNFT />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
          {/* <Route path="market" element={<div>market</div>}></Route> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AccountsProvider>
    </div>
  );
}

export default App;
