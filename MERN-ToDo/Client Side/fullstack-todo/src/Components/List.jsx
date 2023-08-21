import React from "react";
export default function TodoList(props){
    const style = {
        color:"#ff0000"
    }
    return(
        <div className="todo-list">
            <div className="name-des">
                <h1>{props.complete?<del>{props.title}</del>:props.title}</h1>
                <h3>{props.complete?<del>{props.description}</del>:props.description}</h3>
            </div>
            {!(props.complete) && <button onClick={props.onComplete} className="complete-button">Complete</button>}
            <button onClick={props.onDelete} className="delete-button">Delete</button>
        </div>
    )
}