import logo from './logo.svg';
import './App.css';
import { useState, useEffect} from "react";
import { Routes, Route, useNavigate} from "react-router-dom";

import { getAuth, signInWithPopup,signOut, GoogleAuthProvider} from "firebase/auth";
import { collection, getDocs, getFirestore, doc, setDoc, serverTimestamp, query, where, updateDoc, deleteDoc} from "firebase/firestore/lite";

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

import Login from './container/Login/Login';
import Header from './container/Header/Header';

import Edit from './Edit';
import Preview from './TestMode';
import TeacherPage from './container/TeacherPage/TeacherPage';
import StudentPage from './container/StudentPage/StudentPage';
import AnswerQuestion from './container/StudentPage/AnswerQuestions/AnswerQuestion';
import Result from './container/StudentPage/Result/Result';
import EditQuestion from './container/TeacherPage/EditQuestion/EditQuestion';
import NewQuestion from './container/TeacherPage/EditQuestion/NewQuestion';

function App(props) {
  const [currentUser, setCurrentUser] = useState(undefined); 
  const [currentUserStatus, setCurrentUserStatus] = useState(undefined); // teacher or student

  const [studentResult, setStudentResult] = useState(undefined);
  const [teacherQuestions, setTeacherQuestions] = useState(undefined);
  const [teacherSelectedQuestion, setTeacherSelectedQuestion] = useState(undefined);
  const [newStudentAnswer, setNewStudentAnswer] = useState([]);  
  const [newTeacherQuestion, setNewTeacherQuestion] = useState([]);  

  // Backend stuff
  const db = getFirestore(props.app);
  const auth = getAuth(props.app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'Perspective';
  }, []);

  useEffect(() => {
    if(currentUserStatus === 'student'){
      getStudentResult().then((d) => {
        let resultItem = d.docs.map((d) =>{
          const data = d.data();
          const id = d.id;
          return { id, ...data };
        });
        setStudentResult(resultItem);
      });
    }
    else if(currentUserStatus === 'teacher'){
      getTeacherQuestions().then((d) => {
        let resultItem = d.docs.map((d) =>{
          const data = d.data();
          const id = d.id;
          return { id, ...data };
        });
        setTeacherQuestions(resultItem);
      });
    }
  }, [currentUser, newStudentAnswer, newTeacherQuestion]);

  // LogIn ===================================
  function logIn(){
    signInWithPopup(auth, provider)
      .then((result) => {
        setCurrentUser(auth.currentUser);
        navigate('/');
        // to do
      })
      .catch((error)=> {})
  }
  
  function logOut(){
    signOut(auth).then(() => {
      setCurrentUser(undefined);
      setCurrentUserStatus(undefined);
    }).catch((error) => {
      // An error happened.
    });
  }
  //End Of Login =============================

  async function getStudentResult(){
    const col = collection(db, "StudentAnswers");
    const q = query(col, where("studentId", "==", currentUser.uid));
    return await getDocs(q);
  }

  async function getTeacherQuestions(){
    const col = collection(db, "Questions");
    const q = query(col, where("teacherId", "==", currentUser.uid));
    return await getDocs(q);
  }

  return (
    <div className="App">

      <Header currentUserStatus = {currentUserStatus} currentUser = {currentUser}/>
      <Routes>
            {/* <Route path='/' element={<Edit/>}>  </Route> */}
            <Route path='/preview' element={<Preview/>}> </Route>
            <Route path='/result' element={<Result studentResult={studentResult}/>}> </Route>
            <Route path='/answerQuestion' element={<AnswerQuestion 
                                                        db={db} 
                                                        currentUser={currentUser}
                                                        currentUserStatus={currentUserStatus}  
                                                        setNewStudentAnswer={setNewStudentAnswer}/>}> </Route> 
            <Route path='/editQuestion' element={<EditQuestion 
                                                        db={db} 
                                                        currentUser={currentUser}
                                                        currentUserStatus={currentUserStatus} 
                                                        setTeacherSelectedQuestion={setTeacherSelectedQuestion}
                                                        setNewTeacherQuestion={setNewTeacherQuestion}
                                                        teacherSelectedQuestion={teacherSelectedQuestion}/>}> </Route>
            <Route path='/newQuestion' element={<NewQuestion 
                                                        db={db} 
                                                        currentUser={currentUser}
                                                        currentUserStatus={currentUserStatus} 
                                                        setNewTeacherQuestion={setNewTeacherQuestion}/>}> </Route>              
            <Route path='/login' 
                   element={<Login
                                logIn = {logIn}
                                logOut = {logOut} 
                                currentUser = {currentUser}
                                currentUserStatus = {currentUserStatus}
                                setCurrentUserStatus = {setCurrentUserStatus}/>}> </Route>

            { currentUser === undefined && 
                <Route path='/' 
                       element={<Login
                                  logIn = {logIn}
                                  logOut = {logOut} 
                                  currentUser = {currentUser}
                                  currentUserStatus = {currentUserStatus}
                                  setCurrentUserStatus = {setCurrentUserStatus}/>}> </Route>
            }

            { currentUser !== undefined && currentUserStatus === 'teacher' &&
                <Route path='/' element={<TeacherPage teacherQuestions={teacherQuestions} setTeacherSelectedQuestion={setTeacherSelectedQuestion}/>}> </Route>
            }
            { currentUser !== undefined && currentUserStatus === 'student' &&
                <Route path='/' element={<StudentPage db={db}/>}> </Route>
            }
      </Routes>
    </div>
  );
}

export default App;
