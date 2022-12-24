import React, { useState } from "react";
import NavBar from "./NavBar"
import Education from "./resume_items/Education";
import Experience from "./resume_items/Experience";
import "../sass/layout/build.scss"

function Build(props) {
    const [buildState, setBuildState] = useState("experiences")
    
    const buildObject = {
        education: <Education user={props.user}/>,
        experiences: <Experience user={props.user}/>,
        skills: "skills",
        interests: "interests"
    }

    return (
        <>
        <div className="left-container">
        <NavBar changeBuildState={setBuildState}/>
        </div>
        <div className="right-container">
        {buildObject[buildState]}
        </div>
        </>
    )
}

export default Build;