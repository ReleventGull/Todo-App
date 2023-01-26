import React, {useEffect, useState,} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {default as Todoitem} from './TodoItem'
import { fetchUserTodos } from '../api'

import viewButton from './images/view.png'
 
const Todos = ({ token }) => {
    const [todos, setTodos] = useState([])
    const [featuredTodos, setFeaturedTodos] = useState([])
    const [all, setAll] = useState('')
    const [complete, setComplete] = useState('')
    const [incomplete, setIncomplete] = useState('')
    const [overdue, setOverdue] = useState('')
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])
  
    async function getUserTodos() {
        const result = await fetchUserTodos({token: token})
        setFeaturedTodos(result)
        setTodos(result)
    }
    async function setValues () {
        const todos = await fetchUserTodos({token: token})
        setAll(String(todos.length))
        setComplete(String(todos.filter(todo => todo.status=='complete').length))
        setIncomplete(String(todos.filter(todo => todo.status=='incomplete').length))
        setOverdue(String(todos.filter(todo => todo.status=='overdue').length))
    }
    
    useEffect(() => {
        if(!token) {
            setTodos()
            navigate('/login')
        }else {
            console.log('i ran')
            getUserTodos()
            setValues()
        }
    }, [])
    
    const handleChange = async(string) => {
    if(string == 'all'){
        getUserTodos()
    }else if (string == 'complete') {
        const todos = await fetchUserTodos({token: token})
        setTodos(todos.filter(todo => todo.isComplete == true) || [])
        setFeaturedTodos(todos.filter(todo => todo.isComplete == true) || [])
     
    }else if (string == 'incomplete') {
        const todos = await fetchUserTodos({token: token})
        setTodos(todos.filter(todo => todo.status == 'incomplete') || [])
        setFeaturedTodos(todos.filter(todo => todo.status == 'incomplete') || [])
     }else if (string == 'overdue') {
        const allTodos = await fetchUserTodos({token: token})
        setTodos(todos.filter(todo => todo.status == 'overdue'))
        setFeaturedTodos(todos.filter(todo => todo.status == 'overdue'))
     }
     setValues()
}
const handleSearch = (e) => {
    const filteredTodos = todos.filter(todo => 
        todo.name.toLowerCase().includes(e.target.value.toLowerCase())
        ||
        todo.description.toLowerCase().includes(e.target.value.toLowerCase())
       )
       setFeaturedTodos(filteredTodos)
    
}
    return (
        <div className='todoPage'>
            <header className='filterHeader'>
                <div className='search-container-box'>
                <input onChange={handleSearch}placeholder='Search for A Todo'></input>
                    </div>
                        <div className='menu-drop'>
                            Search By
                        <ul className='dropBoxMenu'>
                            <li onClick={() => handleChange('all')} value='all'>All {all}</li>
                            <li onClick={() => handleChange('complete')} value='complete'>Complete {complete}</li>
                            <li onClick={() => handleChange('incomplete')}value='incomplete'>Incomplete {incomplete}</li>
                            <li onClick={() => handleChange('overdue')}value='overdue'>Overdue {overdue}</li>
                        </ul>
                    </div> 
            </header>
            <div className='todo-container'>
        {
           !featuredTodos? null :  featuredTodos.map((todo) => 
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