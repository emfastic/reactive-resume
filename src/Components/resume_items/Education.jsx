import React, { useRef } from "react";
import { updateKeyedObjectSection } from "../../server/index.js";

function Education() {
    let school = useRef(null);
    let secSchool = useRef(null);
    let major = useRef(null);
    let minor = useRef(null);
    let gradDate = useRef(null);
    let gpa = useRef(null);

    return(
        <>
        <input ref={school} placeholder='school'></input>
        <input ref={secSchool} placeholder='major school name'></input>
        <input ref={major} placeholder='major'></input>
        <input ref={minor} placeholder='minor'></input>
        <input ref={gradDate} placeholder='graduation date'></input>
        <input ref={gpa} placeholder='GPA'></input>
        <button onClick={() => {updateKeyedObjectSection([{school: school.current.value, major: major.current.value, 
            minor: minor.current.value, gradDate: gradDate.current.value, gpa: gpa.current.value, secSchool: secSchool.current.value}], 'education')}}>Update Education</button>
        </> 
    )
}

export default Education;