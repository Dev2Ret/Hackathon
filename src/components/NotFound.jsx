import { useRouteError } from "react-router-dom";
import NavbarBr from "../components/NavbarBr";

export default function NotFound() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <NavbarBr />
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </>
  );
}
