import React from 'react'
import { useState , useEffect} from 'react';
import Task from './Task';

const Home = () => {

    const stored_data = localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[];
    const [tasks,setTasks] = useState(stored_data);
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");

    console.log(title,description)

    const submitHandler = (e) =>{
        e.preventDefault();
        setTasks([...tasks,{title:title,description:description}])
        setTitle("");
        setDescription("");
        // localStorage.setItem("tasks",JSON.stringify(tasks));
    }

    const deleteTask = (index) =>{
       const filteredArr = tasks.filter((val,i)=>{
        return i!==index;
       })
       console.log(filteredArr);
       setTasks(filteredArr)
    }
    
    useEffect(()=>{
        localStorage.setItem("tasks",JSON.stringify(tasks));
    },[tasks])

  return (
    <>
        <header><h1>Daily Tasks</h1></header>
        <div className="container">
         
         <form onSubmit={submitHandler}>
         <input placeholder = "Enter Tittle Here" type="text" required
          value = {title}  onChange = {(e) =>setTitle(e.target.value)}/>

         <textarea placeholder='enter description here' 
         value = {description} onChange = {(e)=>setDescription(e.target.value)}></textarea>

          <button className='addbtn'>Add Task</button>
          </form>

         {/* now we will traverse the map array and render its every element */}

          {
          tasks.map((item,index) => { 
             return <Task
             key = {index} 
             title = {item.title} 
             description={item.description }
             deleteTask={deleteTask}
             index = {index}
              /> 
            })
          }

        </div>

    </>
  );

}

export default Home