import React from "react";
import { Pie } from "react-chartjs-2";

const AllPieChart = (props) => {
    const options  = {
        maintainAspectRatio: false, 
        plugins:{
            legend: {
             display: true
            },
        }, 
    };

    const raceData = {
        labels: [props.raceData[0][0],props.raceData[1][0]],
        datasets: [
            {
                label:"Race",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                data: [
                    parseInt(props.raceData[0][1]),
                    parseInt(props.raceData[1][1])],
                backgroundColor:[
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(53, 162, 235, 0.5)"] 
            }
        ],
    };

    const genderData = {
        labels: [props.genderData[0][0],props.genderData[1][0]],
        datasets: [
            {
                label:"Gender",
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(53, 162, 235, 0.5)"],
                data: [
                    parseInt(props.genderData[0][1]),
                    parseInt(props.genderData[1][1])],
            }
        ],
    };

    const ageData = {
        labels: [props.ageData[0][0],props.ageData[1][0],props.ageData[2][0]],
        datasets: [
            {
                label:"Age",
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(53, 162, 235, 0.5)",
                    "rgba(11, 255, 0, 0.5)"],
                data: [
                    parseInt(props.ageData[0][1]),
                    parseInt(props.ageData[1][1]),
                    parseInt(props.ageData[2][1])
                ]
            },
        ],
    };
    return (
        <div style={{display: "flex", justifyContent: "space-between", padding: "0 2% 0 2%", marginTop: "5%"}}>
            <div style={{width: "28%", height: "450px"}}>
                <p>Gender</p>
                <Pie data={genderData} options ={options} height={"400px"}/>
            </div>
            <div style={{width: "28%", height: "450px"}}>
                <p>Race</p>
                <Pie data={raceData} options ={options} height={"400px"}/>
            </div>  
            <div style={{width: "28%", height: "450px"}}>
                <p>Age</p>
                <Pie data={ageData} options ={options} height={"400px"}/>
            </div>             
        </div>
    );   
}

export default AllPieChart;