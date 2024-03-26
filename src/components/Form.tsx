import React, { useRef } from 'react';
import '../styles/form.css';

interface props{
    todoText:string;
    setTodoText:React.Dispatch<React.SetStateAction<string>>;
    handleAdd:(e:React.FormEvent)=> void;
};

const Form:React.FC<props> = ({ todoText, setTodoText, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="form"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter a Task"
        value={todoText}
        ref={inputRef}
        onChange={(e) => setTodoText(e.target.value)}
        className="form__box"
      />
      <button type="submit" className="form_submit">
        GO
      </button>

    </form>
  )
}

export default Form