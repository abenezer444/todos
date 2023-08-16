
import { Todo } from '../../todo'
import EditTask from '../editTask/EditTask'
import { BiEdit, BiTrash,BiCheck } from 'react-icons/bi';
import './todoList.css'

interface Props {
    todos: Todo[]
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function todoList({todos, setTodos}:Props) {
 
  function handleEdit(currentId: string) {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((cur) => {
        if (cur.id === currentId) {
          return {
            ...cur,
            isbeingEdited: !cur.isbeingEdited,
          };
        }
        return cur;
      });
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  }
  
    function handleTaskDone(currentId: string) {
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((cur) => {
          if (cur.id === currentId) {
            return {
              ...cur,
              isCompleted: !cur.isCompleted,
            };
          }
          return cur;
        });
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return updatedTodos;
      });
    }
    
    function handleDelete(currentId: string) {
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.filter((cur) => cur.id !== currentId);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        return updatedTodos;
      });
    }
    
    if (todos.length ===0){
        return <p>Nothing to do, yay!</p>
    }
    const todoList = todos.map((todo) => { 
        const currentId = todo.id;
        return <div key={todo.id} >
        {todo.isbeingEdited ? (
          <EditTask currentId={todo.id} task={todo.task}  setTodos={setTodos} />
        ) : (
          <div className='container'>
            {todo.isCompleted ? (
              <p style={{ textDecoration: 'line-through',flex:1 }}>{todo.task}</p>
            ) : (
              <div className='task'>{todo.task}</div>
            )}
            <div className='icon-buttons'>
            <button className='icon-button' onClick={() => handleEdit(currentId)}><BiEdit/></button>
            <button className='icon-button delete' onClick={() => handleDelete(currentId)}><BiTrash/></button>
          
            <button className='icon-button' onClick={() => handleTaskDone(currentId)}><BiCheck/></button>
            </div>
            
          </div>
        )}
      </div>
      
        
    })
    
  return (
    <>
    {todoList}
    
    </>
    
  )
}
