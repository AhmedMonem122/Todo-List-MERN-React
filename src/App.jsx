import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
