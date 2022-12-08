import { useState, useEffect } from "react";
import { Routes, Route, useNavigate  } from "react-router-dom";
import { collection, getDocs, getFirestore, doc, setDoc, serverTimestamp, query, where, updateDoc, deleteDoc} from "firebase/firestore/lite";

import './Result.css'

const Result = (props) => {
  return(
    <div className="result-container">
        <h1>Question set taken</h1>
        {
            props.studentResult.map((result) => {
                return(
                    <div className="result-box">
                        <h3>Question set name</h3>
                        <h3>{result.teacherName}</h3>
                        <h3>{result.score}</h3>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Result;