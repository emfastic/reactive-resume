import React, { useState, useEffect } from "react";
import { updateKeyedObjectSection } from "../../server/index.js";

function ExperienceDesc(props) {

    const [description, setDescription] = useState('');
    const [delCounter, setDelCounter] = useState(0);

    /* pass the description */
    useEffect(() => {
        props.passUpwards(description, element => setDescription(element), props.idx);
        // theoretically only dependency should be description change, not sure tho (TEMP FIX)
        // eslint-disable-next-line
    }, [description]);

    function handleChange(input) {
        if (input.key === 'Enter') {
            props.addDesc()
        }
        if (input.key === 'Backspace' && input.target.value === '') {
            setDelCounter(1);
            if (delCounter === 1) {
                props.delDesc()
                setDelCounter(0);
            }
        }
    }

    return (
        <>{ props.shown ? 
        <><span key={`bullet ${props.idx}`}>•</span><input key={`desc ${props.idx}`} onKeyUp={input => { handleChange(input); } } value={description} onChange={event => { setDescription(event.target.value); } } placeholder={'description'}></input></> : <></>}
        </>
    )
}

export default ExperienceDesc;