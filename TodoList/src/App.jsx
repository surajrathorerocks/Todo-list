import { useState,useEffect} from 'react'
import './App.css'
import { TodoProvider } from './context'
import { TodoForm, TodoItem } from './assets/components'

function App() {
  const [Todos, setTodos] = useState([])
  const addTodo = (Todo) =>{
    setTodos((oldTodo)=>[{id: Date.now(),...Todo},...oldTodo])
  }
  const updatedTodo = (id,Todo) =>{
    setTodos((oldTodo) => oldTodo.map((prevTodo) => (prevTodo.id === id ? Todo : prevTodo)))
  }
  const deleteTodo = (id) => {
    setTodos((oldTodo) => oldTodo.filter((Todo) => Todo.id != id))
  }
  const toggleComplete = (id) =>{
    setTodos((oldTodo) => oldTodo.map((prev) => prev.id === id ?{...prev,completed: ! prev.completed}:prev))
  }
  useEffect (()=>{
  const Todos = JSON.parse(localStorage.getItem("Todos"))
  if(Todos && Todos.length>0){
    setTodos(Todos)
  }
  },[])
  useEffect (()=>{
    localStorage.setItem("Todos",JSON.stringify(Todos))
  },[Todos])

  return (
    <TodoProvider value={{Todos,addTodo,updatedTodo,toggleComplete,deleteTodo}}>
     <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {Todos.map((Todo)=>(
                         <div key={Todo.id} className='w-full'>
                          <TodoItem todo={Todo}/>
                         </div>
                        ))}
                    </div>
                </div>
            </div>
     </TodoProvider>
  )   
}

export default App
