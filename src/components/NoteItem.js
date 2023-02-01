import React, {useState} from 'react'
import { deleteNote } from '../api'


const NoteItem = ({note, index, todo, token, fetchSingleTodo}) => {
   
   
    const handleDelete = async() => {
    const response = await deleteNote({token: token, noteId: note.id, todoId: todo.id})
    fetchSingleTodo()
}
    return (
        <div className='singleNote'>
            <div className='space-icons'>
            <p>{`${index + 1}.`}</p>
            <details placeholder='' class='delete-note-drop-down'>
               <summary></summary>
               <div onClick={handleDelete}>
                    <p >Delete</p>
               </div>
            </details>
            </div>
            <h2>{note.description}</h2>
        </div>
    )
}


export default NoteItem