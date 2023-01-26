import React, {useEffect, useState,} from 'react'
import {Link, Route, Routes, useNavigate} from 'react-router-dom'
import {Home, Todos, Login, SingleTodo, CreateTodo} from './components/index'
import {fetchUser} from './api'
import logout from './components/images/logout.png'
import home from './components/images/home.png'
import note from './components/images/note.png'
import plus from './components/images/plus.png'
const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    
    const fetchUserfromApi = async() => {
        const result = await fetchUser(token)
        setUser(result)
        return result
    }
    useEffect(() => {
        token ? fetchUserfromApi() : navigate('/login')
    }, [])
    
    return (
        <main className={token ? 'flex' : null}>
                
                {token ?
                <div className='sideNav'>
                <nav>
                <Link to='/'><img className='logoutButton' src={home}/></Link>
                <Link to='todos'><img className='logoutButton' src={note}/></Link>
                <Link to='createTodo'><img className='logoutButton' src={plus}/></Link>
                </nav>
                <Link className='log out' to='/login' onClick={() => {setToken(''), localStorage.removeItem('token')}}> 
                <img className='logoutButton' src={logout}/>
                </Link>
                </div>
                :
                null
                }
        <Routes>
            <Route path='/' element={<Home fetchUserfromApi={fetchUserfromApi} setUse={setUser} token={token} user={user} />}/>
            <Route path='todos/:id' element={<SingleTodo token={token}/>}/>
            <Route path='todos' element={<Todos token={token}/>}/>
            <Route path='login'  element={<Login setToken={setToken}/>}/>
            <Route path='createTodo' element={<CreateTodo  token={token}/>} />
        </Routes>
       </main>
       
    )
}



export default App