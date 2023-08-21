import React from "react";

export default function ShowTasks(props){
    return(
        <div className="todo-list">
            <div className="name-des">
                <h1>{props.title}</h1>
                <h3>{props.description}</h3>
            </div>
            {!props.completed && <button onClick={props.onComplete} className="complete-button">Complete</button>}
            <button onClick={props.onDelete} className="delete-button">Delete</button>
        </div>
    )
}