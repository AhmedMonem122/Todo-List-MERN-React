import { Fragment, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, matchPath, useLocation } from "react-router";

const RootLayout = () => {
  const patterns = ["/register", "/login", "/", "/profile"];

  const { pathname } = useLocation();

  const match = patterns.reduce(
    (match, pattern) => (match ? match : matchPath(pattern, pathname)),
    null
  );

  useEffect(() => {
    if (match) {
      document.body.style.backgroundImage = "none";
    }
  }, [match]);

  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
};

export default RootLayout;
