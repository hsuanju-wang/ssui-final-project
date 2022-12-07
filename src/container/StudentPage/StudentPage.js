import { useState } from "react";
import { Routes, Route  } from "react-router-dom";
import ResultViewPanel from '../ResultViewPanel/ResultViewPanel';
import ControlPanel from '../ControlPanel/ControlPanel';

import './StudentPage.css'

let globalItemCount = 0;

const StudentPage = (props) => {
  // Data Visualization =================
  const [threshold, setThreshold] = useState(5);
  const [dataGroup, setDataGroup] = useState("gender");
  // End of Data Visualization =============


  return(
    <div className='main-container'>
        <ControlPanel 
            setDataGroup = {setDataGroup}
            setThreshold = {setThreshold}
            threshold = {threshold}/>
        <ResultViewPanel
            threshold = {threshold}
            dataGroup = {dataGroup}/>        
  </div>
  );
}

export default StudentPage;