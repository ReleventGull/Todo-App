import React from 'react'


const NoteItem = ({note, index}) => {
    return (
        <div className='singleNote'>
            <p>{`${index + 1}.`}</p>
            <h2>{note.description}</h2>
        </div>
    )
}


export default NoteItem