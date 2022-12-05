import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import ListItem from "./ListItem";

let globalItemCount = 0;


function App() {



  const [listItems, setListItems] = useState([
    { name: "Question1", type: "", id: 0 }
  ]);

  const [questionSet, setQuestionSet] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState({});

  function updateCurrentQuestion(question){
    setCurrentQuestion(question)

    let tempSet = [...questionSet];


    var questionIndex = tempSet.findIndex((q) => q.id === question.id)
    console.log(questionIndex)
    if (questionIndex == -1){
      tempSet.push(question)
    } else {
      tempSet[questionIndex] = question
    }
    console.log(tempSet)
    setQuestionSet(tempSet)



    }

  

  








  // const [questionName, setQuestionName] = useState("");
  // const [description, setDescription] = useState("");
  // const [optionA, setOptionA] = useState("");
  // const [optionB, setOptionB] = useState("");
  // const [optionC, setOptionC] = useState("");
  // const [optionD, setOptionD] = useState("");
  // const [answer, setAnswer] = useState("");
  // const [hint, setHint] = useState("");
  // const [feedback, setFeedback] = useState("");



  // const [currentQuestion, setCurrentQuestion] = useState({})

  // function updateQuestionName(e) {
  //   setQuestionName(e.currentTarget.value);
  // }

  // function updateDescription(e) {
  //   setDescription(e.currentTarget.value);
  // }

  // function updateOptionA(e) {
  //   setOptionA(e.currentTarget.value);
  // }

  // function updateOptionB(e) {
  //   setOptionB(e.currentTarget.value);
  // }

  // function updateOptionC(e) {
  //   setOptionC(e.currentTarget.value);
  // }

  // function updateOptionD(e) {
  //   setOptionD(e.currentTarget.value);
  // }

  // function updateAnswer(e) {
  //   setAnswer(e.currentTarget.value);
  // }

  // function updateHint(e) {
  //   setHint(e.currentTarget.value);
  // }

  // function updateFeedback(e) {
  //   setFeedback(e.currentTarget.value);
  // }

  // function saveQuestion(id){
  //   setCurrentQuestion({ name: questionName, description: description, optionA: optionA, optionB: optionB, optionC: optionC, optionD: optionD, answer: answer, hint: hint,feedback: feedback })
  // }












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
        // updateQuestionName={updateQuestionName}
        // updateDescription={updateDescription}

        // updateOptionA={updateOptionA}
        // updateOptionB={updateOptionB}
        // updateOptionC={updateOptionC}
        // updateOptionD={updateOptionD}

        // updateAnswer={updateAnswer}
        // updateHint={updateHint}
        // updateFeedback={updateFeedback}

        // saveQuestion={saveQuestion}

        

      />
    );
  });



  return (
    <div className="App">
      <h1>My Question Set</h1>
      {/* <input onChange={updateNewQuestion} type="text"></input> */}
      {questionSetComponents}
      <button onClick={createNewQuestion}>Add Multiple Choice Question</button>

      

    </div>
  );
}

export default App;
