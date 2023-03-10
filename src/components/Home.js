import React, {useEffect, useState} from 'react'
import {fetchUser} from '../api'
import {addProfilePictures} from '../api/index'
const girlsArray = ['/images/girl1.png', '/images/girl2.png', '/images/girl3.png', '/images/girl4.png']
const manArray = ['/images/man1.png', '/images/man2.png', '/images/man3.png', '/images/man4.png']

const Home = ({token}) => {
    const [isChanging, setIsChanging] = useState(false)
    const [user, setUser] = useState([])
    const [todoCount, setTodoCount] = useState ({})
    const [selectedPf, setSelectedPf] = useState(null)
    
    const fetchUserfromApi = async() => {
        const result = await fetchUser(token)

        setUser(result.user)
        setTodoCount(result.todoCount)
        return result
    }

    useEffect(() => {
        token ? fetchUserfromApi() : null
    }, [token])
    const handleSubmit = async() => {
        const response = await addProfilePictures({token: token, pfp:selectedPf})
        setSelectedPf(null)
        setIsChanging(false)
        fetchUserfromApi()
    }

    return (
    user ?
    <div className='homeContainer'>
       <div className='profileContainer'>
       {!isChanging ? 
       <>
        <h2 className='welcomeMessage'>Welcome {user.username}!</h2>
           <div className='imgContainer'>
                   <div className='imgBox'>
                       {user.img ? <img className='profilePicture' src={user.img}/> : <h2>You don't have a profile Picture</h2>}
                   </div>
               <button onClick={() => setIsChanging(true)} className='changePfp'>Change Profile Picture</button>
           </div>
           <div className='bottomContainer'>
                <div className='todoInfo'>
                    <p>Total Amount of Todos: {todoCount.all}</p>
                    <p>Completed: {todoCount.complete}</p>
                    <p>Incomplete: {todoCount.incomplete}</p>
                    <p>Overdue: {todoCount.overdue}</p>
                </div>
           </div>
        </>
           :
        <div className='changePfpContainer'>
            <div className='pfpBox boys'>
                {manArray.map((man, index) => 
                    <img onClick={() => setSelectedPf(`/images/man${index+1}.png`)}key={index} className={`pfpImg boys ${`/images/man${index+1}.png` == selectedPf ? ` active`: ''}`} src={man}/>
                )}
                </div>
            <div className='pfpBox girls'>
                {girlsArray.map((girl, index) => 
                    <img onClick={() => setSelectedPf(`/images/girl${index+1}.png`)} key={index} className={`pfpImg girls ${`/images/girl${index+1}.png` == selectedPf ? ` active`: ''}`} src={girl}/>
                )}
            </div>
            <div className='submitPfpBox'>
            <button onClick={() => {setIsChanging(false), setSelectedPf(null)}}>Cancel</button>   
            <button onClick={handleSubmit}>Submit</button>
            </div>
        
        </div>
       }  
       </div>
   </div>
       :
       <h1>Loading</h1>
    )
    
    
 }
    

export default Home