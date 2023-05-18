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
                <div className='loginFormContainer'>
                    <form className='loginForm'>
                    <h1 className='welcomeTitle'>Welcome Back</h1>
                        <div className='inputBox'>
                            <div className='iconBox'>
                                <img className='loginImage' src='/images/icons8-person-60.png'/>
                                <input placeholder='Username...'></input>
                            </div>
                        </div>
                        <div className='inputBox'>
                            <div className='iconBox'>
                                <img className='loginImage' src='/images/icons8-lock-50.png'/>
                                <input placeholder='Password...'></input>
                            </div>
                        </div>
                        {currentAction !== 'register'? null : 
                        <div className='inputBox'>
                            <div className='iconBox'>
                                <img className='loginImage' src='/images/icons8-lock-50.png'/>
                                <input placeholder='Confirm Password...'></input>
                            </div>
                        </div>
                        }
                        <button className='loginButton'>Login</button>
                        <h3>{currentAction == 'register' ? 
                        <span>Have an account? <span onClick={() => setCurrentAction('login')}className='linkSpan'>Login</span></span>
                        : 
                        <span>Don't have an account? <span onClick={() => setCurrentAction('register')} className='linkSpan' >Sign up</span></span>}</h3>
                    </form >
                </div>
        </div>

    )
}

export default Login