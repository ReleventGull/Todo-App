import logout from './images/logout.png'
import home from './images/home.png'
import note from './images/note.png'
import plus from './images/plus.png'
import {Link, Outlet} from 'react-router-dom'

const NavBar = () => {
    return (
        <>
            <div className='sideNav'>
            <nav>
            <Link to='/'>
                <img className='logoutButton' src={home}/> 
                <span className='wordReveal'>Home</span>
            </Link>
            <Link to='todos'>
                <img className='logoutButton' src={note}/> 
                <span className='wordReveal'>Tasks</span>
            </Link>
            <Link to='createTodo'>
                <img className='logoutButton' src={plus}/> 
                <span className='wordReveal'>Create</span>
            </Link>
            </nav>
            <Link  to='/login' onClick={() => {setToken(''), localStorage.removeItem('token')}}> 
                <img className='logoutButton' src={logout}/>
                <span className='logoutWord'>Logout</span>
            </Link>
            </div>
            <Outlet />
        </>
            
    )
}

export default NavBar