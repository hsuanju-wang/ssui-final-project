import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import { Routes, Route  } from "react-router-dom";

import { getAuth, signInWithPopup,signOut, GoogleAuthProvider} from "firebase/auth";
import { collection, getDocs, getFirestore, doc, setDoc, serverTimestamp, query, where, updateDoc, deleteDoc} from "firebase/firestore/lite";

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

import ListItem from "./ListItem";
import Edit from './Edit';
import Preview from './TestMode';
import Login from './container/Login/Login';
import ResultViewPanel from './container/ResultViewPanel/ResultViewPanel';
import ControlPanel from './container/ControlPanel/ControlPanel';
import Header from './container/Header/Header'



let globalItemCount = 0;


function App(props) {

  const [currentUser, setCurrentUser] = useState(undefined); 
  const [currentUserStatus, setCurrentUserStatus] = useState(undefined); // teacher or student

  // Backend stuff
  const db = getFirestore(props.app);
  const auth = getAuth(props.app);
  const provider = new GoogleAuthProvider();

  // LogIn ===================================
  function logIn(){
    signInWithPopup(auth, provider)
      .then((result) => {
        setCurrentUser(auth.currentUser);
        // to do
      })
      .catch((error)=> {})
  }
  
  function logOut(){
    signOut(auth).then(() => {
      setCurrentUser(undefined);
    }).catch((error) => {
      // An error happened.
    });
  }
  //End Of Login =============================


  // Data Visualization =================
  const [threshold, setThreshold] = useState(5);
  const [dataGroup, setDataGroup] = useState("gender");
  // End of Data Visualization =============

  // Question set ======================
  const [listItems, setListItems] = useState([
    { name: "Question1", type: "", id: 0 }
  ]);
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

  const questionSetComponents = listItems.map((item) => {
    return (
      <ListItem
        // text={item.name}
        id={item.id}
        key={item.id}
        deleteItem={deleteItem}
        updateCurrentQuestion={updateCurrentQuestion}
      />
    );
  });
  //End of Question set ======================

  return (
    <div className="App">

      <Header />
      {/* If the user does not login -----------------------------------------------------*/}
      {currentUser === undefined &&
        <Login 
          logIn = {logIn}
          logOut = {logOut} 
          currentUser = {currentUser}
          setCurrentStatus = {setCurrentUserStatus}/>
      }{/* End If the user does not login-------*/}

      {/* If the user is teacher ---------------------------------------------------------*/}
      { currentUser !== undefined &&  currentUserStatus === 'teacher' &&
        <div className='main-container'>
          <div className='question-column'>
            <h1>My Question Set</h1>
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
      } {/* End If the user is teacher -------*/}
      {/* If the user is student ---------------------------------------------------------*/}
      { currentUser !== undefined &&  currentUserStatus === 'student' &&
        <div className='main-container'>
          <ControlPanel 
              setDataGroup = {setDataGroup}
              setThreshold = {setThreshold}
              threshold = {threshold}/>
          <ResultViewPanel
              threshold = {threshold}
              dataGroup = {dataGroup}/>        
        </div>
      } {/* End If the user is student -------*/}
      <Routes>
            {/* <Route path='/' element={<Edit/>}>  </Route> */}
            <Route path='/preview' element={<Preview/>}>  </Route>
      </Routes>
    </div>
  );
}

export default App;
