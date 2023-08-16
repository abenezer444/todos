

import React from "react"
import InputField from "./components/inputField/InputField"
import TodoList from "./components/todoList/TodoList"
import {Todo} from './todo'

const App:React.FC = () => {

 
  const initialState:Todo[] = JSON.parse(localStorage.getItem("todos")!) || []
  
  const [todos, setTodos] = React.useState<Todo[]>(initialState)
  
  return (
    <>
      <p style={{textAlign:"center"}}>MY TODOS</p>
      <InputField setTodos={setTodos}/>
      <TodoList todos={todos} setTodos={setTodos}/>
    </>
  )
}

export default App
