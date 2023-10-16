import { useState } from 'react';
//custom components
import { CustomForm } from './components/CustomForm';
import { TasksList } from './components/TasksList';
import { EditForm } from './components/EditForm';
import { ThemeSwitcher } from './components/ThemeSwitcher';
//custom hooks
import {useLocalStorage} from './hooks/useLocalStorage'

function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.task', []);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previousFocusEl, setPreviousFocuesEl] = useState(null);

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(task => task.id !== id));
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => 
      (t.id === id ? {...t, checked: !t.checked} 
        : t
      )
      ))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => 
      (t.id === task.id ? {...t, name: task.name} 
        : t
      )
      ))
      closeEditMode();
  }

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocuesEl(document.activeElement);
  }

  return (
    <div className='container'>
      <header>
        <h1>My Task List</h1>
      </header>
      {
        isEditing && 
        (<EditForm 
        editedTask={editedTask}
        updateTask={updateTask}
        closeEditMode={closeEditMode}
        />)
      }
      <CustomForm addTask={addTask}/>
      {tasks && 
      <TasksList 
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        enterEditMode={enterEditMode}
      />}

      <ThemeSwitcher />
    </div>
  )
}

export default App
