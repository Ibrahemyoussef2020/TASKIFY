import React from "react";
import { TodoProps } from "../types";
import '.././index.css';
import '../styles/todos.css';
import CompletedTodo from "./CompletedTodo";

interface props {
    completedTodos:Array<TodoProps>;
    todos:Array<TodoProps>;
    setTodos:React.Dispatch<React.SetStateAction<Array<TodoProps>>>;
    setCompletedTodos:React.Dispatch<React.SetStateAction<Array<TodoProps>>>;
    unCompletedTodos:Array<TodoProps>;
    setUnCompletedTodos:React.Dispatch<React.SetStateAction<Array<TodoProps>>>;
}

const CompletedTodos = ({
completedTodos,
setTodos,
todos,
setCompletedTodos,
unCompletedTodos,
setUnCompletedTodos
}:props) => {

  
  return (
    <div className="container todos">
        <h2>completed Todos</h2>
        {
        completedTodos.map((todo:TodoProps,index:number) => (
        <CompletedTodo
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

export default CompletedTodos