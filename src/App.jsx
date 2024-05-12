import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { Fragment } from "react";
import router from "./router";

const App = () => {
  return (
    <Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </Fragment>
  );
};

export default App;
