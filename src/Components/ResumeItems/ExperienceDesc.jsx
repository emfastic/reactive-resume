import React, { useState } from "react";
import { updateKeyedObjectSection } from "../../server/index.js";

function ExperienceDesc(props) {

    const [description, setDescription] = useState('');

    function handleChange(input) {
        if (input.key === 'Enter') {
            props.addExperienceDesc()
        }
        if (input.key === 'Backspace' && input.target.value === '') {
            props.delBullet()
        }
    }

    return (
        <>{ props.shown ? 
        <><span key={`bullet ${props.idx}`}>•</span><input key={`desc ${props.idx}`} onKeyUp={input => { handleChange(input); } } value={description} onChange={event => { setDescription(event.target.value); } } placeholder={'description'}></input></> : <br></br>}
        </>
    )
}

export default ExperienceDesc;