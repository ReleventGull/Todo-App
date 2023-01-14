import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {getSingleTodo, createNote} from '../api/index'
import {default as NoteItem} from './NoteItem'
import trashcan from './images/trashcan.png'

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
                <h1>{todo.name}</h1>
                <h3>{todo.description}</h3>
                <h2>Due Date:</h2>
                <div>{todo.due_date}</div>
                <button className='add-note-button' onClick={() => setAddNote(value => !value)}>{addNote ? 'Cancel' : 'Add Note'}</button>
                <img onClick={() => console.log("I was clicked at", todo.id)}
                className='delete-icon' src={trashcan}/>
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
            {/* <div className='noteContainer'>
            {!todo.notes ? null: todo.notes.map((note, index) =>
                <NoteItem index={index} note={note}/>
                )}
            </div> */}
      </div>
        :
        <div>Loading</div>
    )
}

export default SingleTodo