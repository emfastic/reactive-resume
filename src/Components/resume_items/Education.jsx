import React, { useRef } from "react";
import TextInput from "../TextInput.jsx";
import { updateKeyedObjectSection } from "../../server/index.js";

function Education(props) {
    let schoolRef = useRef(null);
    let majorRef = useRef(null);
    let minorRef = useRef(null);
    let gradDateRef = useRef(null);
    let gpaRef = useRef(null);
    
    function handleSubmit() {
        updateKeyedObjectSection([{
            school: schoolRef.current.getValue(),
            major: majorRef.current.getValue(), 
            minor: minorRef.current.getValue(),
            gradDate: gradDateRef.current.getValue(),
            gpa: gpaRef.current.getValue()
        }], 'education')
    }

    
    return(
        <>
        <div className="container">
        <span className="prompt-header">Hey {localStorage.getItem('firstName')}!</span>
        <span className="prompt-header">Add your education to get started</span>
        <form className="profile-form">
        <TextInput label="School" ref={schoolRef} type="text"></TextInput>
        <TextInput label="Graduation Date" ref={gradDateRef} type="month"></TextInput>
        <TextInput label="Major" ref={majorRef} type="text"></TextInput>
        <TextInput label="Minor (optional)" ref={minorRef} type="text"></TextInput>
        <TextInput label="GPA (optional)" ref={gpaRef} gpa="true" type="text"></TextInput>
        <span className="submit-container">
        <span className="submit-button" onClick={handleSubmit}>Next</span>
        </span>
        </form>
        </div>
        </> 
    )
}

export default Education;