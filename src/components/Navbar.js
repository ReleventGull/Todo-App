import logout from './images/logout.png'
import home from './images/home.png'
import note from './images/note.png'
import plus from './images/plus.png'
import {Link, Outlet} from 'react-router-dom'

const NavBar = () => {
    return (
        <>
           
            <nav className='navbar'>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <Link to='/'>
                            <img className='logoutButton' src={home}/> 
                            <span className='wordReveal'>Home</span>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='todos'>
                            <img className='logoutButton' src={note}/> 
                            <span className='wordReveal'>Tasks</span>
                        </Link>
                    </li>  
                    <li className='nav-item'>
                        <Link to='createTodo'>
                            <img className='logoutButton' src={plus}/> 
                            <span className='wordReveal'>Create</span>
                        </Link>
                    </li>    
                    <li className='nav-item'>
                        <Link  to='/login' onClick={() => {setToken(''), localStorage.removeItem('token')}}> 
                            <img className='logoutButton' src={logout}/>
                            <span className='wordReveal'>Logout</span>
                        </Link>
                    </li>     
                </ul>
            </nav>
            <Outlet />
        </>
            
    )
}

export default NavBar