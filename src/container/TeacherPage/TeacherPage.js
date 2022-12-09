import { useState, useEffect} from "react";
import { Routes, Route, useNavigate} from "react-router-dom";

import './TeacherPage.css'

const TeacherPage = (props) => {
  const navigate = useNavigate();

  function editBtnClicked(selectedQuestion){
    console.log(selectedQuestion);
    props.setTeacherSelectedQuestion(selectedQuestion);
    navigate('/editQuestion');
    // navigate('/editQuestion', {
    //   state: {
    //     selectedQuestion: selectedQuestion
    //   }
    // });
  }
  function addBtnClicked(){
    navigate('/newQuestion');
  }


  return(
    <div>
      <h1>Your question set</h1>
      <div className="question-container">
      { props.teacherQuestions!==undefined && props.teacherQuestions.map((q, index) => {
        return(
            <div className="teacher-question-box" onClick={() => editBtnClicked(q)}>
              <h2>{q.questionSetName}</h2>
              <h3>{q.questions.length} Questions</h3>
              <button onClick={() => editBtnClicked(q)}>Edit</button>
            </div>
        )
      })} 
        <div className="add-question-box" onClick={() => addBtnClicked()}>
            <h2>+</h2>
        </div>
      </div>  
    </div>
  );
}

export default TeacherPage;