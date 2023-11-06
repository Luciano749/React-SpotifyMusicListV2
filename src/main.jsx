import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import ResetStyles from "./styles/Reset.styles.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResetStyles />
    <App />
  </React.StrictMode>
);
