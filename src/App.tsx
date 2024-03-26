import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import { TodoProps } from './types';
import Todos from './components/Todos';
import CompletedTodos from './components/CompletedTodos';
import UnCompletedTodos from './components/UnCompletedTodos';
import { FaListUl } from "react-icons/fa";

import {
  storageDataNames,  
} from './localStorage'


const App:React.FC = ()=> {
  const [showenTodos,setShowenTodos] = useState<string>(localStorage.getItem(storageDataNames.s_showenTodos) as string || 'lists');
  const [todoText,setTodoText] = useState<string>(localStorage.getItem(storageDataNames.s_todoText) as string || '');
  const [isOptionListVisible,setIsOptionListVisible] = useState<boolean>(false);
  const [todos,setTodos] = useState<TodoProps[]>(JSON.parse(localStorage.getItem(storageDataNames.s_todos) as string) || []);
  const [completedTodos,setCompletedTodos] = useState<TodoProps[]>(JSON.parse(localStorage.getItem(storageDataNames.s_completedTodos) as string) || []);
  const [unCompletedTodos,setUnCompletedTodos] = useState<TodoProps[]>(JSON.parse(localStorage.getItem(storageDataNames.s_unCompletedTodos) as string) || []);

useEffect(()=>{

},[completedTodos,todos,unCompletedTodos])






  const handleAdd = (e:React.FormEvent)=>{
    e.preventDefault();

    if (todoText) {
      const newTodo = {
        id:crypto.randomUUID().toString(),
        text:todoText,
        isDone:false
      } 
      

     localStorage.setItem(storageDataNames.s_todos , JSON.stringify([ ...todos , {...newTodo}])); 
      setTodos(todo => [...todo , {...newTodo}]);

      localStorage.setItem(storageDataNames.s_unCompletedTodos , JSON.stringify([ ...unCompletedTodos , {...newTodo}])); 
      setUnCompletedTodos(todo => [...todo , {...newTodo}]); 
      setTodoText('')
    }
  }

  const handleShowLists = (list:string)=>{
    localStorage.setItem(storageDataNames.s_showenTodos , list)
    setShowenTodos(list)
  }

  return (
    <div className="App">
      <header>
        <h1 className="heading">
        TASKIFY 
        </h1>
        <button onClick={()=> setIsOptionListVisible(!isOptionListVisible)}>
          <FaListUl />
        </button>
      </header>
      <div className={`container container--list ${isOptionListVisible ? 'visible' : 'hidden'}`}>
        <div className={`show-list`}>
          <button
            className={`${showenTodos === 'lists' ? 'active' : ''}`} 
            onClick={()=> handleShowLists('lists')}>
            Show lists
          </button>
          <button className={`${showenTodos === 'all' ? 'active' : ''}`} 
            onClick={()=> handleShowLists('all')}>
            ALL Items
          </button>
          <button
            className={`${showenTodos === 'completed' ? 'active' : ''}`} 
            onClick={()=> handleShowLists('completed')}>
            COMPLETED
          </button>
          <button
            className={`${showenTodos === 'uncompleted' ? 'active' : ''}`} 
            onClick={()=> handleShowLists('uncompleted')}>
            UN COMPLETED
          </button>
        </div>
      </div>
      <Form 
        todoText={todoText}
        setTodoText={setTodoText}
        handleAdd={handleAdd} 
      />
      {
        todos && todos.length ?
        <div className='all-todos'>
       {
         showenTodos === 'all' ||  showenTodos === 'lists' ?

         <Todos
         todos={todos}
         setTodos={setTodos}
         completedTodos={completedTodos}
         setCompletedTodos={setCompletedTodos}
         unCompletedTodos={unCompletedTodos}
         setUnCompletedTodos={setUnCompletedTodos}
       />
       : null
       }
      {
        showenTodos === 'lists' || showenTodos === 'completed' ?

        <CompletedTodos 
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          todos={todos}
          setTodos={setTodos}
          unCompletedTodos={unCompletedTodos}
          setUnCompletedTodos={setUnCompletedTodos}
        />
        : null
      }
      {
        showenTodos === 'lists' || showenTodos === 'uncompleted' ?

        <UnCompletedTodos 
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          todos={todos}
          setTodos={setTodos}
          unCompletedTodos={unCompletedTodos}
          setUnCompletedTodos={setUnCompletedTodos}
        />
        : null
      }
      </div>
      : null
      }
    </div>
  );
}

export default App;
