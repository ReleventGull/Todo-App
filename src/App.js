import React, {useEffect, useState,} from 'react'
import {Link, Route, Routes, useNavigate} from 'react-router-dom'
import {Home, Todos, Login, SingleTodo, CreateTodo, NavBar} from './components/index'

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    
 
    useEffect(() => {
        token ? null : navigate('/login')
    }, [])
    
    return (

        <>
              
        <Routes>
            <Route path='login'  element={<Login setToken={setToken}/>}/>
            <Route path='/*' element={<NavBar />}> 
                <Route path='home' element={<Home  token={token} />}/> 
                <Route path='todos/:id' element={<SingleTodo token={token}/>}/>
                <Route path='todos' element={<Todos token={token}/>}/>
                <Route path='createTodo' element={<CreateTodo  token={token}/>} />
            </Route>
            
        </Routes>
    </>
       
    )
}



export default App