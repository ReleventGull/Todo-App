import React, {useEffect, useState,} from 'react'
import {Link, Route, Routes, useNavigate  } from 'react-router-dom'
import {Home, Todos, Login} from './components/index'
import { fetchAllTodos } from './api'
const App = () => {
    const [todos, setTodos] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const navigate = useNavigate()
    console.log('token here', token)
    useEffect(() => {
        if(!token) {
            navigate('/login')
        }else {
            navigate('/')
        }
    }, [token])
    return (
        <>
        <header>
        <h2>Todo App</h2>
        <nav>
            <Link to='/'>Home</Link>
            <Link to='todos'>Todos</Link>
            {token ?
            <>
            <Link>MyTodos</Link>
            <button onClick={() => {setToken(''), localStorage.removeItem('token')}}>Logout</button>
            </>
            :
            <>
            <Link to='login'>Login</Link>
            <Link>Register</Link>
            </>
            }
        </nav>
       </header>
       <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='todos' element={<Todos todos={todos} />}/>
       <Route path='login'  element={<Login setToken={setToken}/>}/>
       </Routes>
        </>
       
    )
}



export default App