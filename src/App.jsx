import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { Fragment } from "react";
import router from "./router";
import AuthContextProvider from "./context/AuthContextProvider";
import TodosContextProvider from "./context/TodosContextProvider";

const App = () => {
  return (
    <Fragment>
      <AuthContextProvider>
        <TodosContextProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <RouterProvider router={router} />
        </TodosContextProvider>
      </AuthContextProvider>
    </Fragment>
  );
};

export default App;
