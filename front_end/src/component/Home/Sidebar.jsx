import { BiTask, BiTaskX } from "react-icons/bi"
import { BsListTask } from "react-icons/bs"
import { FaStopwatch } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import {authActions} from '../../store/auth'
import { useEffect, useState } from "react"
import axios from "axios"

const Sidebar = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutUser = ()=>{
        dispatch(authActions.logout())
        localStorage.removeItem("id")
        localStorage.removeItem("token")
        navigate('/login')
    }

    const data = [
        {title : "All", icon : <BsListTask />, link : "/"},
        {title : "Important", icon : <FaStopwatch />, link : "/ImportantTasks"},
        {title : "Completed", icon :<BiTask />, link : "/CompletedTasks"},
        {title : "Incomplete", icon :<BiTaskX />, link : "/IcompletedTasks"},

    ]

    const headers = {
        id : localStorage.getItem("id"),
        authorisation : `Bearer ${localStorage.getItem("token")}` 
    }
    const [userData, setUserData] = useState({username : "", email : ""})
    useEffect(()=>{
        const getData = async()=>{
            try {
                const response = await axios.get("http://localhost:2000/api/v2/get-all-tasks", {headers})
                setUserData({username : response.data.data.username, email : response.data.data.email})
                
            } catch (error) {
                if(error.response){
                    console.log(error.response.data.message)
                }
            }

        }
        getData()
    })

    return(
        <>
            <div>
                <h2 className="text-2xl font-semibold text-blue-900 mb-2">{userData.username}</h2>
                <h3 className="text-md text-gray-600 mb-2">{userData.email}</h3>
                <hr />
            </div>
            {data.map(task=>{
                return(
                    <div className="text-gray-500 w-28 flex flex-col items-center h-20 justify-center rounded-xl hover:shadow-xl hover:text-blue-900">
                        <Link to={task.link} className="flex flex-col items-center">
                            <div className="font-semibold text-2xl mb-2">{task.icon}</div>
                            <div className="font-semibold">{task.title}</div>
                        </Link>
                    </div>
                )

            })}
            <button onClick={logoutUser} className="w-full py-2 bg-blue-900 text-white rounded-md">
                Logout
            </button>
        </>

    )
}
export default Sidebar