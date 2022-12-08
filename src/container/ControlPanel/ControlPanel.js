import React, { Component, useState } from "react";
import './ControlPanel.css'


const ControlPanel = (props) => {
    const onChangeGroupValue = (e) => {
        props.setDataGroup(e.target.value);
    }

    const onChangeThresholdValue = (e) => {
        props.setThreshold(parseInt(e.target.value));
    }

    return (
        <div className="control-panel" style={{width: props.width}}>
            <div>
                <h3>Explore effect on different group:</h3>
                <div onChange={(e) => onChangeGroupValue(e)}>
                    <input type="radio" value="gender" name="group" defaultChecked/> Gender (Female / Male) <br></br>
                    <input type="radio" value="race" name="group"/> Race (African-American / Caucasian)
                </div>
            </div>
            <div className="threshold-box">
                <h3>Change the threshold:</h3>
                <div className="">
                    <input id="widthBar" type="range" min="1" max="10" value={props.threshold} className="thershold-bar" onChange={(e) => onChangeThresholdValue(e)}/>
                    <output>{props.threshold}</output>
                </div>
            </div>
        </div>
    );
}
export default ControlPanel;