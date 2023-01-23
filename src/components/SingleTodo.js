import React, {useEffect, useState} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import {getSingleTodo, createNote, updatedTodo, deleteTodo} from '../api/index'
import {default as NoteItem} from './NoteItem'

const SingleTodo = ({token}) => {
    const [todo, setTodo] = useState({})
    const [addNote, setAddNote] = useState(false)
    const [noteDescription, setNoteDescription] = useState('')
    
    const [isEditing, setIsEditing] = useState(false)
    const [currentDesc, setCurrentDesc] = useState(todo.description)
    const [currentName, setCurrentName] = useState(todo.name)
    const [currentDate, setCurrentDate] = useState(todo.due_date)
    const navigate = useNavigate()
  
   
    const {id} = useParams()
    const fetchSingleTodo = async() => {
        const singleTodo = await getSingleTodo({id: id, token, token})
        const arrayDate = singleTodo.dateString.split(' ')
        const months = {
            January: '01',
            February: '02',
            March: '03',
            April: '04',
            May: '05',
            June: '06',
            July: '07',
            August: '08',
            September: '09',
            October: '10',
            November: '11',
            December: '12'
        }
        // console.log(`Right Here: ${arrayDate[arrayDate.length-1]}-${months[arrayDate[0]]}-${arrayDate[1]}`)
        setCurrentDate(`${arrayDate[arrayDate.length-1]}-${months[arrayDate[0]]}-${arrayDate[1]}`)
        setCurrentDesc(singleTodo.description)
        setCurrentName(singleTodo.name)
       
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
    const handleSubmit = async(event) => {
            const response = await updatedTodo({token:token, isComplete: event.target.value, todoId:todo.id, name: currentName, description:currentDesc, due_date: currentDate})
            if (response.error) {
                return
            }else {
                fetchSingleTodo()
            }
        
    }
    const handleDelete = async() => {
        const response = await deleteTodo({token: token, id: todo.id})
        if(response.error) {
            return
        }else {
            navigate('/todos')
        }
    }
 
    return (
     
        todo ? 
        isEditing ? 
        <div className='editContainer'>
            <form onSubmit={handleSubmit} className='createForm'>
                <h2>Edit Todo</h2>
                <input  required className='nameTodo' value={currentName} onChange={(event) => setCurrentName(event.target.value)}></input>
                <h2>Description</h2>
                <textarea required maxLength='150' value={currentDesc} onChange={(event) => setCurrentDesc(event.target.value) }></textarea>
                <input required className='calendar' min={new Date().toISOString().split("T")[0]} value={currentDate} onChange={(event) => setCurrentDate(event.target.value)} type='date'></input>
                <button type='submit'>Submit</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </form>

        </div>
        :
       <div className='singlePage'>
         <div className='sinlgeBox'>
            <div className='todoBox'>
               <div className='details-single'>
                <h1>{todo.name}</h1>
                    <div className='dropDown'>
                        
                        <div className='dropdown-menu'>
                            <button value={false} onClick={handleSubmit}>Mark As Incomplete</button>
                            <button value={true} onClick={handleSubmit}>Mark As Complete</button>
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                            <button  onClick={handleDelete}className='deleteTodoButton'>Delete</button>
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