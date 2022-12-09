import "bootstrap/dist/css/bootstrap.min.css";
import NavbarBr from "./components/NavbarBr";
import "./App.css";
import Mintcard from "@molecules/Mintcard";
import Connectwallet from "@molecules/Connectwallet";

function App() {
  return (
    <div className="App">
      <NavbarBr />
      <Mintcard />

      <Connectwallet />
    </div>
  );
}

export default App;
