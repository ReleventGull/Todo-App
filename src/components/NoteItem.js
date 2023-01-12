import React from 'react'


const NoteItem = ({note}) => {
    return (
        <div>
            <h2>{note.description}</h2>
        </div>
    )
}


export default NoteItem