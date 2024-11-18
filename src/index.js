import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './styles.css';  // Adjust the path based on where your CSS file is located


const root = ReactDOM.createRoot(
   document.getElementById("root"));
root.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);

