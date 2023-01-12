import React, {useState,} from 'react'
import {Link, Route, Routes,} from 'react-router-dom'
import {Home, Todos, Login, SingleTodo, CreateTodo} from './components/index'
const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    return (
        <>
        <header>
        <h2>Todo App</h2>
        <nav>
            <Link to='/'>Home</Link>
            {token ?
            <>
            <Link to='todos'>MyTodos</Link>
            <Link to='createTodo'>Create Todo</Link>
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
        <Route path='todos' element={<Todos token={token}/>}/>
        <Route path='login'  element={<Login setToken={setToken}/>}/>
        <Route path='createTodo' element={<CreateTodo  token={token}/>} />
       </Routes>
        </>
       
    )
}



export default App