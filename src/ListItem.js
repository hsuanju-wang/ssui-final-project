import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function ListItem(props) {


  const [questionName, setQuestionName] = useState("");
  const [description, setDescription] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [feedback, setFeedback] = useState("");
  const [questionInfo, setQuestionInfo] = useState({});




  function updateQuestionName(e) {
    setQuestionName(e.currentTarget.value);
  }

  function updateDescription(e) {
    setDescription(e.currentTarget.value);
  }

  function updateOptionA(e) {
    setOptionA(e.currentTarget.value);
  }

  function updateOptionB(e) {
    setOptionB(e.currentTarget.value);
  }

  function updateOptionC(e) {
    setOptionC(e.currentTarget.value);
  }

  function updateOptionD(e) {
    setOptionD(e.currentTarget.value);
  }

  function updateAnswer(e) {
    setAnswer(e.currentTarget.value);
  }

  function updateHint(e) {
    setHint(e.currentTarget.value);
  }

  function updateFeedback(e) {
    setFeedback(e.currentTarget.value);
  }

  function saveQuestion(){
    const questionInfo = { id: props.id, name: questionName, description: description, optionA: optionA, optionB: optionB, optionC: optionC, optionD: optionD, answer: answer, hint: hint,feedback: feedback }
    props.updateCurrentQuestion(questionInfo)
  }


  return (
    <div
    //   style={{
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center"
    //   }}
    >
    <p>Question Name:</p>
    <input onChange={updateQuestionName} type="text"></input>

    <p>Description:</p>
    <textarea rows="10" cols="80" onChange={updateDescription} type="text"></textarea>
    <div>  
        <p>Options</p> 

        <div className="option">
        <p>Option A</p>
        <input onChange={updateOptionA} type="text"></input>
        </div> 

        <div className="option">
        <p>Option B</p>
        <input onChange={updateOptionB} type="text"></input>
        </div>

        <div className="option">
        <p>Option C</p>
        <input onChange={updateOptionC} type="text"></input>
        </div> 

        <div className="option">
        <p>Option D</p>
        <input onChange={updateOptionD} type="text"></input>
        </div> 
    
    </div> 

    <div>
        <p>Answer</p>
        <input onChange={updateAnswer} type="text"></input>
    </div>


    <div>
        <p>Hint</p>
        <textarea rows="5" cols="80" onChange={updateHint} type="text"></textarea>
    </div>

    <div>
        <p>Explanatory Feedback</p>
        <textarea rows="5" cols="80" onChange={updateFeedback} type="text"></textarea>
    </div>



     

    <button onClick={() => props.deleteItem(props.id)} >  <FaTrash
        style={{ cursor: "pointer" }}
        
      /> Delete</button>



      {/* <p style={{ marginLeft: "10px" }}>{props.text}</p> */}

      <button onClick={saveQuestion} >Save</button>
      <button >Edit</button>


    </div>
  );
}