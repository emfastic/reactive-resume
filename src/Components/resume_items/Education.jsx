import React, { useRef } from "react";
import TextInput from "../TextInput.jsx";
import { updateKeyedObjectSection } from "../../server/index.js";
import "../../sass/layout/education.scss"

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

    // let box = document.querySelector('.profile-form')
    // console.log(box.offsetHeight);
    // <span className="prompt-header">Hey {localStorage.getItem('firstName')}!</span>
    //     <span className="prompt-header">Start by adding your education</span>
    
    return(
        <>
        <div className="container">
        <form className="profile-form">
        <TextInput label="School" ref={schoolRef} type="text"></TextInput>
        <TextInput label="Graduation Date" ref={gradDateRef} type="month"></TextInput>
        <TextInput label="Major" ref={majorRef} type="text"></TextInput>
        <TextInput label="Minor (optional)" ref={minorRef} type="text"></TextInput>
        <TextInput label="GPA (optional)" ref={gpaRef} gpa="true" type="text"></TextInput>
        <div className="submit-container">
        <span className="submit-button" onClick={handleSubmit}>Add</span>
        </div>
        </form>
        </div>
        <div className="current-education">
        <div className="education-div">
        <div className="current-education-header">Education History</div>
        <div className="education-item">University of Washington, BA, Computer Science and Finance</div>
        <div className="remove-education-button">X</div>
        </div>
        <div className="education-div">
        <span className="education-item">Test2</span>
        </div>
        <div className="education-div">
        <div className="education-item">Test3</div>
        </div>
        </div>
        </> 
    )
}

export default Education;