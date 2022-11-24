import React, { useRef, useState, useEffect } from "react";
import TextInput from "../TextInput.jsx";
import { updateKeyedObjectSection } from "../../server/index.js";
import profileData from "../Profile"

function Education(props) {
    let schoolRef = useRef(null);
    let majorRef = useRef(null);
    let minorRef = useRef(null);
    let gradDateRef = useRef(null);
    let gpaRef = useRef(null);
    

    // <input ref={school} placeholder='school'></input>
    //     <input ref={secSchool} placeholder='major school name'></input>
    //     <input ref={major} placeholder='major'></input>
    //     <input ref={minor} placeholder='minor'></input>
    //     <input ref={gradDate} placeholder='graduation date'></input>
    //     <input ref={gpa} placeholder='GPA'></input>
    //     <button onClick={() => {updateKeyedObjectSection([{school: school.current.value, major: major.current.value, 
    //         minor: minor.current.value, gradDate: gradDate.current.value, gpa: gpa.current.value, secSchool: secSchool.current.value}], 'education')}}>Update Education</button>

    

    return(
        <>
        <div className="container">
        <span className="prompt-header">{localStorage.getItem('firstName')}</span>
        <form className="profile-form">
        <TextInput label="School" ref={schoolRef}></TextInput>
        <TextInput label="Graduation Date" ref={gradDateRef} phone={true}></TextInput>
        <TextInput label="Major" ref={majorRef}></TextInput>
        <TextInput label="Minor (optional)" ref={minorRef}></TextInput>
        <TextInput label="GPA (optional)" ref={gpaRef}></TextInput>
        <span className="submit-container">
        <span className="submit-button">Next</span>
        </span>
        </form>
        </div>
        </> 
    )
}

export default Education;