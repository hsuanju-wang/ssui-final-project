import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ResultViewPanel from '../../ResultViewPanel/ResultViewPanel';
import ControlPanel from '../../ControlPanel/ControlPanel';
import QuestionPanel from '../QuestionPanel/QuestionPanel';
import AllDataExplorePanel from '../../AllDataExplorePanel/AllDataExplorePanel';
import { collection, getDocs, getFirestore, doc, setDoc, serverTimestamp, query, where, updateDoc, deleteDoc} from "firebase/firestore/lite";

import './AnswerQuestion.css'

const AnswerQuestion = (props) => {
  const [threshold, setThreshold] = useState(5);
  const [dataGroup, setDataGroup] = useState("gender");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [mode, setMode] = useState("exploreData");

  const location = useLocation();
  let dbRef = doc(collection(props.db, "StudentAnswers")); 

  async function uploadAnswerToDb(answer,score){
    let newStudentAnswer = {
        answer: answer,
        questionSetName: location.state.selectedQuestion.questionSetName,
        questionId: location.state.selectedQuestion.id,
        score: score,
        studentId: props.currentUser.uid,
        studentName:props.currentUser.displayName,
        teacherName: location.state.selectedQuestion.teacherName
    }
    props.setNewStudentAnswer(newStudentAnswer);
    await setDoc(dbRef, newStudentAnswer);
  }

  return(
    <div className='main-container'>
        <QuestionPanel 
            currentQuestion ={location.state.selectedQuestion.questions[currentQuestionIndex]} 
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            currentQuestionLength={location.state.selectedQuestion.questions.length}
            uploadAnswerToDb ={uploadAnswerToDb}
            studentAnswer={props.studentAnswer}
            setStudentAnswer={props.setStudentAnswer}/>
        <ControlPanel 
            setDataGroup = {setDataGroup}
            setThreshold = {setThreshold}
            setMode={setMode}
            mode={mode} 
            threshold = {threshold}
            currentUserStatus={props.currentUserStatus} 
            width = {"15%"}/>
        { mode === 'exploreData' &&
          <div style={{width: "60%", paddingTop: "20px"}}>
            <AllDataExplorePanel/>
          </div> 
        }
        {mode === 'exploreThreshold'&&
          <ResultViewPanel
              threshold = {threshold}
              dataGroup = {dataGroup}
              width = {"60%"}/> 
        }
       
    </div>
  );
}

export default AnswerQuestion;