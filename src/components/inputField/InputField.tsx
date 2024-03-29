import React, { FormEvent } from 'react'
import {Todo} from '../../todo'
import './inputField.css'
import { useRef,useEffect } from "react"

interface props {
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const InputField = ({setTodos}:props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <form className='container' onSubmit={(e:FormEvent)=>{
            e.preventDefault()
            const target = e.target as HTMLFormElement;
            const task:string = target.todo.value
            if(task !== ''){
                setTodos((prevTodos)=>{
                    const updatedTodos = [{id: prevTodos.length.toString() ,task, isCompleted:false,isbeingEdited:false},...prevTodos]
                    localStorage.setItem('todos', JSON.stringify(updatedTodos))
                    return updatedTodos
                })
                
            }
            

            target.todo.value = ''
         
        }}>
            <input ref={inputRef} type="input" className='input-field' placeholder='please enter your task here' name='todo' />
            <button type='submit' className='button'>Go</button>
        </form>
    )
}
export default InputField