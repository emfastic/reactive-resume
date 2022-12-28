import React, { useState } from "react";
import NavBar from "./NavBar";
import Profile from "./resume_items/Profile";
import Education from "./resume_items/Education";
import Experience from "./resume_items/Experience";
import Skills from "./resume_items/Skills";
import CreateResume from "./CreateResume";
import "../sass/layout/build.scss";

function Build(props) {
  const [buildState, setBuildState] = useState("profile");

  const buildObject = {
    profile: <Profile user={props.user} changeState={setBuildState} />,
    education: <Education user={props.user} />,
    experiences: <Experience user={props.user} />,
    skills: <Skills user={props.user} />,
    generate: <CreateResume user={props.user} />,
  };

  return (
    <>
      <div className="left-container">
        <NavBar changeBuildState={setBuildState} />
      </div>
      <div className="right-container">{buildObject[buildState]}</div>
    </>
  );
}

export default Build;
