import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Home } from "./components/Index";

export const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);
    if (location.pathname === "/") setLoggedIn(false);
  }, [location.pathname]);

  return (
    <>
      <Home isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
    </>
  );
};

export default App;
