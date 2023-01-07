import React, {useEffect, useState} from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import {Home} from './components/index'
import { fetchAllTodos } from './api'
const App = () => {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        async function getAllTdoso () {
            const todos = await fetchAllTodos()
            console.log(todos)
            setTodos(todos)
        }
        getAllTdoso()
    }, [])
    return (
        <>
       <header>
        <h2>Todo App</h2>
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/todos'>Todos</Link>
        </nav>
       </header>
       <Routes>
        <Route path='/' element={<Home />}/>
       </Routes>
       </>
    )
}



export default App