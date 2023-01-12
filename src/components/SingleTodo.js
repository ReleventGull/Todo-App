import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {getSingleTodo, createNote} from '../api/index'

const SingleTodo = ({token, todos}) => {
    const [todo, setTodo] = useState({})
    const [addNote, setAddNote] = useState(false)
    const [noteDescription, setNoteDescription] = useState('')
    
    const {id} = useParams()
    
    const fetchSingleTodo = async() => {
        console.log('Req param')
        const singleTodo = await getSingleTodo({id: id, token, token})
        setTodo(singleTodo)
    }
    
    useEffect(() => {
        fetchSingleTodo()
    }, [])
    
    const handleNoteSubmit = async(event) => {
        console.log("I was submitted")
        event.preventDefault()
        const response = await createNote({id: todo.id, token: token, description: noteDescription})
        console.log(response)
    }
    return (
        todo ? 
       <div className='singlePage'>
         <div className='sinlgeBox'>
            <div>
                <h3>{todo.name}</h3>
                <h2>{todo.description}</h2>
                <div>{todo.due_date}</div>
                <button onClick={() => setAddNote(value => !value)}>{addNote ? 'Cancel' : 'Add Note'}</button>
            </div>
            {addNote 
            ? 
            <form onSubmit={handleNoteSubmit}>
                <h2>Description</h2>
                <input  value={noteDescription} onChange={(event) => setNoteDescription(event.target.value)}></input>
                <button type='submit'>Add</button>
            </form>
            :null}
         </div>
      </div>
        :
        <div>Loading</div>
    )
}

export default SingleTodo