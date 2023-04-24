import { CheckIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
export const EditForm = ({editedTask, updateTask,closeEditmode}) => {

    const [updateTaskName, setUpdatedTaskName]= 
    useState(editedTask.name);
    
    useEffect(() =>{

        const closeModalIfEscaped = (e) => {
            e.key === "Escape" && closeEditmode();
        }
        window.addEventListener('keydown', closeModalIfEscaped)

        return ()=> {
             window.removeEventListener('keydown', closeModalIfEscaped)
            
        }
    },[])

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        updateTask({...editedTask, name:updateTaskName})
        
    }
  return (
    <div role='dialog' aria-aria-labelledby='editTask'
    onClick={(e)=> {e.target === e.currentTarget && closeEditmode()}}
    >
    <form className="todo"
    onSubmit={handleFormSubmit}>
        {/* <p>{task}</p> */}
        <div className="wrapper">
            <input type="text"
            id="editTask"
            className="input"
            value={updateTaskName}
            onInput={(e)=> setUpdatedTaskName(e.target.value)}
            required
            autoFocus
            maxLength={60}
            placeholder="Update task"
            />
            <label htmlFor="editTask" className="label">Update Task</label>
        </div>
        <button className="btn"
        aria-label={`Confirm edited task to now
        read ${updateTaskName}`}
        type="submit">
            <CheckIcon strokeWidth={2}  height={24} 
            width={24} />
        </button>
    </form>
    </div>
  )
}

export default EditForm
