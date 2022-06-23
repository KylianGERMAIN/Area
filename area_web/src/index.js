import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./assets/fonts/sansation/Sansation_Light.ttf";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ToastContainer
        draggable
        position={"bottom-center"}
        autoClose={3000}
        limit={3}
      />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
