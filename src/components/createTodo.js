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
        const dateArray = date.split('-')
        const dates = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const due_date = `${dates[dateArray[1]-1]} ${dateArray[2]}, ${dateArray[0]}`
        const response = await createTodo({
            name: name,
            token: token,
            description: description,
            due_date: due_date
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
                <input value={name} onChange={(event) => setName(event.target.value)}></input>
                <h2>Descirption</h2>
                <textarea value={description} onChange={(event) => setDescription(event.target.value) }></textarea>
                <input min={new Date().toISOString().split("T")[0]} value={date} onChange={(event) => setDate(event.target.value)} type='date'></input>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default CreateTodo