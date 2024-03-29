import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {loginUser, registerUser} from '../api/index'

const obj = [
    {
        id: 1,
        img: '/images/folder.png',
        msg: "Store your todos in an easy-to-remember fashion!"
    },
    {
        id: 2,
        img: '/images/edit.png',
        msg: "Edit your todo for mistakes or completion status!"
    },
    {
        id: 1,
        img: '/images/trash.png',
        msg: "Clear space in your todo library by deleting your todo!"
    }
]





const Login = ({setToken}) => {
    const [currentAction, setCurrentAction] = useState('login')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [currentImg, setCurrentImage ] = useState(obj[0])
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
            setErrorMessage('Paswords do not match')
        }else {
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
       
    }


    return (
        <div className='login-page'>
                <div className='loginFormContainer'>
                    <form onSubmit={(currentAction == 'register' ? handleRegister : handleLogin)}className='loginForm'>
                    <h1 className='welcomeTitle'>Welcome {currentAction == 'register' ? '' : 'Back'}</h1>
                        <div className='inputBox'>
                            <div className='iconBox'>
                                <img className='loginImage' src='/images/icons8-person-60.png'/>
                                <input value={username} onChange={(e) => setUsername(e.target.value)}  placeholder='Username...'></input>
                            </div>
                        </div>
                        <div className='inputBox'>
                            <div className='iconBox'>
                                <img className='loginImage' src='/images/icons8-lock-50.png'/>
                                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password...'></input>
                            </div>
                        </div>
                 
                        <div style={{display: (currentAction == 'register' ? 'block' : 'none')}}className='inputBox'>
                            <div className='iconBox'>
                                <img className='loginImage' src='/images/icons8-lock-50.png'/>
                                <input type='password' value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder='Confirm Password...'></input>
                            </div>
                        </div>
                        
                        <button className='loginButton'>Login</button>
                        <span style={{scale: (errorMessage ? '100%': '0')}}className='errorMessage'>{errorMessage}</span>
                        <h3>{currentAction == 'register' ? 
                        <span>Have an account? <span onClick={() => {setCurrentAction('login'), setErrorMessage(''), setPassword2(''), setUsername(''), setPassword('')}}className='linkSpan'>Login</span></span>
                        : 
                        <span>Don't have an account? <span onClick={() => {setCurrentAction('register'), setErrorMessage(''), setPassword2(''), setUsername(''), setPassword('')}} className='linkSpan' >Sign up</span></span>}</h3>
                        
                    </form >
                </div>
        </div>

    )
}

export default Login