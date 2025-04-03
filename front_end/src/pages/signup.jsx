import { MdAlternateEmail } from "react-icons/md"
import { FaUser, FaUserCircle } from "react-icons/fa"
import { GiPadlock } from "react-icons/gi"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'

const Signup = ()=>{
    const navigate = useNavigate()
    if(localStorage.getItem("id") && localStorage.getItem("token")){
        navigate('/')
    }
    const [signupData, setSignupData] = useState({username : "", email : "", password : ""})

    const change = (e)=>{
        const {name, value} = e.target
        setSignupData({...signupData, [name] : value})
    }
    const signupUser = async() =>{
        try {
            if(signupData.username === "" || signupData.email === "" || signupData.password === ""){
                alert("Tous les cases sont requis")
            }else{
                const response = await axios.post("http://localhost:2000/api/v1/signin", signupData)
                setSignupData({username : "", email : "", password : ""})
                alert(response.data.message)
            }

        } catch (error) {
            if(error.response){
                alert(error.response.data.message)
            }else{
                alert("Une erreur est servenue")
            }
        }
    }

    return(
        <div className="w-full h-screen flex flex-col items-center justify-around bg-gradient-to-r from-blue-200 via-blue-300 to-blue-600">
            <h2 className="text-5xl font-semibold text-blue-900 mb-2">Signup</h2>
            <div className="relative w-4/6 md:w-2/6 bg-blue-100 p-6 rounded-2xl h-4/6 flex flex-col items-center justify-end shadow-2xl ">
            <div className="flex w-full bg-white items-center p-2 gap-3 rounded-lg my-2 ">
                <FaUser className="text-xl text-blue-400" />
                <input onChange={change} value={signupData.username} type="text" name="username" placeholder="username" className="w-full focus:outline-none"/>
            </div>
            <div className="flex w-full bg-white items-center p-2 gap-3 rounded-lg my-2 ">
                <MdAlternateEmail className="text-xl text-blue-400" />
                <input onChange={change} value={signupData.email} type="email" name="email" placeholder="email" className="w-full focus:outline-none"/>
            </div>
            <div className="flex w-full bg-white items-center p-2 gap-3 rounded-lg my-2">
                <GiPadlock className="text-xl text-blue-400" />
                <input onChange={change} value={signupData.password} type="password" name="password" placeholder="password" className="w-full focus:outline-none"/>
            </div>
            <FaUserCircle className="absolute top-[-50px] left-[1/6] text-8xl text-blue-400 bg-white border-2 border-white rounded-[50%]" />
            <div className="self-end text-white font-semibold my-7">
                <button className="p-2 h-10 bg-blue-400 rounded-xl w-20 mr-3">
                    <Link to={"/login"}>Login</Link>
                </button>
                <button onClick={signupUser} className="p-2 h-10 bg-blue-400 rounded-xl w-20">Signup</button>
            </div>
            </div>
        </div>
    )
}
export default Signup