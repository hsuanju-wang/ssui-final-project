import React, { Component, useState } from "react";
import './ControlPanel.css'


const ControlPanel = (props) => {
    const onChangeGroupValue = (e) => {
        props.setDataGroup(e.target.value);
    }
    const onChangeThresholdValue = (e) => {
        props.setThreshold(parseInt(e.target.value));
    }

    const onChangeMode = (e) => {
        props.setMode(e.target.value);
    }

    return (
        <div className="control-panel" style={{width: props.width}}>
            { props.currentUserStatus=== 'student' && 
                <div className="radio-input">
                    <h3>Mode</h3>
                    <div onChange={(e) => onChangeMode(e)}>
                        <input type="radio" value="exploreData" name="mode" defaultChecked/> Explore Data <br></br>
                        <input type="radio" value="exploreThreshold" name="mode"/> Explore Threshold
                    </div>
                </div>
            }
            { props.mode === 'exploreThreshold' &&
                <div className="radio-input">
                    <h3>Explore effect on different group:</h3>
                    <div onChange={(e) => onChangeGroupValue(e)}>
                        <input type="radio" value="gender" name="group" defaultChecked/> Gender (Female / Male) <br></br>
                        <input type="radio" value="race" name="group"/> Race (African-American / Caucasian) <br></br>
                        <input type="radio" value="all" name="group"/> All
                    </div>
                </div>
            }
            { props.mode === 'exploreThreshold' &&
                <div className="threshold-box">
                    <h3>Change the threshold:</h3>
                    <div className="">
                        <input id="widthBar" type="range" min="1" max="10" value={props.threshold} className="thershold-bar" onChange={(e) => onChangeThresholdValue(e)}/>
                        <output>{props.threshold}</output>
                    </div>
                </div>
            }
        </div>
    );
}
export default ControlPanel;