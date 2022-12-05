import { FaTrash } from "react-icons/fa";

export default function ListItem(props) {
  return (
    <div
    //   style={{
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center"
    //   }}
    >
    <p>Question Name:</p>
    <input onChange={props.updateQuestionName} type="text"></input>

    <p>Description:</p>
    <textarea rows="10" cols="80" onChange={props.updateDescription} type="text"></textarea>
    <div>  
        <p>Options</p> 

        <div className="option">
        <p>Option A</p>
        <input onChange={props.updateOptionA} type="text"></input>
        </div> 

        <div className="option">
        <p>Option B</p>
        <input onChange={props.updateOptionB} type="text"></input>
        </div>

        <div className="option">
        <p>Option C</p>
        <input onChange={props.updateOptionC} type="text"></input>
        </div> 

        <div className="option">
        <p>Option D</p>
        <input onChange={props.updateOptionD} type="text"></input>
        </div> 
    
    </div> 

    <div>
        <p>Answer</p>
        <input onChange={props.updateAnswer} type="text"></input>
    </div>


    <div>
        <p>Hint</p>
        <textarea rows="5" cols="80" onChange={props.updateHint} type="text"></textarea>
    </div>

    <div>
        <p>Explanatory Feedback</p>
        <textarea rows="5" cols="80" onChange={props.updateFeedback} type="text"></textarea>
    </div>



     

    <button onClick={() => props.deleteItem(props.id)} >  <FaTrash
        style={{ cursor: "pointer" }}
        
      /> Delete</button>



      {/* <p style={{ marginLeft: "10px" }}>{props.text}</p> */}

      <button onClick={props.saveQuestion(props.id)} >Save</button>
      <button >Edit</button>


    </div>
  );
}