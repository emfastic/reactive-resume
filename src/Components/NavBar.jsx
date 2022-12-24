import React from "react";
import "../sass/layout/navbar.scss"
import CreateResume from "./CreateResume";

function NavBar(props) {

    return (
        <div className="container-div">
        <div className="tag-container"><span onClick={() => {props.changeBuildState("education")}} className="experience-tag">Education</span></div>
        <div className="tag-container"><span onClick={() => {props.changeBuildState("experiences")}} className="experience-tag">Experiences</span></div>
        <div className="tag-container"><span onClick={() => {props.changeBuildState("skills")}} className="experience-tag">Skills</span></div>
        <div className="tag-container"><span onClick={() => {props.changeBuildState("interests")}} className="experience-tag">Interests</span></div>
        <span className="generate-button">Create Resume</span>
        </div>
    )
}

export default NavBar;