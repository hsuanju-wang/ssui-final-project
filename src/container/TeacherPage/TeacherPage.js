import { useState, useEffect} from "react";
import { Routes, Route  } from "react-router-dom";
import ListItem from "./ListItem";
import ResultViewPanel from '../ResultViewPanel/ResultViewPanel';
import ControlPanel from '../ControlPanel/ControlPanel';
import AboutCompas from '../AboutCompas/AboutCompas'

import { getAuth, signInWithPopup,signOut, GoogleAuthProvider} from "firebase/auth";
import { collection, getDocs, getFirestore, addDoc, doc, setDoc, serverTimestamp, query, where, updateDoc, deleteDoc} from "firebase/firestore/lite";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


import './TeacherPage.css'

const TeacherPage = (props) => {

  // Data Visualization =================
  const [threshold, setThreshold] = useState(5);
  const [dataGroup, setDataGroup] = useState("gender");
  // End of Data Visualization =============

  // Question set ======================
  // const [listItems, setListItems] = useState([
  //   { name: "Question1", type: "", id: 0 }
  // ]);
  // const [questionSetName, setQuestionSetName] = useState();

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

  // useEffect(() => {
  //   console.log("run effect teacher");
  //   createNewQuestion();
  // }, []);

  useEffect(() => {
    checkNextBackBtn();
  }, [currentQuestionIndex]);

  // function updateCurrentQuestion(question){
  //   setCurrentQuestion(question);
  //   let tempSet = [...questionSet];
  //   var questionIndex = tempSet.findIndex((q) => q.id === question.id)
  //   console.log(questionIndex);
  //   if (questionIndex == -1){
  //     tempSet.push(question)
  //   } else {
  //     tempSet[questionIndex] = question
  //   }
  //   console.log(tempSet)
  //   setQuestionSet(tempSet)
  // }

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
    console.log("delete");
    console.log(index);
    let tempQuestions = questions;
    tempQuestions.splice(index,1);
    console.log(tempQuestions);

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
  //End of Question set ======================

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
                      width= {"70%"}/>                   
  
              </div>

          }
        </div>
        {/* <ResultViewPanel
            threshold = {threshold}
            dataGroup = {dataGroup}/>         */}
  </div>
  );
}

export default TeacherPage;