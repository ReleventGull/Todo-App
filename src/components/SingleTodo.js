import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {getSingleTodo, createNote, completeTodo} from '../api/index'

import {default as NoteItem} from './NoteItem'
import trashcan from './images/trashcan.png'

const SingleTodo = ({token}) => {
    const [todo, setTodo] = useState({})
    const [addNote, setAddNote] = useState(false)
    const [noteDescription, setNoteDescription] = useState('')
    
  
   
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
               <div className='details-single'>
                <h1>{todo.name}</h1>
                    <div className='dropDown'>
                        
                        <div className='dropdown-menu'>
                            <button>Mark As Incomplete</button>
                            <button onClick={async() => 
                            {
                                const response = await completeTodo({token:token, isComplete: true, todoId:todo.id})
                                if (response.error) {
                                    return
                                }else {
                                    fetchSingleTodo()
                                }
                            }}
                                
                            >Mark As Complete</button>
                            <button>Edit</button>
                            <button className='deleteTodoButton'>Delete</button>
                        </div>
                    </div>
                </div>
                
                <h3>{todo.description}</h3>
                <h2 >Due Date:</h2>
                <div className={`due_date ${todo.status}`}>{todo.due_date}</div>
                <button className='add-note-button' onClick={() => setAddNote(value => !value)}>{addNote ? 'Cancel' : 'Add Note'}</button>
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
            {!todo.notes ? null: todo.notes.map((note, index) =>
                <NoteItem 
                todo={todo}
                index={index} 
                note={note}
                token={token}
                fetchSingleTodo={fetchSingleTodo}
                >
                </NoteItem>
                )}
            </div>
      </div>
        :
        <div>Loading</div>
    )
}

export default SingleTodo