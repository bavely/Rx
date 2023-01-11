import React, { useContext, useEffect, useState, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import SwitchApp from "./Switch";
import helper from "./utils/helper";

function App() {
 
  return (
    <Router>
      <SwitchApp />  
    </Router>
  );
}

export default App;
