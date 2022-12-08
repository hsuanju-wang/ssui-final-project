import { useState } from "react";
import { Routes, Route  } from "react-router-dom";
import ListItem from "./ListItem";
import ResultViewPanel from '../ResultViewPanel/ResultViewPanel';
import ControlPanel from '../ControlPanel/ControlPanel';

import { getAuth, signInWithPopup,signOut, GoogleAuthProvider} from "firebase/auth";
import { collection, getDocs, getFirestore, addDoc, doc, setDoc, serverTimestamp, query, where, updateDoc, deleteDoc} from "firebase/firestore/lite";
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"


import './TeacherPage.css'

let globalItemCount = 0;

const TeacherPage = (props) => {






  // Data Visualization =================
  const [threshold, setThreshold] = useState(5);
  const [dataGroup, setDataGroup] = useState("gender");
  // End of Data Visualization =============

  // Question set ======================
  const [listItems, setListItems] = useState([
    { name: "Question1", type: "", id: 0 }
  ]);

  const [questionSetName, setQuestionSetName] = useState();

  const [questionSet, setQuestionSet] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});

  function updateCurrentQuestion(question){
    setCurrentQuestion(question);
    let tempSet = [...questionSet];
    var questionIndex = tempSet.findIndex((q) => q.id === question.id)
    console.log(questionIndex);
    if (questionIndex == -1){
      tempSet.push(question)
    } else {
      tempSet[questionIndex] = question
    }
    console.log(tempSet)
    setQuestionSet(tempSet)
  }

  function createNewQuestion() {
    globalItemCount++;
    setListItems([
      ...listItems,
      { name: "", type: "", id: globalItemCount }
    ]);
  }

  function deleteItem(id) {
    let tempListItems = [...listItems];
    tempListItems.splice(
      tempListItems.findIndex((d) => d.id === id),
      1
    );
    setListItems(tempListItems);
  }

  function updateQuestionSetName(e) {
    setQuestionSetName(e.currentTarget.value);

    let tempSet = [...questionSet]
    tempSet.forEach((q)=> {
      q.questionSetName = questionSetName
      // console.log(q)
    })

    // console.log(tempSet)
    setQuestionSet(tempSet)
  }

  function publishQuestionSet(){
    addDoc(collection(props.db, "Questions"), {
      questionSet: questionSet,
      teacherId: props.currentUser.uid,
      teacherName: props.currentUser.displayName
      
    });

    updateDoc()


    console.log("finish!")
    console.log(props.currentUser.uid)

  }




  const questionSetComponents = listItems.map((item) => {
    return (
      <ListItem
        // text={item.name}
        id={item.id}
        key={item.id}
        deleteItem={deleteItem}
        questionSetName={questionSetName}
        updateCurrentQuestion={updateCurrentQuestion}
      />
    );
  });
  //End of Question set ======================

  return(
    <div className='main-container'>
        <div className='question-column'>

          <div className="questionSet">
          {/* <h1>Publish Question Set :</h1> */}
            <h3>Your Question Set</h3>
            <button onClick={publishQuestionSet} type="text">Publish Question Set</button>

            <h5>Name of Question Set:</h5>
            <input onChange={updateQuestionSetName} type="text"></input>
          </div>


            {/* <input onChange={updateNewQuestion} type="text"></input> */}
            {questionSetComponents}
            <button onClick={createNewQuestion}>Add Multiple Choice Question</button>
        </div>
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

export default TeacherPage;