import { useState, useEffect } from "react";
import { Routes, Route, useNavigate  } from "react-router-dom";
import { collection, getDocs, getFirestore, doc, setDoc, serverTimestamp, query, where, updateDoc, deleteDoc} from "firebase/firestore/lite";

import './StudentPage.css'

const StudentPage = (props) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(undefined);

  function startBtnClicked(selectedQuestion){
    console.log(selectedQuestion);
    navigate('/answerQuestion', {
      state: {
        selectedQuestion: selectedQuestion
      }
    });
  }
  async function getAllQuestionsFromDb(){
    return await getDocs(collection(props.db, "Questions"));
  }

  useEffect(() => {
    getAllQuestionsFromDb().then((d) => {
      let questionItems = d.docs.map((d) =>{
      const data = d.data();
      const id = d.id;
      return { id, ...data };
    });
    console.log(questionItems);
    setQuestions(questionItems);
  })
  }, []);

  return(
    <div className="student-home">
      <h1>Select the question set you want to take</h1>
      <div className="question-container">
      { questions !== undefined && questions.map((q, index) => {
        return(
            <div className="question-box">
              <h2>{q.questionSetName}</h2>
              <h3>Instructor: {q.teacherName} </h3>
              <h3>{q.questions.length} Questions</h3>
              <button onClick={() => startBtnClicked(q)}>Start</button>
            </div>
        )
      })} 
      </div>     
    </div>

  );
}

export default StudentPage;