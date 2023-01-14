import React, {useEffect, useState,} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {default as Todoitem} from './TodoItem'
import { fetchUserTodos } from '../api'

import viewButton from './images/view.png'
 
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
    
    const handleChange = async(string) => {
    if(string == 'all'){
        getUserTodos()
    }else if (string == 'complete') {
        const allTodos = await fetchUserTodos({token: token})
        console.log('All todos here', allTodos)
        setTodos(allTodos.todos.filter(todo => todo.isComplete == true) || [])
     
    }else if (string == 'incomplete') {
        const allTodos = await fetchUserTodos({token: token})
        setTodos(allTodos.todos.filter(todo => todo.status == 'incomplete') || [])
     }else if (string == 'overdue') {
        const allTodos = await fetchUserTodos({token: token})
        setTodos(allTodos.todos.filter(todo => todo.status == 'overdue'))
     }
}

    return (
        
        <div className='todoPage'>
            <header className='filterHeader'>
                <div className='search-container-box'>
                <input placeholder='Search for A Todo'></input>
                    </div>
                        <div className='menu-drop'>
                            Search By
                        <ul >
                            <li onClick={() => handleChange('all')} value='all'>All</li>
                            <li onClick={() => handleChange('complete')} value='complete'>Complete</li>
                            <li onClick={() => handleChange('incomplete')}value='incomplete'>Incomplete</li>
                            <li onClick={() => handleChange('overdue')}value='overdue'>Overdue</li>
                        </ul>
                    </div> 
            </header>
            <div className='todo-container'>
        {
           !todos? null :  todos.map((todo) => 
                <Todoitem 
                viewButton={<Link className='todo-icons' to={`${todo.id}`}><img src={viewButton}/></Link>} todo={todo}>
              
                </Todoitem >
            )
        }
             </div>
        </div>
    )
}

export default Todos