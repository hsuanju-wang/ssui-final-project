import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import Papa from 'papaparse';
import './ResultViewPanel.css'
import GenderData from '../../assets/data/COMPAS-Score-Gender-gender.csv';
import RaceData from '../../assets/data/COMPAS-Score-Race-race.csv';

const ResultViewPanel = (props) => {
  const [genderData, setGenderData] = useState(undefined);
  const [raceData, setRaceData] = useState(undefined);

  const fetchCsv = (cvsData) => {
    return fetch(cvsData).then(function (response) {
        let reader = response.body.getReader();
        let decoder = new TextDecoder('utf-8');

        return reader.read().then(function (result) {
            return decoder.decode(result.value);
        });
    });
  }

  async function getCsvData(cvsData) {
    let csvData = await fetchCsv(cvsData);
    return(Papa.parse(csvData, {header: false}));
  }

  useEffect(() => {
    getCsvData(GenderData).then(result => {
      result.data.shift();
      setGenderData(result.data);
      //console.log(result.data);
    });

    getCsvData(RaceData).then(result => {
      result.data.shift();
      setRaceData(result.data);
    });
  }, []);

    return (
      <div className="resultPanel" style={{width: props.width}}>
        <div className="title-container">
          {/* <h2>{props.dataGroup}</h2> */}
          <div className="legend">
            <div className="legendBar" id="type1LegendBar"></div>
            <h4>{props.dataGroup==='gender'? "Female" : "African-American"}</h4>
          </div>
          <div className="legend">
            <div className="legendBar" id="type2LegendBar"></div>
            <h4>{props.dataGroup==='gender'? "Male" : "Caucasian"}</h4>
          </div>
        </div>
        <div className="container">
            <div className="title-box">
              <h3>True Positive</h3>
              <p> An outcome where the model correctly predicts the positive class</p>
              { genderData !== undefined && props.dataGroup === "gender" &&
                <div>
                  <h2>{genderData[props.threshold-1][6]} / {genderData[props.threshold+9][6]}</h2>
                  <span>Female/Male</span>
                </div>
              }
              { raceData !== undefined && props.dataGroup === "race" &&
                <div>
                  <h2>{raceData[props.threshold-1][6]} / {raceData[props.threshold+9][6]}</h2>
                  <span>African-American/Caucasian</span>
                </div>
              }
            </div>
            { genderData !== undefined && props.dataGroup === "gender" &&
              <div className="chart-container">console.log(d);
                <BarChart
                    label = {["TP"]} 
                    data1 = {[genderData[props.threshold-1][6]]}
                    data2 = {[genderData[props.threshold+9][6]]}/>
                <BarChart
                    label = {["FN"]} 
                    data1 = {[genderData[props.threshold-1][9]]}
                    data2 = {[genderData[props.threshold+9][9]]}/>
              </div>                 
            }
            { raceData !== undefined && props.dataGroup === "race" &&
              <div className="chart-container">
                {console.log(props.threshold)}
                <BarChart
                    label = {["TP"]} 
                    data1 = {[raceData[props.threshold-1][6]]}
                    data2 = {[raceData[props.threshold+9][6]]}/>
                <BarChart
                    label = {["FN"]} 
                    data1 = {[raceData[props.threshold-1][9]]}
                    data2 = {[raceData[props.threshold+9][9]]}/>
              </div>                 
            }
            <div className="title-box">
              <h3>False Negative</h3>
              <p> An outcome where the model incorrectly predicts the negative class</p>
              { genderData !== undefined && props.dataGroup === "gender" &&
                <div>
                  <h2>{genderData[props.threshold-1][9]} / {genderData[props.threshold+9][9]}</h2>
                  <span>Female/Male</span>
                </div>
              }
              { raceData !== undefined && props.dataGroup === "race" &&
                <div>
                  <h2>{raceData[props.threshold-1][9]} / {raceData[props.threshold+9][9]}</h2>
                  <span>African-American/Caucasian</span>
                </div>
              }
            </div>
          </div> 

          <div className="container">
            <div className="title-box">
              <h3>False Positive</h3>
              <p> An outcome where the model incorrectly predicts the positive class</p>
              { genderData !== undefined && props.dataGroup === "gender" &&
                <div>
                  <h2>{genderData[props.threshold-1][8]} / {genderData[props.threshold+9][8]}</h2>
                  <span>Female/Male</span>
                </div>
              }
              { raceData !== undefined && props.dataGroup === "race" &&
                <div>
                  <h2>{raceData[props.threshold-1][8]} / {raceData[props.threshold+9][8]}</h2>
                  <span>African-American/Caucasian</span>
                </div>
              }
            </div>
            { genderData !== undefined && props.dataGroup === "gender" &&
              <div className="chart-container">
                <BarChart
                    label = {["FP"]} 
                    data1 = {[genderData[props.threshold-1][8]]}
                    data2 = {[genderData[props.threshold+9][8]]}/>
                <BarChart
                    label = {["TN"]} 
                    data1 = {[genderData[props.threshold-1][7]]}
                    data2 = {[genderData[props.threshold+9][7]]}/>
              </div>            
            }

            { raceData !== undefined && props.dataGroup === "race" &&
              <div className="chart-container">
                <BarChart
                    label = {["FP"]} 
                    data1 = {[raceData[props.threshold-1][8]]}
                    data2 = {[raceData[props.threshold+9][8]]}/>
                <BarChart
                    label = {["TN"]} 
                    data1 = {[raceData[props.threshold-1][7]]}
                    data2 = {[raceData[props.threshold+9][7]]}/>
              </div>            
            }

            <div className="title-box">
              <h3>True Negative</h3>
              <p> An outcome where the model correctly predicts the negative class.</p>
              { genderData !== undefined && props.dataGroup === "gender" &&
                <div>
                  <h2>{genderData[props.threshold-1][7]} / {genderData[props.threshold+9][7]}</h2>
                  <span>Female/Male</span>
                </div>
              }
              { raceData !== undefined && props.dataGroup === "race" &&
                <div>
                  <h2>{raceData[props.threshold-1][7]} / {raceData[props.threshold+9][7]}</h2>
                  <span>African-American/Caucasian</span>
                </div>
              }
            </div>
          </div>
      </div>
    );   
}

export default ResultViewPanel;

