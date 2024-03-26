import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { TodoProps } from "../types";
import CompletedTodos from "./CompletedTodos";
import{storageDataNames} from '../localStorage'


interface props {
    index:number;
    todo:TodoProps;
    todos:TodoProps[];
    setTodos: React.Dispatch<React.SetStateAction<TodoProps[]>>;
    completedTodos:Array<TodoProps>;
    setCompletedTodos:React.Dispatch<React.SetStateAction<Array<TodoProps>>>;
    unCompletedTodos:Array<TodoProps>
    setUnCompletedTodos:React.Dispatch<React.SetStateAction<Array<TodoProps>>>;
}

const Todo = ({ index, todo, todos, setTodos , completedTodos , setCompletedTodos , unCompletedTodos , setUnCompletedTodos }:props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.text);
  
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit , todo.isDone]);

    console.log(todo);

    console.log(todos);

    console.log(
        localStorage.getItem(storageDataNames.s_todos) 
    )
    
    
    
    const handleChangeTex = (e: React.FormEvent|any, id: string) => {
        e.preventDefault();
        setEditTodo(e.target.value) 
    };

    // start edite methods
    const handleSubmitEdit = (e: React.FormEvent, id: string)=>{

        const modifiedTodos = todos.map((todo) => (todo.id === id ? { ...todo, text:editTodo} : todo));
        const modifiedCompletedTodos = completedTodos.map((todo) => (todo.id === id ? { ...todo, text:editTodo} : todo));
        const modifiedUnCompletedTodos = unCompletedTodos.map((todo) => (todo.id === id ? { ...todo, text:editTodo} : todo));

        localStorage.setItem(storageDataNames.s_todos , JSON.stringify(modifiedTodos));
        localStorage.setItem(storageDataNames.s_completedTodos , JSON.stringify(modifiedCompletedTodos));
        localStorage.setItem(storageDataNames.s_unCompletedTodos , JSON.stringify(modifiedUnCompletedTodos));

        if (
            localStorage.getItem(storageDataNames.s_todos) != null &&
            localStorage.getItem(storageDataNames.s_completedTodos) != null &&
            localStorage.getItem(storageDataNames.s_unCompletedTodos) != null
            ){

                setTodos(
                    (todos)=> JSON.parse(localStorage.getItem(storageDataNames.s_todos) as string) 
                )
    
                setCompletedTodos(
                    (todos)=> JSON.parse(localStorage.getItem(storageDataNames.s_completedTodos) as string) 
                )
    
                setUnCompletedTodos(
                    (todos)=> JSON.parse(localStorage.getItem(storageDataNames.s_unCompletedTodos) as string) 
                )
        }
 
        setEdit(false);    
    }

    const handleShowEditInput = ()=>{
        setEdit(true)
    }

    const controleEditMethode = (e: React.FormEvent, id: string)=>{
        e.preventDefault()
        return edit ? handleSubmitEdit(e,id) : handleShowEditInput();
    }
    // end edite methods

    
    // delete
    const handleDelete = (e: React.FormEvent, id: string) => {
        e.preventDefault();
        setTodos(todos.filter((todo) => todo.id !== id));
        setCompletedTodos(completedTodos.filter((todo) => todo.id !== id))
        setUnCompletedTodos(unCompletedTodos.filter((todo) => todo.id !== id))

        localStorage.setItem(storageDataNames.s_todos , JSON.stringify(todos.filter((todo) => todo.id !== id))); 
        localStorage.setItem(storageDataNames.s_completedTodos , JSON.stringify(completedTodos.filter((todo) => todo.id !== id))); 
        localStorage.setItem(storageDataNames.s_unCompletedTodos , JSON.stringify(unCompletedTodos.filter((todo) => todo.id !== id))); 
    };
    
    // done
    const handleDone = (e: React.FormEvent, id: string) => {
        e.preventDefault();

        const modifiedTodos = todos.map(item => item.id === id ? {...item , isDone:!item.isDone} : item);
        const modifiedCompletedTodos = todos.filter(item => item.isDone)
        const modifiedUnCompletedTodos = todos.filter(item => !item.isDone)

        localStorage.setItem(storageDataNames.s_todos , JSON.stringify(modifiedTodos));
        localStorage.setItem(storageDataNames.s_completedTodos , JSON.stringify(modifiedCompletedTodos));
        localStorage.setItem(storageDataNames.s_unCompletedTodos , JSON.stringify(modifiedUnCompletedTodos));
    
        if (
            
            localStorage.getItem(storageDataNames.s_todos) != null &&
            localStorage.getItem(storageDataNames.s_completedTodos) != null &&
            localStorage.getItem(storageDataNames.s_unCompletedTodos) != null
            
            ) {
            console.log('not null');
            
            setTodos(
                (todos)=> JSON.parse(localStorage.getItem(storageDataNames.s_todos) as string) 
            )

            setCompletedTodos(
                (todos)=> JSON.parse(localStorage.getItem(storageDataNames.s_completedTodos) as string) 
            )

            setUnCompletedTodos(
                (todos)=> JSON.parse(localStorage.getItem(storageDataNames.s_unCompletedTodos) as string) 
            )
        }     
      
    };
  
    return (
        <div className={`todo ${todo.isDone ? "done" : ""}`}>
            <form>
            {edit ? (
                <input
                value={editTodo}
                onChange={(e) => handleChangeTex(e,todo.id)}
                className="todo--text"
                ref={inputRef}
                />
            ) : todo.isDone ? (
                <p className="todo--text">{todo.text}</p>
            ) : (
                <p className="todo--text">{todo.text}</p>
            )}
            <hr />
            <div className="btn-wrapper">
                <button
                className="icon"
                onClick={(e) => controleEditMethode(e, todo.id)}
                >
                <AiFillEdit />
                </button>
                <button className="icon" onClick={(e) => handleDelete(e,todo.id)}>
                <AiFillDelete />
                </button>
                <button className="icon" onClick={(e) => handleDone(e,todo.id)}>
                <MdDone />
                </button>
            </div>
            </form>
        </div>
    );
    };


export default Todo