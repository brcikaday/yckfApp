import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/home.jsx";
import FreeTraining from "./pages/free_training.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <>
      <App />
    </>
  </BrowserRouter>
);
