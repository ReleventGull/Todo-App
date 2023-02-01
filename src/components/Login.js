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
        navigate('/todos')
    }
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        if(password !== password2) {
            setErrorMessage('Paswords do not match!')
        }
        const response = await registerUser({username : username, password: password})
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
        <div className='login-page'>
            <form onSubmit={ currentAction =='register' ? handleRegister : handleLogin} className='login-form'>
            <h1>Welcome</h1>
                <div className='input-forms'>
                <label>Username</label>
                <input type='username' required value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
                
                <div className='input-forms'>
                <label>Password</label>
                <input type='password' required value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
               
               {currentAction == 'register' ? 
                <div className='input-forms'>
                <label>Confirm Password</label>
                <input type='password' required value={password2} onChange={(event) => setPassword2(event.target.value)}/>
                </div>
                : 
                null
                }
               
                
                <button type='Submit'>{currentAction == 'register' ? 'Register' : 'Login'}</button>
                <h3>{errorMessage}</h3>
            </form> 
            <h3>{currentAction == 'register' ? 'Have an accout?' : "Don't have an account?"}</h3>
                <button onClick={currentAction == 'register' ? () => setCurrentAction('login') : () => setCurrentAction('register')}>{currentAction == 'register' ? 'Login Here' : 'Register Here'}</button>
        </div>

    )
}

export default Login