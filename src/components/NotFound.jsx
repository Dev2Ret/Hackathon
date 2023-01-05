import { useLocation } from "react-router-dom";

export default function NotFound() {

  let location = useLocation();

  return (
    <>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>
          No match for <code>{location.pathname}</code>
        </p>
      </div>
    </>
  );
}
