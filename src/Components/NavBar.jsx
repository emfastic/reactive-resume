import React from "react";
import "../sass/layout/navbar.scss";

function NavBar(props) {
  return (
    <div className="container-div">
      <div className="tag-container">
        <span
          onClick={() => {
            props.changeBuildState("profile");
          }}
          className="experience-tag"
        >
          Profile
        </span>
      </div>
      <div className="tag-container">
        <span
          onClick={() => {
            props.changeBuildState("education");
          }}
          className="experience-tag"
        >
          Education
        </span>
      </div>
      <div className="tag-container">
        <span
          onClick={() => {
            props.changeBuildState("experiences");
          }}
          className="experience-tag"
        >
          Experiences
        </span>
      </div>
      <div className="tag-container">
        <span
          onClick={() => {
            props.changeBuildState("skills");
          }}
          className="experience-tag"
        >
          Skills+
        </span>
      </div>
      <span
        className="generate-button"
        onClick={() => {
          props.changeBuildState("generate");
        }}
      >
        Create Resume
      </span>
    </div>
  );
}

export default NavBar;
