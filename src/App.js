import React from "react";
import PropertyContainer from "./Containers/Property/Property";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-toastify/dist/ReactToastify.css"; // css for toast

function App() {
  return (
    <div className="App">
      <PropertyContainer />
      <ToastContainer
      //will acquire all default properties
      />
    </div>
  );
}

export default App;
