import React from 'react'




const Todoitem = ({todo, viewButton}) => {
    return (
       <div key={todo.id} className='todoCard'>
            <h1>{todo.name}</h1>
            <h2>{todo.description}</h2>
            <h3>{todo.due_date}</h3>
            {viewButton}
       </div>
    )
}


export default Todoitem