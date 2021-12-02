import {Link} from 'react-router-dom'
import AddTask from './AddTask'
import Tasks from './Tasks'


const Home = (showAddTask, addTask, tasks, deleteTask, toggleReminder) => {
    return (
        <div>
             {showAddTask && <AddTask onAdd={addTask} />}
              { tasks.length > 0 ?
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks To Show'
              }  
        </div>
    )
}
export default Home
