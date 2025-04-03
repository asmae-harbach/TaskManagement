import { useEffect, useState } from "react";
import { FaStopwatch } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete, MdEditCalendar } from "react-icons/md";
import axios from "axios"

const Cards = ({home, setFormDisplay, taskData, setUpdatedTask}) =>{

    const colors = [
        { bg: 'bg-orange-100',bg_button: 'bg-orange-400', text: 'text-orange-600', border: 'border-orange-500' },
        { bg: 'bg-purple-100',bg_button: 'bg-purple-400', text: 'text-purple-600', border: 'border-purple-500' },
        { bg: 'bg-green-100',bg_button: 'bg-green-400', text: 'text-green-600', border: 'border-green-500' },
        { bg: 'bg-pink-100',bg_button: 'bg-pink-400', text: 'text-pink-600', border: 'border-pink-500' }
      ];
    
    const headers = {
        id : localStorage.getItem('id'),
        authorisation : `Bearer ${localStorage.getItem('token')}`
    }
    const importantTask = async(id)=>{
        try {
            await axios.put(`http://localhost:2000/api/v2/update-important/${id}`,{}, {headers})
        } catch (error) {
            if(error.response){
                console.log(error.response.data.message)
            }
        }
    }

    const completeTask = async(id)=>{
        try {
            await axios.put(`http://localhost:2000/api/v2/update-complete/${id}`,{}, {headers})
        } catch (error) {
            if(error.response){
                console.log(error.response.data.message)
            }
        }
    }

    const deleteTask = async(id)=>{
        try {
            await axios.delete(`http://localhost:2000/api/v2/delete-task/${id}`, {headers})
        } catch (error) {
            if(error.response){
                console.log(error.response.data.message)
            }else{
                console.log("Une erreur est survenue")
            }
        }
    }

    const updateForm = (id, title, desc) =>{
        setFormDisplay("fixed")
        setUpdatedTask({id : id,title : title, desc : desc})
    }
    
    return(
        <>
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {taskData && taskData.map((item, i)=>{
                        const color = colors[i % colors.length];
                        return(
                            <div className={`border border-l-4 ${color.border} ${color.bg} p-4 rounded-xl flex flex-col justify-between`}>
                                <div>
                                    <h1 className={`text-xl ${color.text} font-semibold pb-2`}>{item.title}</h1>
                                    <p className={`${color.text}`}>{item.desc}</p>
                                </div>

                                <div className="flex gap-4 items-center mt-4">
                                    <button onClick={()=>completeTask(item._id)} className={`${item.complete ? `${color.bg_button}` : `border ${color.border} hover:bg-white hover:opacity-70 `} p-2 rounded ${color.text} font-semibold w-3/6 `}>
                                    {item.complete ? "Completed" : "In Complete"}
                                    </button>
                                    <div className={`flex justify-around text-xl w-3/6 text-gray-400`}>
                                        <button onClick={()=>importantTask(item._id)}><FaStopwatch className={`${item.important ? 'text-blue-900 ' : 'text-gray-400 hover:text-blue-900'} `} /></button>
                                        {home && (<button onClick={()=>updateForm(item._id,item.title, item.desc)}><MdEditCalendar className={`hover:text-blue-900`} /></button>)}
                                        <button onClick={()=>deleteTask(item._id)}><MdDelete className={`hover:text-blue-900`} /></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {home && (
                <button onClick={()=>setFormDisplay("fixed")} className="flex gap-3 text-gray-400 hover:text-gray-500  items-center justify-center p-2 border-4 border-dashed my-5 w-60 rounded">
                    <div className="text-2xl  my-2"><IoIosAddCircle/></div>
                    <h3 className="text-xl" >Add Task</h3>
                </button>
            )}
        </>

    )
    
}
export default Cards