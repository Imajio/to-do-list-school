import React,{useState,useEffect} from 'react';
import { FaArrowCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";

export default function ToDoList() {

    const [tasks, setTasks] = useState(() => {
        //on page load , load all ls tasks
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");

    //useEffect listens of 'tasks' array, and changes ls, when array changes 
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function handleInputChange(event){
        setNewTask(event.target.value);
    }
    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(t => [...t, newTask]);
            setNewTask("");
        }
    }
    function deleteTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }
    function moveTaskUp(index){
        if(index>0){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index-1]] = [updatedTasks[index-1],updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    function moveTaskDown(index){
        if(index<tasks.length-1){
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index+1]] = [updatedTasks[index+1],updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    function handlerEnter(event){if(event.key === "Enter"){addTask();}}
    return (
        <div className='to-do-list'>
            <h1>To Do List</h1>

            <div className='input-div'>
                <input className='inputt' type='text' placeholder='Enter a task...' value={newTask} onChange={handleInputChange} onKeyDown={handlerEnter}/>
                <button className='add-button' onClick={addTask}>Add</button>
            </div>

            <ol>
                {tasks.map((task, index) =>
                    <li key={index}>
                        <span className='text'>{task}</span>
                        <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
                        <button className='move-button' onClick={() => moveTaskUp(index)}><FaArrowCircleUp/></button>
                        <button className='move-button' onClick={() => moveTaskDown(index)}><FaArrowCircleDown/></button>
                    </li>
                )}
            </ol>
        </div>
    );
}