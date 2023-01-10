import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {getSingleTodo} from '../api/index'

const SingleTodo = ({token, todos}) => {
    const [todo, setTodo] = useState([[]])
    const [addNote, setAddNote] = useState(false)
    const [updateTodo, setUpdateTodo] = useState('')
    const [noteDescription, setNoteDescription] = useState('')
    
    const {id} = useParams()

    const [foundTodo] = todos.filter(todo => todo.id == id)
        
    return (
        foundTodo ? 
       <div className='singlePage'>
         <div className='sinlgeBox'>
            <div>
                <h3>{foundTodo.name}</h3>
                <h2>{foundTodo.description}</h2>
                <div>{foundTodo.due_date}</div>
                <button onClick={() => setAddNote(value => !value)}>{addNote ? 'Cancel' : 'Add Note'}</button>
            </div>
            {addNote 
            ? 
            <form>
                <h2>Description</h2>
                <input></input>
                <button value={noteDescription} onChnage={(event) => setNoteDescription(event.target.value)}>Add</button>
            </form>
            :null}
         </div>
      </div>
        :
        <div>Loading</div>
    )
}

export default SingleTodo