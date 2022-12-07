import "bootstrap/dist/css/bootstrap.min.css";
import NavbarBr from "./components/NavbarBr";
import "./App.css";
import Mintcard from "@molecules/Mintcard";

function App() {
  return (
    <div className="App">
      <NavbarBr />
      <Mintcard />
    </div>
  );
}

export default App;
