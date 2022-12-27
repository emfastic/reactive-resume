import React, { useState } from "react";
import { saveAs } from "file-saver";
import { Packer } from "docx";
import { DocumentCreator } from "../server/resume.js";
import CreateItem from "./CreateItem.jsx";
import "../sass/layout/create.scss";

function CreateResume(props) {
  const [educationObj, setEducationObj] = useState({});
  const [experienceObj, setExperienceObj] = useState({});
  const [skillsObj, setSkillsObj] = useState({});

  function generate() {
    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create([
      experienceObj,
      educationObj,
      skillsObj,
    ]);

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `${props.user.email}_resume.docx`);
      console.log("Document created successfully");
    });
  }

  let educationEntries = [];

  if (props.user.education !== undefined) {
    for (const [key, value] of Object.entries(props.user.education)) {
      value.key = key;
      educationEntries.push(value);
    }
  }

  function compare(a, b) {
    if (a.section < b.section) {
      return 1;
    }
    if (a.section > b.section) {
      return -1;
    }
    return 0;
  }

  educationEntries.sort(compare);

  const educationItems = educationEntries.map((entry) => {
    return (
      <CreateItem
        setObject={setEducationObj}
        object={educationObj}
        experience={entry}
      ></CreateItem>
    );
  });

  let experienceEntries = [];

  if (props.user.experiences !== undefined) {
    for (const [key, value] of Object.entries(props.user.experiences)) {
      value.key = key;
      experienceEntries.push(value);
    }
  }

  experienceEntries.sort(compare);

  // <div>
  //   <label for={entry.key}>{entry.organization}</label>
  //   <input
  //     type="checkbox"
  //     id={entry.key}
  //     onChange={() => handleClick(entry, experienceObj, setExperienceObj)}
  //   ></input>
  // </div>

  const experienceItems = experienceEntries.map((entry) => {
    return (
      <CreateItem
        setObject={setExperienceObj}
        object={experienceObj}
        experience={entry}
      />
    );
  });

  let skillsEntries = [];

  if (props.user.skills !== undefined) {
    for (const [key, value] of Object.entries(props.user.skills)) {
      value.key = key;
      skillsEntries.push(value);
    }
  }

  const skillsItems = skillsEntries.map((entry) => {
    return (
      <CreateItem
        setObject={setSkillsObj}
        object={skillsObj}
        experience={entry}
      ></CreateItem>
    );
  });

  return (
    <div className="container">
      <div className="column">
        <div className="section-header">Education History</div>
        {educationItems}
      </div>
      <div className="column">
        <div className="section-header">Experience History</div>
        {experienceItems}
        <span className="generate-button middle" onClick={generate}>
          Generate
        </span>
      </div>
      <div className="column">
        <div className="section-header">Skills and Interests</div>
        {skillsItems}
      </div>
    </div>
  );
}

export default CreateResume;
