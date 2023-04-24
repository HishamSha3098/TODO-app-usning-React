// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

//custom compentants import
import CustomForm from './components/CustomForm';
import EditForm from './components/EditForm';

import TaskList from './components/TaskList';
import useLocalStorage from './hooks/useLocalStorage';


function App(){
  const [tasks, setTask]=useLocalStorage('react-todo.tasks',[]);
  const [PreviousFocusEl, setPreviousFocusEl]=useState(null);

  const [editedTask, setEditedTask]=useState(null);
  const [isEditing, setEditing]=useState(false);


  const addTask = (task)=>{
    setTask(prevState=>[...prevState, task])
  }

  const deleteTask = (id) => {
    setTask(prevState => prevState.filter(t=>t.id !== id));
  }

  const toggleTask = (id) => {
    setTask(prevState => prevState.map(t => (t.id === id 
      ? {...t, checked: !t.checked}: t )))
  }
  const updateTask = (task) => {
    setTask(prevState => prevState.map(t => (t.id === task.id 
      ? {...t, name: task.name}: t )))
  
      closeEditMode();
  }

  const closeEditMode = () => {
    setEditing(false);
    PreviousFocusEl.focus();
  }

  const enterEditMode = (task) =>{
    setEditedTask(task);
    setEditing(true);
    setPreviousFocusEl(document.activeElement);
  }

return(
  <div className='container'>
    <header>
      <h1>My Task List</h1>
    </header>
    {
      isEditing && (
        <EditForm 
      editedTask={editedTask}
      updateTask={updateTask}
      closeEditmode={closeEditMode}
      />
      )
      
    }
    
    <CustomForm addTask={addTask}/>
    {tasks && (
    <TaskList 
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask} 
        enterEditMode={enterEditMode}
        />
      )}
  </div>
)
}

export default App
  
