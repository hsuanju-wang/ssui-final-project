import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ResultViewPanel from '../../ResultViewPanel/ResultViewPanel';
import ControlPanel from '../../ControlPanel/ControlPanel';
import QuestionPanel from '../QuestionPanel/QuestionPanel';
import { collection, getDocs, getFirestore, doc, setDoc, serverTimestamp, query, where, updateDoc, deleteDoc} from "firebase/firestore/lite";

import './AnswerQuestion.css'

const AnswerQuestion = (props) => {
  const [threshold, setThreshold] = useState(5);
  const [dataGroup, setDataGroup] = useState("gender");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const location = useLocation();
  let dbRef = doc(collection(props.db, "StudentAnswers")); 

  async function uploadAnswerToDb(answer,score){
    let newStudentAnswer = {
        answer: answer,
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
            threshold = {threshold}/>
        <ResultViewPanel
            threshold = {threshold}
            dataGroup = {dataGroup}/>        
    </div>
  );
}

export default AnswerQuestion;