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
  },[])

  return (
    <>
    <div>
      <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} />
      <button onClick={()=>{
        setTodos([...todos, value])
        setValue("")
        socket.emit("add-todo",{value})
      }}>Add Todos</button>
    </div>
    <ul>
      {
        todos.map((v,i)=> <li key={i}>{v} <button onClick={()=>{
          const oldTodos = [...todos]
          oldTodos.splice(i,1)
          setTodos(oldTodos)
        }}>Delete</button> </li>)
      }
    </ul>
    </>
  )
}

export default App