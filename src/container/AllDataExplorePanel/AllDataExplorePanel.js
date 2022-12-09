import {React,useState, useEffect, useLayoutEffect, useRef}from "react";
import Papa from 'papaparse';
import TotalGenderData from '../../assets/data/totalGender.csv';
import TotalRaceData from '../../assets/data/totalRace.csv';
import TotalAgeData from '../../assets/data/totalAge.csv';

import './AllDataExplorePanle.css'
import AllBarChart from "./AllBarChart";
import AllPieChart from './AllPieChart';

const AllDataExplorePanel = (props) => {
    const [totalGenderData, setTotalGenderData] = useState(undefined);
    const [totalRaceData, setTotalRaceData] = useState(undefined);
    const [totalAgeData, setTotalAgeData] = useState(undefined);

    const [chartType, setChartType] = useState("bar");
    const fetchCsv2 = (cvsData) => {
        return fetch(cvsData).then(function (response) {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');
    
            return reader.read().then(function (result) {
                return decoder.decode(result.value);
            });
        });
    }
        
    async function getCsvData2(cvsData) {
        let csvData = await fetchCsv2(cvsData);
        return(Papa.parse(csvData, {header: false}));
    }
    
    useEffect(() => {
        getCsvData2(TotalGenderData).then(result => {
            result.data.shift();
            setTotalGenderData(result.data);
            console.log(result.data);
        });

        getCsvData2(TotalRaceData).then(result => {
            result.data.shift();
            setTotalRaceData(result.data);
        });

        getCsvData2(TotalAgeData).then(result => {
            result.data.shift();
            setTotalAgeData(result.data);
        });
    }, []);

    const onChangeTypeValue = (e) => {
        setChartType(e.target.value);
    }
  
    return(
        <div style={{width: "100%"}}>
            <div>
                <div onChange={(e) => onChangeTypeValue(e)} style={{display:"flex", justifyContent:"flex-end", paddingRight: "5%"}}>
                    <input type="radio" value="bar" name="group"  defaultChecked/> Bar Chart
                    <input type="radio" value="pie" name="group" style={{marginLeft: "5%"}}/> Pie Chart
                </div>
            </div>
            {totalGenderData!==undefined && totalRaceData!==undefined && totalAgeData!== undefined && chartType === 'bar' &&
                <AllBarChart genderData = {totalGenderData} raceData = {totalRaceData} ageData={totalAgeData}/>
            }
            {totalGenderData!==undefined && totalRaceData!==undefined && totalAgeData!== undefined && chartType === 'pie' &&
                <AllPieChart genderData = {totalGenderData} raceData = {totalRaceData} ageData={totalAgeData}/>
            }
        </div>
    );
}

export default AllDataExplorePanel;