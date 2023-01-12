import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {getSingleTodo, createNote} from '../api/index'
import {default as NoteItem} from './NoteItem'

const SingleTodo = ({token, todos}) => {
    const [todo, setTodo] = useState({})
    const [addNote, setAddNote] = useState(false)
    const [noteDescription, setNoteDescription] = useState('')
    console.log('The notes here',todo.notes)
    const {id} = useParams()
    
    const fetchSingleTodo = async() => {
        const singleTodo = await getSingleTodo({id: id, token, token})
        setTodo(singleTodo)
    }
    
    useEffect(() => {
        fetchSingleTodo()
    }, [])
    
    const handleNoteSubmit = async(event) => {
        event.preventDefault()
        const response = await createNote({id: todo.id, token: token, description: noteDescription})
        if(response.error) {
            console.log("There was an error")
        }else {
            fetchSingleTodo()
        }
    }
    return (
        todo ? 
       <div className='singlePage'>
         <div className='sinlgeBox'>
            <div className='todoBox'>
                <h3>{todo.name}</h3>
                <h2>{todo.description}</h2>
                <div>{todo.due_date}</div>
                <button onClick={() => setAddNote(value => !value)}>{addNote ? 'Cancel' : 'Add Note'}</button>
            </div>
            {addNote 
            ? 
            <form className='noteForm' onSubmit={handleNoteSubmit}>
                <h2>Description</h2>
                <input  value={noteDescription} onChange={(event) => setNoteDescription(event.target.value)}></input>
                <button type='submit'>Add</button>
            </form>
            :null}
         </div>
            <div className='noteContainer'>
            {!todo.notes ? null: todo.notes.map(note =>
                <NoteItem note={note}/>
                )}
            </div>
      </div>
        :
        <div>Loading</div>
    )
}

export default SingleTodo