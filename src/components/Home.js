import React, {useState} from 'react'
import {addProfilePictures} from '../api/index'
const girlsArray = ['/images/girl1.png', '/images/girl2.png', '/images/girl3.png', '/images/girl4.png']
const manArray = ['/images/man1.png', '/images/man2.png', '/images/man3.png', '/images/man4.png']

const Home = ({user, token, setUser, fetchUserfromApi}) => {
    const [isChanging, setIsChanging] = useState(false)
    const [selectedPf, setSelectedPf] = useState(null)
  
    const handleSubmit = async() => {
        const response = await addProfilePictures({token: token, pfp:selectedPf})
        setSelectedPf(null)
        setIsChanging(false)
        fetchUserfromApi()
    }
    return (
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
    )
 }
    

export default Home