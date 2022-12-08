import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import './ListItem.css'

export default function ListItem(props) {


  // const[questions[props.currentQuestionIndex], setquestions[props.currentQuestionIndex]] = useState([]);

  // const [questionName, setQuestionName] = useState("");
  // const [description, setDescription] = useState("");
  // const [optionA, setOptionA] = useState("");
  // const [optionB, setOptionB] = useState("");
  // const [optionC, setOptionC] = useState("");
  // const [optionD, setOptionD] = useState("");
  // const [answer, setAnswer] = useState("");
  // const [hint, setHint] = useState("");
  // const [feedback, setFeedback] = useState("");
  // const [questionInfo, setQuestionInfo] = useState({});




  function updateQuestionName(e) {
    let newQuestions = props.questions;
    newQuestions[props.currentQuestionIndex] = {
      ... newQuestions[props.currentQuestionIndex],
      name: e.currentTarget.value,
    }
    props.setQuestions(newQuestions);
  }

  function updateDescription(e) {
    let newQuestions = props.questions;
    newQuestions[props.currentQuestionIndex] = {
      ... newQuestions[props.currentQuestionIndex],
      name: e.currentTarget.value,
    }
    props.setQuestions(newQuestions);
  }

  function updateOptionA(e) {
    let newQuestions = props.questions;
    let newOption = props.questions.option;
    newOption[0] = e.currentTarget.value;
    newQuestions[props.currentQuestionIndex] = {
      ... newQuestions[props.currentQuestionIndex],
      options: newOption,
    }
    props.setQuestions(newQuestions);
  }

  function updateOptionB(e) {
    let newQuestions = props.questions;
    let newOption = props.questions.option;
    newOption[1] = e.currentTarget.value;
    newQuestions[props.currentQuestionIndex] = {
      ... newQuestions[props.currentQuestionIndex],
      options: newOption,
    }
    props.setQuestions(newQuestions);
  }

  function updateOptionC(e) {
    let newQuestions = props.questions;
    let newOption = props.questions.option;
    newOption[2] = e.currentTarget.value;
    newQuestions[props.currentQuestionIndex] = {
      ... newQuestions[props.currentQuestionIndex],
      options: newOption,
    }
    props.setQuestions(newQuestions);
  }

  function updateOptionD(e) {
    let newQuestions = props.questions;
    let newOption = props.questions.option;
    newOption[3] = e.currentTarget.value;
    newQuestions[props.currentQuestionIndex] = {
      ... newQuestions[props.currentQuestionIndex],
      options: newOption,
    }
    props.setQuestions(newQuestions);
  }

  function updateAnswer(e) {
    let newQuestions = props.questions;
    newQuestions[props.currentQuestionIndex] = {
      ... newQuestions[props.currentQuestionIndex],
      answer: e.currentTarget.value,
    }
    props.setQuestions(newQuestions);
  }

  function updateHint(e) {
    let newQuestions = props.questions;
    newQuestions[props.currentQuestionIndex] = {
      ... newQuestions[props.currentQuestionIndex],
      hint: e.currentTarget.value,
    }
    props.setQuestions(newQuestions);
  }

  function updateFeedback(e) {
    let newQuestions = props.questions;
    newQuestions[props.currentQuestionIndex] = {
      ... newQuestions[props.currentQuestionIndex],
      feedback: e.currentTarget.value,
    }
    props.setQuestions(newQuestions);
  }

  // function saveQuestion(){
  //   var newQuestion = { 
  //     name:"",
  //     questionText:"",
  //     answer: "",
  //     feedback: "",
  //     hint:"",
  //     option:[optionA,optionB,optionC,optionD]
  //   }
  //   props.updateCurrentQuestion(newQuestion);
  // }


  return (
    <div className={props.index === props.currentQuestionIndex ? "": "hide"}>
      <div className="question-element-box">
        <p>Question Name:</p>
        <input onChange={updateQuestionName} type="text" defaultValue={props.questions[props.currentQuestionIndex].name}></input>        
      </div>
      <div className="question-element-box2">
        <p className="question-element-title">Description:</p>
        <textarea rows="5" cols="40" onChange={updateDescription} type="text" defaultValue={props.questions[props.currentQuestionIndex].questionText}></textarea>        
      </div>

      <div>  
          <p className="question-element-title">Options</p> 

          <div className="option question-element-box">
            <p>Option A: </p>
            <input onChange={updateOptionA} type="text" defaultValue={props.questions[props.currentQuestionIndex].option[0]}></input>
          </div> 

          <div className="option question-element-box">
          <p>Option B: </p>
          <input onChange={updateOptionB} type="text" defaultValue={props.questions[props.currentQuestionIndex].option[1]}></input>
          </div>

          <div className="option question-element-box">
            <p>Option C: </p>
            <input onChange={updateOptionC} type="text" defaultValue={props.questions[props.currentQuestionIndex].option[2]}></input>
          </div> 

          <div className="option question-element-box">
            <p>Option D: </p>
            <input onChange={updateOptionD} type="text" defaultValue={props.questions[props.currentQuestionIndex].option[3]}></input>
          </div> 
      </div> 

      <div className="question-element-box">
          <p> Answer:  </p>
          <input className='answer-input' onChange={updateAnswer} type="text" defaultValue={props.questions[props.currentQuestionIndex].answer}></input>
      </div>

      <div className="question-element-box2">
          <p className="question-element-title">Hint</p>
          <textarea rows="5" cols="30" onChange={updateHint} type="text" defaultValue={props.questions[props.currentQuestionIndex].hint}></textarea>
      </div>

      <div className="question-element-box2">
          <p className="question-element-title">Explanatory Feedback</p>
          <textarea rows="5" cols="30" onChange={updateFeedback} type="text" defaultValue={props.questions[props.currentQuestionIndex].feedback}></textarea>
      </div>
      <div className="saveDeleteBtn-div">
        <button className='element-btns delete-btn' onClick={() => props.deleteItem(props.currentQuestionIndex)} >  
          <FaTrash style={{ cursor: "pointer" }}/> 
          Delete
        </button>   
      </div>

    </div>
  );
}