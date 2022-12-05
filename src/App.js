import logo from './logo.svg';
import React, { Component, useState } from "react";
import './App.css';
import ResultViewPanel from './container/ResultViewPanel/ResultViewPanel';
import ControlPanel from './container/ControlPanel/ControlPanel';

const App = () => {
  const [threshold, setThreshold] = useState(5);
  const [dataGroup, setDataGroup] = useState("gender");

  
  return (
    <React.Fragment>
      <div className='main-container'>
        <ControlPanel 
            setDataGroup = {setDataGroup}
            setThreshold = {setThreshold}
            threshold = {threshold}/>
        <ResultViewPanel
            threshold = {threshold}
            dataGroup = {dataGroup}/>        
      </div>
    </React.Fragment>
  );
}

export default App;
