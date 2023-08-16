import React from 'react';
import { Todo } from '../../todo';
import './editTask.css'; // 

interface Props {
  currentId: string;
  task: string;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function EditTask({ currentId, task, setTodos }: Props) {
  const [text, setText] = React.useState<string>(task);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((cur) => {
        if (cur.id === currentId) {
          return {
          ...cur,
          task: text,
          isbeingEdited: false,
          };
        }
        return cur;
      });
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };
  

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSave}>
        <input
          type="text"
          className="input-field"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button type="submit" className="save-button">
          Save
        </button>
      </form>
    </div>
  );
}
