import { useEffect, useState } from "react"
import Cards from "../component/Home/cards"
import axios from "axios"

const IcompletedTasks = ()=>{
    const [taskData, setTaskData] = useState("")

    const headers = {
        id : localStorage.getItem('id'),
        authorisation : `Bearer ${localStorage.getItem('token')}`
    }

    useEffect(()=>{
        const fetch = async() =>{
            try {
                const response = await axios.get('http://localhost:2000/api/v2/get-incomplete-task', {headers})
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
            <h2 className="text-3xl font-semibold text-blue-900 my-6">Icompleted Tasks</h2>            
            <Cards home={false} taskData = {taskData}/>
        </>
    )
}
export default IcompletedTasks