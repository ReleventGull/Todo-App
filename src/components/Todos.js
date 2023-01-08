import React from 'react'
import {default as Todoitem} from './TodoItem'

const Todos = ({todos}) => {
    return (
        <div>
            <div className='todo-container'>
        {
            todos.map((todo, index) => 
                <Todoitem viewButton={<button>View</button>} todo={todo}/>
            )
        }
             </div>
        </div>
    )
}

export default Todos