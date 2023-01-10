import React, {useEffect,} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {default as Todoitem} from './TodoItem'


const Todos = ({todos, token, }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])
    return (

        <div>
            <div className='todo-container'>
        {
            todos.map((todo, index) => 
                <Todoitem viewButton={<Link to={`${todo.id}`}>View</Link>} todo={todo}/>
            )
        }
             </div>
        </div>
    )
}

export default Todos