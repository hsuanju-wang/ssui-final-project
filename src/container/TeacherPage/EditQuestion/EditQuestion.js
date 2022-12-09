import { useState, useEffect} from "react";
import { Routes, Route, useLocation} from "react-router-dom";
import EditListItem from "./EditListItem";
import ResultViewPanel from '../../ResultViewPanel/ResultViewPanel';
import ControlPanel from '../../ControlPanel/ControlPanel';
import AboutCompas from '../AboutCompas/AboutCompas'

import { collection, doc, setDoc, updateDoc} from "firebase/firestore/lite";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import './EditQuestion.css'


const EditQuestion = (props) =>{
 // Data Visualization =================
 const [threshold, setThreshold] = useState(5);
 const [dataGroup, setDataGroup] = useState("gender");
 // End of Data Visualization =============

 const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
 const [isEnd, setIsEnd] = useState(false);
 const [isFront, setIsFront] = useState(false);
 const [navBar, setNavBar] = useState("about");

 useEffect(() => {
   checkNextBackBtn();
 }, [currentQuestionIndex]);

 function createNewQuestion() {
   let newQuestion = {
     name:"",
     questionText:"",
     answer: "",
     feedback: "",
     hint:"",
     option:["","","",""]
   }
   let questionsTemp = [...props.teacherSelectedQuestion.questions];
   questionsTemp.push(newQuestion);
   console.log(questionsTemp);
   props.setTeacherSelectedQuestion({
    ...props.teacherSelectedQuestion,
    questions:questionsTemp
   });
 }

 function addQustionBtnClicked(){
   createNewQuestion();
   setCurrentQuestionIndex(currentQuestionIndex+1);
 }

 function deleteItem(index) {
   let tempQuestions = [...props.teacherSelectedQuestion.questions];
   tempQuestions.splice(index,1);
   if(index === props.teacherSelectedQuestion.questions.length-1){
     setCurrentQuestionIndex(currentQuestionIndex-1);
   }
   props.setTeacherSelectedQuestion({
    ...props.teacherSelectedQuestion,
    questions:tempQuestions
   });
 }

 function updateQuestionSetName(e) {
    console.log(props.teacherSelectedQuestion);
    props.setTeacherSelectedQuestion({
        ...props.teacherSelectedQuestion,
        questionSetName: e.currentTarget.value
    });
 }

 async function publishQuestionSet(){
   let newDataSet = {
     questionSetName: props.teacherSelectedQuestion.questionSetName,
     questions: props.teacherSelectedQuestion.questions,
     teacherId: props.currentUser.uid,
     teacherName: props.currentUser.displayName
   };
   let dbRef = doc(props.db, "Questions", props.teacherSelectedQuestion.id); 
   props.setNewTeacherQuestion(newDataSet);
   await updateDoc(dbRef, {
        questionSetName: props.teacherSelectedQuestion.questionSetName,
        questions: props.teacherSelectedQuestion.questions,
        teacherId: props.currentUser.uid,
        teacherName: props.currentUser.displayName
    });
   console.log(newDataSet);
 }

 function nextBtnClicked() {
   setCurrentQuestionIndex(currentQuestionIndex+1);
 }

 function backBtnClicked() {
   setCurrentQuestionIndex(currentQuestionIndex-1);
 }

 function checkNextBackBtn(){
   if(currentQuestionIndex === props.teacherSelectedQuestion.questions.length-1){
     setIsEnd(true);
   }
   else{
     setIsEnd(false);
   }

   if(currentQuestionIndex === 0){
     setIsFront(true);
   }
   else{
     setIsFront(false);
   }
 }

 function navBarChange(e){
   setNavBar(e.currentTarget.value);
 }
 
 return(
    <div className='main-container'>
        {

        }
        <div className='question-editor-container'>

          <div className="questionSetTitle">
          {/* <h1>Publish Question Set :</h1> */}
            <h3>Your Question Set</h3>
            <button className='questionSetPublishBtn' onClick={()=> publishQuestionSet()} type="text">Publish Question Set</button>
          </div>
          <div className="editor-panel">
            <div className="qustionSet-name-box">
              <h5>Name of Question Set:</h5>
              <input onChange={(e) => updateQuestionSetName(e)} type="text" defaultValue={props.teacherSelectedQuestion.questionSetName}></input>
            </div>
            <div className="total-question-box">
              <h5>Total Questions: {currentQuestionIndex+1}/{props.teacherSelectedQuestion.questions.length}</h5>
              <button className="addQuestion-btn" onClick={() => addQustionBtnClicked()}>Add Question</button>
            </div>
            <div className="question-edit-box">
                
            {props.teacherSelectedQuestion!==undefined && props.teacherSelectedQuestion.questions.map(
              (q,index)=>{
                return(
                  <EditListItem
                      currentQuestionIndex={currentQuestionIndex}
                      deleteItem={deleteItem}
                      questions={props.teacherSelectedQuestion.questions}
                      q={q}
                      index={index}
                      setTeacherSelectedQuestion = {props.setTeacherSelectedQuestion}
                      teacherSelectedQuestion = {props.teacherSelectedQuestion}/>                    
                )
              }
            )}
 
         
            </div>
            <div className="nextBackBtn-box">
              {isFront
                ? <button className="noneBtn"></button>
                : <button className="nextBackBtn" onClick={() => backBtnClicked()}>back</button>
              }
              {isEnd
                ? <button className="noneBtn"></button>
                : <button className="nextBackBtn" onClick={() => nextBtnClicked()}>next</button>
              }
            </div>
          </div>

        </div>
        <div className="explore-data-containter">
          <div className="subNavBar">
            <select name="cars" id="subNav" onChange={(e)=>navBarChange(e)}>
              <option value="about">About</option>
              <option value="dataExplore">Data explore</option>
            </select>
          </div>
          { navBar === 'about'
            ? <AboutCompas/>
            : <div className="explore-data-page">
                <ControlPanel 
                    setDataGroup = {setDataGroup}
                    setThreshold = {setThreshold}
                    threshold = {threshold}
                    width= {"25%"}/>                  
                  <ResultViewPanel
                      threshold = {threshold}
                      dataGroup = {dataGroup}
                      width= {"80%"}/>                   
              </div>

          }
        </div>    
  </div>    
 )
}

export default EditQuestion;