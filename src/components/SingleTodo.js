import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import {getSingleTodo} from '../api/index'

const SingleTodo = ({token}) => {
    const [todo, setTodo] = useState([[]])
    const {id} = useParams()
    
    const findTodo = async() => {
        const foundTodo =  await getSingleTodo({id: id, token:token})
        console.log('tHE TODO IS HERE', foundTodo)
        setTodo(foundTodo)
    }
    

    useEffect(() => {
       findTodo()
    }, [])
 

    return (
        todo ? 
        <>
        <h2>{todo.description}</h2>
        <div>Bruh</div>
        </>
        :
        <div>Loading</div>
    )
}

export default SingleTodo