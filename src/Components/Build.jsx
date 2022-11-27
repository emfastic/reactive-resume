import React, { useState } from "react";
import NavBar from "./NavBar"
import Education from "./resume_items/Education";
import Experience from "./resume_items/Experience";
import "../sass/layout/build.scss"

function Build() {
    const [buildState, setBuildState] = useState("experiences")
    
    const buildObject = {
        education: <Education/>,
        experiences: <Experience/>,
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