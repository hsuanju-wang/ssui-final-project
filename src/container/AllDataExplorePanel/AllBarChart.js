import React from "react";
import { Bar } from "react-chartjs-2";

const AllBarChart = (props) => {
    const options  = {
        maintainAspectRatio: false, 
        plugins:{
            legend: {
             display: true
            },
        },
        scales: {
            y: {
                max: 4000,
                min: 0,
            }
        }   
    };

    const raceData = {
        labels: ["Race"],
        datasets: [
            {
                label:[props.raceData[0][0]],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                data: [parseInt(props.raceData[0][1])],
            },
            {
                label:[props.raceData[1][0]],
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                data: [parseInt(props.raceData[1][1])],
            }
        ],
    };

    const genderData = {
        labels: ["Gender"],
        datasets: [
            {
                label:[props.genderData[0][0]],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                data: [parseInt(props.genderData[0][1])],
            },
            {
                label:[props.genderData[1][0]],
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                data: [parseInt(props.genderData[1][1])],
            }
        ],
    };

    const ageData = {
        labels: ["Age"],
        datasets: [
            {
                label:[props.ageData[0][0]],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                data: [parseInt(props.ageData[0][1])],
            },
            {
                label:[props.ageData[1][0]],
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                data: [parseInt(props.ageData[1][1])],
            },
            {
                label:[props.ageData[2][0]],
                backgroundColor: "rgba(11, 255, 0, 0.5)",
                data: [parseInt(props.ageData[2][1])],
            }
        ],
    };
    return (
        <div style={{display: "flex", justifyContent: "space-between", padding: "0 2% 0 2%", marginTop: "10%"}}>
            <div style={{width: "28%", height: "450px"}}>
                <Bar data={genderData} options ={options} height={"400px"}/>
            </div>
            <div style={{width: "28%", height: "450px"}}>
                <Bar data={raceData} options ={options} height={"400px"}/>
            </div>  
            <div style={{width: "28%", height: "450px"}}>
                <Bar data={ageData} options ={options} height={"400px"}/>
            </div>             
        </div>
    );   
}

export default AllBarChart;