import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { Fragment } from "react";
import router from "./router";
import AuthContextProvider from "./context/AuthContextProvider";

const App = () => {
  return (
    <Fragment>
      <AuthContextProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </AuthContextProvider>
    </Fragment>
  );
};

export default App;
