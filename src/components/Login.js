import React, {useState} from 'react'
import {loginUser} from '../api/index'







const Login = ({setToken}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
   const [errorMessage, setErrorMessage] = useState('')
    const handleSubmit = async(event) => {
    event.preventDefault()
    const response = await loginUser({
        username: username,
        password: password
    })
    if(response.error) {
        setErrorMessage(response.message)
    }else {
        setErrorMessage('')
        localStorage.setItem('token', response.token)
        setToken(response.token)
    }
    }
    return (
        <div className='login-page'>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit} className='login-form'>
                <h2>Username</h2>
                <input type='username' value={username} onChange={(event) => setUsername(event.target.value)}/>
                <h2>Password</h2>
                <input type='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
            <button typer='Submit'>Login!</button>
            </form> 
            <h3>{errorMessage}</h3>
        </div>
    )
}

export default Login