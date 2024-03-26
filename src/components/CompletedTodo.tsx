import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {AiFillDelete } from "react-icons/ai";
import { TodoProps } from "../types";


interface props {
    index:number;
    todo:TodoProps;
    todos:Array<TodoProps>;
    completedTodos:Array<TodoProps>;
    setTodos:React.Dispatch<React.SetStateAction<Array<TodoProps>>>;
    setCompletedTodos:React.Dispatch<React.SetStateAction<Array<TodoProps>>>;
    unCompletedTodos:Array<TodoProps>;
    setUnCompletedTodos:React.Dispatch<React.SetStateAction<Array<TodoProps>>>;
}

const CompletedTodo = ({
  index,
  todo,
  todos,
  completedTodos,
  setTodos,
  setCompletedTodos,
  unCompletedTodos,
  setUnCompletedTodos 
}:props) => {

    const inputRef = useRef<HTMLInputElement>(null);
    
    // delete
    const handleDeleteFromCompleted = (id: string) => {
      if (window.confirm('This will leads to consider this task un completed.')) {
        setTodos(
          todos.map((todo) =>
              todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
          ));
          setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
      } 
    };
    
    
    return (
        <div  className={`todo completed done`}>
            <form
            >
            <span className="todo--text">{todo.text}</span>
            <hr />
            <div>         
                <button className="icon one-item" onClick={() => handleDeleteFromCompleted(todo.id)}>
                <AiFillDelete />
                </button>
            </div>
            </form>
        </div>
    )};


export default CompletedTodo