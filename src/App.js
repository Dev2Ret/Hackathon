import "bootstrap/dist/css/bootstrap.min.css";
import NavbarBr from "./components/NavbarBr";
import { Outlet } from "react-router-dom";
import "./App.css";
import Mintcard from "@molecules/Mintcard";
import Connectwallet from "@molecules/Connectwallet";

function App() {

  return (
    <div className="App">
      <NavbarBr />
      <Outlet />

      <Mintcard />

      <Connectwallet />
    </div>
  );
}

export default App;
