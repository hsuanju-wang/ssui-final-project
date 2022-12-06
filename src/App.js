import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import ListItem from "./ListItem";
import { Routes, Route  } from "react-router-dom";
import Edit from './Edit';
import Preview from './TestMode';
import Login from './Login';
import './App.css';
import ResultViewPanel from './container/ResultViewPanel/ResultViewPanel';
import ControlPanel from './container/ControlPanel/ControlPanel';


import Header from './Header'



let globalItemCount = 0;


function App() {

  const [threshold, setThreshold] = useState(5);
  const [dataGroup, setDataGroup] = useState("gender");




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



  return (
    <div className="App">

    <Header />

      <div className='main-container'>
        <ControlPanel 
            setDataGroup = {setDataGroup}
            setThreshold = {setThreshold}
            threshold = {threshold}/>
        <ResultViewPanel
            threshold = {threshold}
            dataGroup = {dataGroup}/>        
      </div>



    <Routes>
          <Route path='/' element={<Edit/>}>  </Route>
          <Route path='/preview' element={<Preview/>}>  </Route>

          {/* <Route path='/preview/' element={<Preview />}>  </Route> */}
          <Route path='/login/' element={<Login />}> </Route>
    </Routes>

      <h1>My Question Set</h1>
      {/* <input onChange={updateNewQuestion} type="text"></input> */}
      {questionSetComponents}
      <button onClick={createNewQuestion}>Add Multiple Choice Question</button>

      

    </div>
  );
}

export default App;
