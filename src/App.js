import "bootstrap/dist/css/bootstrap.min.css";
import NavbarBr from "./components/NavbarBr";
import { Outlet } from "react-router-dom";
import "./App.css";
import Mintcard from "@molecules/Mintcard";

function App() {
  console.log('app1');

  return (
      <div className="App">
        <NavbarBr />
        <Outlet />

        {/* <Mintcard /> */}
      </div>
  );
}

export default App;
