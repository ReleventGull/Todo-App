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
    }
    
    useEffect(() => {
        if(!token) {
            setTodos()
            navigate('/login')
        }else {
            console.log('i ran')
            getUserTodos()
        }
    }, [])
    
    const handleChange = async(event) => {
    if(event.target.value == 'all'){
        getUserTodos()
    }else if (event.target.value == 'complete') {
        const allTodos = await fetchUserTodos({token: token})
        console.log('All todos here', allTodos)
        setTodos(allTodos.todos.filter(todo => todo.isComplete == true) || [])
     
    }else if (event.target.value == 'incomplete') {
        const allTodos = await fetchUserTodos({token: token})
        setTodos(allTodos.todos.filter(todo => todo.status == 'incomplete') || [])
     }else if (event.target.value == 'overdue') {
        const allTodos = await fetchUserTodos({token: token})
        setTodos(allTodos.todos.filter(todo => todo.status == 'overdue'))
     }
}

    return (
        <div className='todoPage'>
            <div className='filterOptions'>
                <h2>Filter Options</h2>
            <select onChange={handleChange}>
                <option value='all'>All</option>
                <option value='complete'>Complete</option>
                <option value='incomplete'>Incomplete</option>
                <option value='overdue'>Overdue</option>
            </select>
            </div>
            <div className='todo-container'>
            
        {
           !todos? null :  todos.map((todo) => 
                <Todoitem viewButton={<Link to={`${todo.id}`}>View</Link>} todo={todo}/>
            )
        }
             </div>
        </div>
    )
}

export default Todos