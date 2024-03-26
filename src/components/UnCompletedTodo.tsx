import React, { useEffect, useState } from "react";
import { useRef } from "react";
import {AiFillDelete } from "react-icons/ai";
import { TodoProps } from "../types";


interface props {
    todo:TodoProps;
    todos:Array<TodoProps>;
    completedTodos:Array<TodoProps>;
    setTodos:React.Dispatch<React.SetStateAction<Array<TodoProps>>>;
    setCompletedTodos:React.Dispatch<React.SetStateAction<Array<TodoProps>>>;
    unCompletedTodos:Array<TodoProps>;
    setUnCompletedTodos:React.Dispatch<React.SetStateAction<Array<TodoProps>>>;
}

const UnCompletedTodo = ({ todo, todos, completedTodos , setTodos, setCompletedTodos , unCompletedTodos , setUnCompletedTodos }:props) => {

    const inputRef = useRef<HTMLInputElement>(null);
    
    
    // delete
    const handleDeleteFromUnCompleted = (id: string) => {
        if (window.confirm('This will leads to consider this task completed.')) {
          setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            ));
            setUnCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
        } 
      };
    
    
    return (
        <div className={`todo un-completed`}>
            <form>
            <span className="todo--text">{todo.text}</span>
            <hr />
            <div>         
                <button className="icon one-item" onClick={() => handleDeleteFromUnCompleted(todo.id)}>
                <AiFillDelete />
                </button>
            </div>
            </form>
        </div>
    )};


export default UnCompletedTodo