import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";

function App() {
  
  return (
    <Routes>
    <Route exact path="/"  Component={(props)=> <Home {...props}/>}/>
    <Route  path="/:pokemonid"  Component={(props)=> <Details {...props}/>}/>
    </Routes>
  );
}

export default App;
