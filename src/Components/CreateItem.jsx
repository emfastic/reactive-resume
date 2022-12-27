import React, { useState } from "react";
import "../sass/layout/experience.scss";

function CreateItem(props) {
  const [clicked, setClicked] = useState(false);

  function handleClicked() {
    setClicked(!clicked);
  }

  function handleClick() {
    handleClicked();

    let newObject = { ...props.object };
    if (props.experience.key in newObject) {
      delete newObject[props.experience.key];
    } else {
      newObject[props.experience.key] = props.experience;
    }
    props.setObject(newObject);
    console.log(Object.values(newObject));
  }

  return (
    <div className="item-div">
      <div
        className={!clicked ? "experience-item" : "experience-item clicked"}
        onClick={handleClick}
      >
        {props.experience.organization === undefined
          ? props.experience.school === undefined
            ? props.experience.skill
            : `${props.experience.school}, ${props.experience.major}, ${props.experience.gradDate}`
          : `${props.experience.organization}, ${props.experience.title}, ${props.experience.endDate}`}
      </div>
      {props.experience.school === undefined ? (
        <div
          className={!clicked ? "experience-item" : "experience-item clicked"}
        >
          {props.experience.tag === undefined
            ? props.experience.section
            : props.experience.tag}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CreateItem;
