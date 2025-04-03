import axios from "axios"
import { useEffect, useState } from "react"
import { IoIosClose } from "react-icons/io"

const FormTask = ({formdisplay, setFormDisplay, updatedTask, setUpdatedTask}) =>{
    const [newTask, setNewTask] = useState({title : "", desc : ""})
    const change = (e)=>{
        const {name, value} = e.target
        setNewTask({...newTask, [name] : value})
    }
    const headers = {
        id : localStorage.getItem("id"),
        authorisation : `Bearer ${localStorage.getItem("token")}` ,
    }
    const addTask = async() =>{
        try {
            if(newTask.title === "" || newTask.desc === ""){
                alert('Tous les cases sont requis')
            }
            await axios.post('http://localhost:2000/api/v2/create-task', newTask, {headers})
            setFormDisplay("hidden")
            setNewTask({title : "", desc : ""})

        } catch (error) {
            if(error.response){
                console.log(error.response.data.message)
            }
        }
    }
    useEffect(()=>{
        setNewTask({title : updatedTask.title, desc : updatedTask.desc})
    }, [updatedTask])

    const updateTask = async(id)=>{
        try {
            await axios.put(`http://localhost:2000/api/v2/update-tasks/${id}`, newTask, {headers})
            setNewTask({title : "", desc : ""})
            setFormDisplay("hidden")
        } catch (error) {
            if(error.response){
                console.log(error.response.data.message)
            }else{
                console.log("Une erreur est survenue")
            }
        }
    }
    return(
        <>
            <div className={`${formdisplay} top-0 left-0 w-full h-screen flex items-center justify-center bg-white opacity-70`}></div>
            <div className={`${formdisplay} top-0 left-0 w-full h-screen flex items-center justify-center`}>
                <div className="bg-white w-4/6 md:w-2/6 rounded-xl p-4 shadow-xl">
                    <div className="flex justify-end w-full">
                        <button onClick={()=>{setFormDisplay("hidden"); setNewTask({title : "", desc : ""}); setUpdatedTask({title : "", desc : ""})}}>
                            <IoIosClose className="text-4xl text-blue-900 font-extrabold" />
                        </button>
                    </div>
                    <h2 className="my-2 text-blue-900 text-2xl font-semibold">Add Task</h2>
                    <input onChange={change} value={newTask.title} type="text" placeholder="Title" name="title" className="w-full p-2 rounded border bg-gray-100" />
                    <textarea onChange={change} value={newTask.desc} name="desc" cols="30" rows="10" placeholder="Description ..." className="w-full p-2 rounded border bg-gray-100 my-4"></textarea>
                    {updatedTask.title
                        ? <button onClick={()=>updateTask(updatedTask.id)} className="w-full py-2 bg-blue-900 text-white rounded-md">Update</button>
                        :<button onClick={addTask} className="w-full py-2 bg-blue-900 text-white rounded-md">Add</button>
                    }
                    
                    
                </div>
            </div>
        </>
    )
}
export default FormTask