import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {loginUser, registerUser} from '../api/index'







const Login = ({setToken}) => {
    const [currentAction, setCurrentAction] = useState('login')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    
    const handleLogin = async(event) => {
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
        navigate('/')
    }
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        console.log(password)
        if(password !== password2) {
            setErrorMessage('Paswords do not match!')
        }
        const response = await registerUser({username : username, password: password})
       console.log(response)
        if (response.error) {
            setErrorMessage(response.message)
        }else {
            setErrorMessage('')
            setToken(response.token)
            localStorage.setItem('token', response.token)
            navigate('/')
        }
       
    }


    return (
        currentAction == 'login' ?
        <div className='login-page'>
            <h2>Signup</h2>
            <form onSubmit={handleLogin} className='login-form'>
                <h2>Username</h2>
                <input type='username' value={username} onChange={(event) => setUsername(event.target.value)}/>
                <h2>Password</h2>
                <input type='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
            <button typer='Submit'>Login!</button>
            </form> 
            <h3>Don't have an account?</h3>
            <button onClick={() => setCurrentAction('register')}>Register Here!</button>
            <h3>{errorMessage}</h3>
        </div>
        :
        <div className='login-page'>
            <h2>Signup</h2>
            <form onSubmit={handleRegister} className='login-form'>
                <h2>Username</h2>
                <input type='username' required value={username} onChange={(event) => setUsername(event.target.value)}/>
                <h2>Password</h2>
                <input type='password' required value={password} onChange={(event) => setPassword(event.target.value)}/>
                <h2>Confirm Password</h2>
                <input type='password' required value={password2} onChange={(event) => setPassword2(event.target.value)}/>
                <button type='Submit'>Register!</button>
                <h3>{errorMessage}</h3>
                <h3>Already have an account?</h3>
                <button onClick={() => setCurrentAction('login')}>Login Here!</button>
                
            </form> 
           
        </div>

    )
}

export default Login