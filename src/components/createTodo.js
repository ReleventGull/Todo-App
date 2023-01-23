import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {createTodo} from '../api/index'

const CreateTodo = ({token}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    
    if(!token) {
    navigate('login')
    }

    const handleSubmit = async(event) => {
        event.preventDefault()
        const response = await createTodo({
            name: name,
            token: token,
            description: description,
            due_date: date
        })
        if(response.error) {
            setErrorMessage(response.error)
        }else {
            navigate('/todos')
        }
    }
    return (
        <div className='createPage'>
            <form onSubmit={handleSubmit} className='createForm'>
                <h2>Name</h2>
                <input  required class='nameTodo' value={name} onChange={(event) => setName(event.target.value)}></input>
                <h2>Description</h2>
                <textarea required maxlength='150' value={description} onChange={(event) => setDescription(event.target.value) }></textarea>
                <input required className='calendar' min={new Date().toISOString().split("T")[0]} value={date} onChange={(event) => setDate(event.target.value)} type='date'></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateTodo