import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { io } from "socket.io-client";
const socket = io("http://localhost:3000")

const App = () => {
  const [todos, setTodos] = useState([])
  const [value, setValue] = useState("")

  useEffect(()=>{
    socket.on("connect",()=>{
      console.log(socket.id);
    })
    socket.on("send-todo",(data)=>{
      setTodos([...todos ,data])
    })
    socket.on("todo-deleted",({id})=>{
      setTodos((todo) => todo.filter((todo)=>todo.id !== id))
    })

  },[todos])

  return (
    <>
    <div>
      <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} />
      <button onClick={()=>{
        // setTodos([...todos, value])
        setValue("")
        socket.emit("add-todo",{id:crypto.randomUUID(),value:value.trim()})
      }}>Add Todos</button>
    </div>
    <ul>
      {
        todos.map((todo,i)=> <li key={i}>{todo.value} <button onClick={()=>{
          socket.emit("delete-todo",{id:todo.id})
        }}>Delete</button> </li>)
      }
    </ul>
    </>
  )
}

export default App