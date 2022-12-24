import React, { useRef } from "react";
import TextInput from "../TextInput.jsx";
import { updateKeyedObjectSection } from "../../server/index.js";
import "../../sass/layout/education.scss"
import HistoryItem from  "../HistoryItem.jsx";

function Education(props) {
    let schoolRef = useRef(null);
    let majorRef = useRef(null);
    let minorRef = useRef(null);
    let gradDateRef = useRef(null);
    let gpaRef = useRef(null);
    let degreeTypeRef = useRef(null);
    
    function handleSubmit() {
        updateKeyedObjectSection([{
            school: schoolRef.current.getValue(),
            degreeType: degreeTypeRef.current.getValue(),
            major: majorRef.current.getValue(), 
            minor: minorRef.current.getValue(),
            gradDate: gradDateRef.current.getValue(),
            gpa: gpaRef.current.getValue()
        }], 'education')
    }

    function handleEdit(educationData) {
        schoolRef.current.setValue(educationData.school)
        degreeTypeRef.current.setValue(educationData.degreeType)
        gradDateRef.current.setValue(educationData.gradDate)
        majorRef.current.setValue(educationData.major)
        minorRef.current.setValue(educationData.minor)
        gpaRef.current.setValue(educationData.gpa)
    }

    let educationEntries = []
    
    if (props.user.education !== undefined) {
        for (const [key, value] of Object.entries(props.user.education)) {
            value.key = key
            educationEntries.push(value)
        }
    }

    const educationItems = educationEntries.map(entry => {
        return <HistoryItem entry={entry} handleEdit={handleEdit} key={entry.key}/>
    })

    // let box = document.querySelector('.profile-form')
    // console.log(box.offsetHeight);
    
    return(
        <>
        <div className="container">
        <form className="education-form">
        <TextInput className="normal-input" label="School" ref={schoolRef} type="text"></TextInput>
        <TextInput className="normal-input" label="Degree Type (BA, BS)" ref={degreeTypeRef} type="text"></TextInput>
        <TextInput className="normal-input" label="Graduation Date" ref={gradDateRef} type="month"></TextInput>
        <TextInput className="normal-input" label="Major" ref={majorRef} type="text"></TextInput>
        <TextInput className="normal-input" label="Minor (optional)" ref={minorRef} type="text"></TextInput>
        <TextInput className="normal-input" label="GPA (optional)" ref={gpaRef} type="text"></TextInput>
        <div className="submit-container">
        <span className="submit-button" onClick={handleSubmit}>Add</span>
        </div>
        </form>
        </div>
        <div className="current-education-header">Education History</div>
        <div className="current-education">
        {educationItems}
        </div>
        </> 
    )
}

export default Education;