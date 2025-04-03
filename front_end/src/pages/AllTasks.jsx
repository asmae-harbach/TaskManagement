import { IoIosAdd } from "react-icons/io"
import Cards from "../component/Home/cards"
import FormTask from "../component/Home/formTask"
import { useEffect, useState } from "react"
import axios from "axios"

const AllTasks = ()=>{
    const [formdisplay, setFormDisplay] = useState("hidden")
    const [updatedTask, setUpdatedTask] = useState({id:"",title : "", desc : ""})
    const headers = {
            id : localStorage.getItem("id"),
            authorisation : `Bearer ${localStorage.getItem("token")}` ,
    }
    const [taskData, setTaskData] = useState("")
    useEffect(()=>{
        const getTasks = async() =>{
            try {
                const response = await axios.get('http://localhost:2000/api/v2/get-all-tasks', {headers})
                setTaskData(response.data.data.tasks)
            } catch (error) {
                if(error.response){
                    console.log(error.response.data.message)
                }else{
                    console.log("Une erreur est servenue")
                }
            }

        }
        getTasks()
    })
    return(
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-blue-900 my-6">All Tasks</h2>
                <div onClick={()=>{setFormDisplay("fixed")}} className="flex items-center gap-1 px-4 py-2 rounded-3xl bg-blue-900 text-white">
                    <IoIosAdd className="text-2xl" />
                    <button>New Task</button>
                </div>
            </div>
            <Cards home={true} setFormDisplay={setFormDisplay} taskData = {taskData} setUpdatedTask = {setUpdatedTask} />
            <FormTask formdisplay={formdisplay} setFormDisplay={setFormDisplay} updatedTask = {updatedTask} setUpdatedTask = {setUpdatedTask}/>
        </>
    )
}
export default AllTasks