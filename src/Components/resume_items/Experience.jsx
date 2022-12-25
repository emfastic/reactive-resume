import React, { useRef, useState } from "react";
import {
  updateKeyedObjectSection,
  updateExperience,
} from "../../server/index.js";
import TextInput from "../TextInput.jsx";
import "../../sass/layout/experience.scss";
import TextArea from "../TextArea.jsx";
import HistoryItem from "../HistoryItem.jsx";

function Experience(props) {
  let organizationRef = useRef();
  let titleRef = useRef();
  let locationRef = useRef();
  let startDateRef = useRef();
  let endDateRef = useRef();
  let descriptionRef = useRef();
  const [edit, setEdit] = useState(false);
  const [key, setKey] = useState();

  function convertDescsToCSV() {
    let descriptionStr = descriptionRef.current
      .getValue()
      .replaceAll("\u2022 ", "")
      .trim();
    let descriptionArray = descriptionStr.split("\n\n");

    descriptionArray.forEach((element, idx) => {
      descriptionArray[idx] =
        element.charAt(0).toUpperCase() + element.slice(1);
    });

    return descriptionArray.join(",");
  }

  function handleExperienceSubmit() {
    // get values from text inputs; convert the descriptions
    updateKeyedObjectSection(
      [
        {
          organization: organizationRef.current.getValue(),
          title: titleRef.current.getValue(),
          location: locationRef.current.getValue(),
          startDate: startDateRef.current.getValue(),
          endDate: endDateRef.current.getValue(),
          description: convertDescsToCSV(),
          section: document.getElementsByClassName("tag")[0].value,
        },
      ],
      "experiences"
    );
  }

  function convertCSVtoDescription(description) {
    let descriptionArray = description.split(",");
    description = "";
    descriptionArray.forEach((descriptionBullet) => {
      description += `\u2022 ${descriptionBullet}\n\n`;
    });

    return description;
  }

  function handleEdit(experienceData) {
    organizationRef.current.setValue(experienceData.organization);
    titleRef.current.setValue(experienceData.title);
    locationRef.current.setValue(experienceData.location);
    startDateRef.current.setValue(experienceData.startDate);
    endDateRef.current.setValue(experienceData.endDate);
    descriptionRef.current.setValue(
      convertCSVtoDescription(experienceData.description)
    );
    document.getElementsByClassName("tag")[0].value = experienceData.section;
    setEdit(true);
    setKey(experienceData.key);
  }

  function handleExperienceUpdate() {
    let experience = {
      organization: organizationRef.current.getValue(),
      title: titleRef.current.getValue(),
      location: locationRef.current.getValue(),
      startDate: startDateRef.current.getValue(),
      endDate: endDateRef.current.getValue(),
      description: convertDescsToCSV(),
      section: document.getElementsByClassName("tag")[0].value,
    };
    updateExperience("experiences", key, experience);
    handleBack();
  }

  function handleBack() {
    organizationRef.current.setValue("");
    titleRef.current.setValue("");
    locationRef.current.setValue("");
    startDateRef.current.setValue("");
    endDateRef.current.setValue("");
    descriptionRef.current.setValue("");
    document.getElementsByClassName("tag")[0].value = "Work";
    setEdit(false);
    setKey("");
  }

  let experienceEntries = [];

  if (props.user.experiences !== undefined) {
    for (const [key, value] of Object.entries(props.user.experiences)) {
      value.key = key;
      experienceEntries.push(value);
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

  experienceEntries.sort(compare);

  const currentExperiences = experienceEntries.map((entry) => {
    return (
      <HistoryItem
        entry={entry}
        handleEdit={handleEdit}
        key={entry.key}
        type="experience"
      />
    );
  });

  // console.log(experienceEntries)

  // let box = document.querySelector('.small-input')
  // console.log(box.offsetHeight);

  return (
    <>
      <form className="experience-form">
        <TextInput
          className="small-input"
          label="Organization"
          ref={organizationRef}
        ></TextInput>
        <TextInput
          className="small-input"
          label="Position Title"
          ref={titleRef}
        ></TextInput>
        <TextInput
          className="small-input"
          label="Location"
          ref={locationRef}
        ></TextInput>
        <div>
          <TextInput
            className="small-input month"
            label="Start"
            ref={startDateRef}
            type="month"
          ></TextInput>
          <TextInput
            className="small-input month"
            label="End (blank if current role)"
            ref={endDateRef}
            type="month"
          ></TextInput>
        </div>
        <select className="tag">
          <option value="Work">Work Experience</option>
          <option value="Research">Research Experience</option>
          <option value="Extracurricular">Extracurricular Experience</option>
        </select>
        <TextArea
          className="text-container"
          label="Description"
          ref={descriptionRef}
        ></TextArea>
        <div className="submit-container">
          {edit ? (
            <span className="submit-button left" onClick={handleBack}>
              Back
            </span>
          ) : (
            ""
          )}
          {edit ? (
            <span className="submit-button" onClick={handleExperienceUpdate}>
              Edit
            </span>
          ) : (
            <span className="submit-button" onClick={handleExperienceSubmit}>
              Add
            </span>
          )}
        </div>
      </form>
      <div className="current-education-header">Experience History</div>
      <div className="current-experiences">{currentExperiences}</div>
    </>
  );
}

export default Experience;
