import axios from "axios"
import Cards from "../component/Home/cards"
import { useEffect, useState } from "react"

const CompletedTasks = ()=>{
    const [taskData, setTaskData] = useState("")

    const headers = {
        id : localStorage.getItem('id'),
        authorisation : `Bearer ${localStorage.getItem('token')}`
    }

    useEffect(()=>{
        const fetch = async() =>{
            try {
                const response = await axios.get('http://localhost:2000/api/v2/get-complete-task', {headers})
                setTaskData(response.data.data)
            } catch (error) {
                if(error.response){
                    console.log(error)
                }else{
                    console.log("Une erreur est survenue")
                }
            }
        }
        fetch()
    })
    return(
        <>
            <h2 className="text-3xl font-semibold text-blue-900 my-6">Completed Tasks</h2>
            <Cards home={false} taskData = {taskData}/>
        </>
    )
}
export default CompletedTasks