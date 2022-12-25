import React, { useState } from "react";
import { saveAs } from "file-saver";
import { Packer } from "docx";
import { DocumentCreatorTest } from "../server/resume.js";
import "../sass/layout/create.scss";

function CreateResume(props) {
  const [educationObj, setEducationObj] = useState({});
  const [experienceObj, setExperienceObj] = useState({});
  const [skillsObj, setSkillsObj] = useState({});

  function generate() {
    const documentCreator = new DocumentCreatorTest();
    const doc = documentCreator.create([
      experienceObj,
      educationObj,
      skillsObj,
    ]);

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "test.docx");
      console.log("Document created successfully");
    });
  }

  function handleClick(experience, object, setObject) {
    let newObject = { ...object };
    if (experience.key in newObject) {
      delete newObject[experience.key];
    } else {
      newObject[experience.key] = experience;
    }
    setObject(newObject);
    console.log(Object.values(newObject));
  }

  let educationEntries = [];

  if (props.user.education !== undefined) {
    for (const [key, value] of Object.entries(props.user.education)) {
      value.key = key;
      educationEntries.push(value);
    }
  }

  const educationItems = educationEntries.map((entry) => {
    return (
      <div>
        <label for={entry.key}>{entry.school}</label>
        <input
          type="checkbox"
          id={entry.key}
          onChange={() => handleClick(entry, educationObj, setEducationObj)}
        ></input>
      </div>
    );
  });

  let experienceEntries = [];

  if (props.user.experiences !== undefined) {
    for (const [key, value] of Object.entries(props.user.experiences)) {
      value.key = key;
      experienceEntries.push(value);
    }
  }

  const experienceItems = experienceEntries.map((entry) => {
    return (
      <div>
        <label for={entry.key}>{entry.organization}</label>
        <input
          type="checkbox"
          id={entry.key}
          onChange={() => handleClick(entry, experienceObj, setExperienceObj)}
        ></input>
      </div>
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
      <div>
        <label for={entry.key}>{entry.skill}</label>
        <input
          type="checkbox"
          id={entry.key}
          onChange={() => handleClick(entry, skillsObj, setSkillsObj)}
        ></input>
      </div>
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
        <span onClick={generate}>TEST</span>
      </div>
      <div className="column">
        <div className="section-header">Skills and Interests</div>
        {skillsItems}
      </div>
    </div>
  );
}

export default CreateResume;
