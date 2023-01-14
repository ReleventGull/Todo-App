import React, {useState} from 'react'


const NoteItem = ({note, index}) => {
   
    return (
        <div className='singleNote'>
            <div className='space-icons'>
            <p>{`${index + 1}.`}</p>
            <details placeholder='' class='delete-note-drop-down'>
               <summary></summary>
               <div>
                    <p>Delete</p>
               </div>
            </details>
            </div>
            <h2>{note.description}</h2>
        </div>
    )
}


export default NoteItem