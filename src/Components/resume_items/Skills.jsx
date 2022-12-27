import React, { useRef, useState } from "react";
import {
  updateKeyedObjectSection,
  updateExperience,
} from "../../server/index.js";
import TextInput from "../TextInput.jsx";
import SkillsItem from "../SkillsItem.jsx";

function Skills(props) {
  const skillRef = useRef();
  const [edit, setEdit] = useState(false);
  const [label, setLabel] = useState("Technical Skill");
  const [key, setKey] = useState();

  function addSI() {
    updateKeyedObjectSection(
      [
        {
          skill: skillRef.current.getValue(),
          tag: label,
        },
      ],
      "skills"
    );
    handleBack();
  }

  function handleSkillUpdate() {
    let skill = {
      skill: skillRef.current.getValue(),
      tag: document.getElementsByClassName("tag")[0].value,
    };
    updateExperience("skills", key, skill);
    handleBack();
  }

  function handleEdit(skillData) {
    skillRef.current.setValue(skillData.skill);
    document.getElementsByClassName("tag")[0].value = skillData.tag;
    setLabel(document.getElementsByClassName("tag")[0].value);
    setEdit(true);
    setKey(skillData.key);
  }

  function handleBack() {
    skillRef.current.setValue("");
    document.getElementsByClassName("tag")[0].value = "Technical Skill";
    setLabel(document.getElementsByClassName("tag")[0].value);
    setEdit(false);
    setKey("");
  }

  let skillsEntries = [];

  if (props.user !== null) {
    if (props.user.skills !== undefined) {
      for (const [key, value] of Object.entries(props.user.skills)) {
        value.key = key;
        skillsEntries.push(value);
      }
    }
  }

  function compare(a, b) {
    if (a.tag < b.tag) {
      return 1;
    }
    if (a.tag > b.tag) {
      return -1;
    }
    return 0;
  }

  skillsEntries.sort(compare);

  const skillsItems = skillsEntries.map((entry) => {
    return <SkillsItem entry={entry} handleEdit={handleEdit} key={entry.key} />;
  });

  return (
    <>
      <form className="education-form">
        <select
          className="tag"
          onChange={() =>
            setLabel(document.getElementsByClassName("tag")[0].value)
          }
        >
          <option value="Technical Skill">Technical Skill</option>
          <option value="Language">Language</option>
          <option value="Interest">Interest</option>
        </select>
        <TextInput
          label={label}
          ref={skillRef}
          className="normal-input"
        ></TextInput>
        <div className="submit-container">
          {edit ? (
            <span className="submit-button left" onClick={handleBack}>
              Back
            </span>
          ) : (
            ""
          )}
          {edit ? (
            <span className="submit-button" onClick={handleSkillUpdate}>
              Edit
            </span>
          ) : (
            <span className="submit-button" onClick={addSI}>
              Add
            </span>
          )}
        </div>
      </form>
      <div className="current-education-header">Skills and Interests</div>
      <div className="current-experiences">{skillsItems}</div>
    </>
  );
}

export default Skills;
