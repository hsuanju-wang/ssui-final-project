import { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import ListItem from "./ListItem";
import ResultViewPanel from '../../ResultViewPanel/ResultViewPanel';
import ControlPanel from '../../ControlPanel/ControlPanel';
import AboutCompas from '../AboutCompas/AboutCompas'
import AllDataExplorePanel from "../../AllDataExplorePanel/AllDataExplorePanel";

import { collection, doc, setDoc} from "firebase/firestore/lite";
import "firebase/compat/auth"
import "firebase/compat/firestore"

import './EditQuestion.css'


const NewQuestion = (props) =>{
 // Data Visualization =================
 const [threshold, setThreshold] = useState(5);
 const [dataGroup, setDataGroup] = useState("gender");
 const [mode, setMode] = useState("exploreThreshold");
 // End of Data Visualization =============
 const navigate = useNavigate();
 const [questionSetName, setQuestionSetName] = useState(undefined);
 const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
 const [questions, setQuestions] = useState([
   {
     name:"",
     questionText:"",
     answer: "",
     feedback: "",
     hint:"",
     option:["","","",""]    
   }
 ]);
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

   let questionsTemp = questions;
   questionsTemp.push(newQuestion);
   console.log(questionsTemp);
   setQuestions(questionsTemp);
 }

 function addQustionBtnClicked(){
   createNewQuestion();
   setCurrentQuestionIndex(currentQuestionIndex+1);
 }

 function deleteItem(index) {

   let tempQuestions = [...questions];
   tempQuestions.splice(index,1);
   if(index === questions.length-1){
     setCurrentQuestionIndex(currentQuestionIndex-1);
   }
   setQuestions(tempQuestions);
 }

 function updateQuestionSetName(e) {
   setQuestionSetName(e.currentTarget.value);
 }

 async function publishQuestionSet(){
   let newDataSet = {
     questionSetName: questionSetName,
     questions: questions,
     teacherId: props.currentUser.uid,
     teacherName: props.currentUser.displayName
   };
   let dbRef = doc(collection(props.db, "Questions")); 

   await setDoc(dbRef, newDataSet);
   console.log("finish!");
   console.log(newDataSet);

   props.setNewTeacherQuestion(newDataSet);
   navigate('/');
 }

 function nextBtnClicked() {
   setCurrentQuestionIndex(currentQuestionIndex+1);
 }

 function backBtnClicked() {
   setCurrentQuestionIndex(currentQuestionIndex-1);
 }

 function checkNextBackBtn(){
   if(currentQuestionIndex === questions.length-1){
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
        <div className='question-editor-container'>

          <div className="questionSetTitle">
          {/* <h1>Publish Question Set :</h1> */}
            <h3>Your Question Set</h3>
            <button className='questionSetPublishBtn' onClick={()=> publishQuestionSet()} type="text">Publish Question Set</button>
          </div>
          <div className="editor-panel">
            <div className="qustionSet-name-box">
              <h5>Name of Question Set:</h5>
              <input onChange={(e) => updateQuestionSetName(e)} type="text"></input>
            </div>
            <div className="total-question-box">
              <h5>Total Questions: {currentQuestionIndex+1}/{questions.length}</h5>
              <button className="addQuestion-btn" onClick={() => addQustionBtnClicked()}>Add Question</button>
            </div>
            <div className="question-edit-box">
            {questions.map(
              (q,index)=>{
                return(
                  <ListItem
                      currentQuestionIndex={currentQuestionIndex}
                      deleteItem={deleteItem}
                      setQuestions={setQuestions}
                      questions={questions}
                      index={index}/>                    
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
            <select name="subNav" id="subNav" onChange={(e)=>navBarChange(e)}>
              <option value="about">About</option>
              <option value="dataExplore">Data explore</option>
              <option value="thresholdExplore">Threshold explore</option>
            </select>
          </div>
          { navBar === 'about' && <AboutCompas/>}
          { navBar === 'thresholdExplore' &&
            <div className="explore-data-page">
              <ControlPanel 
                  setDataGroup = {setDataGroup}
                  setThreshold = {setThreshold}
                  setMode={setMode}
                  mode={mode} 
                  threshold = {threshold}
                  currentUserStatus={props.currentUserStatus} 
                  width= {"25%"}/>                  
              <ResultViewPanel
                  threshold = {threshold}
                  dataGroup = {dataGroup}
                  width= {"80%"}/>                   
            </div>
          }
          { navBar === 'dataExplore' &&
              <AllDataExplorePanel/>                   
          }
        </div>    
  </div>    
 )
}

export default NewQuestion;