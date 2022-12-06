import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
    //const labels = ["January", "February", "March", "April", "May", "June"];
    const options  = {
        maintainAspectRatio: false, 
        plugins:{
            legend: {
             display: false
            },
        },
        scales: {
            y: {
                max: 2200,
                min: 0,
            }
        }   
    };

    const data = {
        labels: props.label,
        datasets: [
            {
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                data: props.data1,
            },
            {
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                data: props.data2,
            }
        ],
    };
    return (
      <div style={{width: "45%", height: "300px"}}>
        <Bar data={data} options ={options} height={"300px"}/>
      </div>
    );   
}

export default BarChart;
