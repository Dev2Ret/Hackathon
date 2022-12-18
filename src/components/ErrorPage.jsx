import { useRouteError } from "react-router-dom";
import NavbarBr from "./NavbarBr";

export default function ErrorPage() {
  const error = useRouteError();

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
