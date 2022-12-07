import { useState } from "react";
import { Routes, Route  } from "react-router-dom";
import ListItem from "./ListItem";
import ResultViewPanel from '../ResultViewPanel/ResultViewPanel';
import ControlPanel from '../ControlPanel/ControlPanel';

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

  return(
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
  );
}

export default TeacherPage;