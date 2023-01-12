import React, {useEffect, useState,} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {default as Todoitem} from './TodoItem'
import { fetchUserTodos } from '../api'

const Todos = ({ token }) => {
    const [todos, setTodos] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    async function getUserTodos() {
        const result = await fetchUserTodos({token: token})
        setTodos(result.todos)
        console.log('Here they are', todos)
    }
    useEffect(() => {
        if(!token) {
            setTodos()
            navigate('/login')
        }else {
            console.log('i ran')
            getUserTodos()
        }
    }, [token])


    return (
        <div>
            <div className='todo-container'>
        {
            todos.map((todo) => 
                <Todoitem viewButton={<Link to={`${todo.id}`}>View</Link>} todo={todo}/>
            )
        }
             </div>
        </div>
    )
}

export default Todos