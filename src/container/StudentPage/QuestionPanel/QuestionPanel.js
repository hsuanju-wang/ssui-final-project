import { Colors } from "chart.js";
import { useState } from "react";
import { Routes, Route,useNavigate } from "react-router-dom";
import './QuestionPanel.css'

const QuestionPanel = (props) => {
  const [clickedBtn, setClickedBtn] = useState(undefined);
  const [studentAnswer, setStudentAnswer] = useState([]);
  const [studentAnswerCorrect, setStudentAnswerCorrect] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const navigate = useNavigate();

  function answerClicked(e){
    if(!submitted){
        if(clickedBtn !== undefined){
            clickedBtn.classList.remove('selectedBtn');
            clickedBtn.classList.add('unSelectedBtn');
        }
        e.target.classList.remove('unSelectedBtn');
        e.target.classList.add('selectedBtn');
        setClickedBtn(e.target);
    }
  }

  function nextBtnClicked(){
    //check if the last one
    setSubmitted(false);
    props.setCurrentQuestionIndex(props.currentQuestionIndex+1);
    clickedBtn.classList.remove('correctBtn');
    clickedBtn.classList.remove('wrongBtn');
    clickedBtn.classList.add('unSelectedBtn');
    setClickedBtn(undefined);
    enabledBtnHoverEffect();
  }

  function submitBtnClicked(){
    if(clickedBtn!==undefined){
        setSubmitted(true);
        disableBtnHoverEffect();

        let newStudentAnswer = studentAnswer;
        newStudentAnswer.push(clickedBtn.value);
        setStudentAnswer(newStudentAnswer);

        checkAnswer(clickedBtn.value);

        if(props.currentQuestionIndex === props.currentQuestionLength-1){
            setIsEnd(true);
        }
    }
  }

  function checkAnswer(answer){
    clickedBtn.classList.remove('selectedBtn');
    if(answer === props.currentQuestion.answer){
        clickedBtn.classList.add('correctBtn');
        setStudentAnswerCorrect(studentAnswerCorrect+1);
    }
    else{
        clickedBtn.classList.add('wrongBtn');
    }
  }

  function disableBtnHoverEffect(){
    let btns = document.getElementsByName('option');
    for(let i = 0; i < btns.length; i++)
    {
        btns[i].classList.remove('hoverBtn');
    }
  }

  function enabledBtnHoverEffect(){
    let btns = document.getElementsByName('option');
    for(let i = 0; i < btns.length; i++)
    {
        btns[i].classList.add('hoverBtn');
    }
  }

  function endBtnClicked(){
    let score = studentAnswerCorrect + '/' + props.currentQuestionLength;
    props.uploadAnswerToDb(studentAnswer,score);
    navigate('/');
  }




  return(
    <div className="question-panel">
        <h2>{props.currentQuestion.name}</h2>
        <p className="question-text">
            {props.currentQuestion.questionText}
        </p>

        <p className="hint">
            Hint: <br></br>
            {props.currentQuestion.hint}
        </p>

        <div className="answer-options">
            <button className='unSelectedBtn hoverBtn' name={'option'} value={"A"} onClick={(e) => answerClicked(e)}>{props.currentQuestion.option[0]}</button> 
            <button className='unSelectedBtn hoverBtn' name={'option'} value={"B"} onClick={(e) => answerClicked(e)}>{props.currentQuestion.option[1]}</button>
            <button className='unSelectedBtn hoverBtn'name={'option'} value={"C"} onClick={(e) => answerClicked(e)}>{props.currentQuestion.option[2]}</button>
            <button className='unSelectedBtn hoverBtn' name={'option'} value={"D"} onClick={(e) => answerClicked(e)}>{props.currentQuestion.option[3]}</button>
        </div>
        { submitted &&
            <div>
                <p className="hint">
                    Feedback: <br></br>
                    {props.currentQuestion.feedback}
                </p>                
            </div>
        }
        { submitted
            ? isEnd
                ? <button className='nextBtn' onClick={() => endBtnClicked()}>End</button>
                : <button className='nextBtn' onClick={() => nextBtnClicked()}>Next</button> 
            : <button className={clickedBtn===undefined ? 'greyOutBtn' : 'submitBtn'} onClick={ () => submitBtnClicked()}>Submit</button>
        }
              
    </div>
  );
}

export default QuestionPanel;