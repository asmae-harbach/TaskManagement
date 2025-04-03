import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import ImportantTasks from "./pages/ImportantTasks";
import IcompletedTasks from "./pages/IcompletedTasks"
import CompletedTasks from "./pages/CompletedTasks"
import Login from "./pages/login";
import Signup from "./pages/signup";
import { useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import {authActions} from './store/auth'



function App() {
  const isloggedIn = useSelector((state)=>state.auth.isloggedIn)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login())
    }
    else if(!isloggedIn && window.location.pathname!=="/signup" && window.location.pathname!=="/login"){
      navigate("/login")
    }
  })

  return (
    <div>
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route index element={<AllTasks/>}/>
            <Route path="/ImportantTasks" element={<ImportantTasks/>}/>
            <Route path="/CompletedTasks" element={<CompletedTasks/>}/>
            <Route path="/IcompletedTasks" element={<IcompletedTasks/>}/>
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
        </Routes>
    </div>
  );
}

export default App;
