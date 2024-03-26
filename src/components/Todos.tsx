import React from "react";
import { TodoProps } from "../types";
import Todo from "./Todo";

import '.././index.css';
import '../styles/todos.css';

interface props {
    todos:Array<TodoProps>;
    setTodos: React.Dispatch<React.SetStateAction<Array<TodoProps>>>;
    completedTodos:Array<TodoProps>;
    setCompletedTodos:React.Dispatch<React.SetStateAction<Array<TodoProps>>>;
    unCompletedTodos:Array<TodoProps>
    setUnCompletedTodos:React.Dispatch<React.SetStateAction<Array<TodoProps>>>;
  }

const Todos = ({
todos,
setTodos,
completedTodos,
setCompletedTodos,
unCompletedTodos,
setUnCompletedTodos
}:props) => {
  return (
    <div className="container todos">
      <h2>All Todos</h2>
        {
        todos.map((todo:TodoProps,index:number) => (
        <Todo
        key={todo.id}
        index={index}
        todo={todo}
        todos={todos}
        setTodos={setTodos} 
        completedTodos={completedTodos}
        setCompletedTodos={setCompletedTodos} 
        unCompletedTodos={unCompletedTodos}
        setUnCompletedTodos={setUnCompletedTodos}
        />
    ))}
    </div>
  )
}

export default Todos