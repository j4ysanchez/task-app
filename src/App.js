import './App.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Home from './components/Home'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

import { useState, useEffect } from 'react'

function App() {

  const[showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
   
    const getTasks = async () => {
      const tasksFromServer = await fectchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fectchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    console.log(data)

    return data
  }    

const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()

  console.log (data)

  return data
}

const addTask = async (task) => {
  // const id = Math.floor(Math.random() * 10000) +1
  
  // const newTask = {id, ...task }
  // setTasks([...tasks, newTask])  
  const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST', headers: {'Content-type': 'application/json' },
    body: JSON.stringify(task)
  })

  const data = await res.json()
  setTasks([...tasks, data])
}
  
  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id ))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, { 
      method: 'PUT', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  } 

  return (
    <Router>
      <div className="container">
        <Header onAdd={ () => setShowAddTask(!showAddTask)} 
          showAdd={showAddTask} />
          <div>
             {showAddTask && <AddTask onAdd={addTask} />}
              { tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'
              }  
        </div>
        <Routes>
          {/* <Route path='/' element = {<Home tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} addTask={addTask}
          
          // showAddTask={setShowAddTask} addTask, tasks, deleteTask, toggleReminder
          />} /> */}
          <Route path='/about' element={<About />} />
        </Routes>
        
        <Footer />
      </div>
      </Router>
  );
  
}

export default App;