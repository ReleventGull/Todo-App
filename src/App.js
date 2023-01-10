import React, {useEffect, useState,} from 'react'
import {Link, Route, Routes, useNavigate  } from 'react-router-dom'
import {Home, Todos, Login, SingleTodo} from './components/index'
import { fetchUserTodos } from './api'
const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [todos, setTodos] = useState([])
    const [user, setUser] = useState([])
    const [featuredTodo, setFeaturedTodo] = useState()
    const [submit, setSubmit] = useState(false)
    
    const navigate = useNavigate()

    async function getUserTodos() {
        const result = await fetchUserTodos({token: token})
        setTodos(result.todos)
        setUser(result.user)
        return result
    }
    useEffect(() => {
        if(!token) {
            setTodos()
            navigate('/login')
        }else {
            navigate('/')
            getUserTodos()
        }
    }, [token, submit])
    
    return (
        <>
        <header>
        <h2>Todo App</h2>
        <nav>
            <Link to='/'>Home</Link>
            
            {token ?
            <>
            <Link to='todos'>MyTodos</Link>
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
        <Route path='todos/:id' element={<SingleTodo token={token}/>}/>
        <Route path='todos' element={<Todos setFeaturedTodo={setFeaturedTodo} token={token} todos={todos} />}/>
       <Route path='login'  element={<Login setToken={setToken}/>}/>
       </Routes>
        </>
       
    )
}



export default App