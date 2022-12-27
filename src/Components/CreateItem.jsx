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

  function formatDate(date) {
    const months = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      10: "October",
      11: "November",
      12: "December",
    };

    return date === "Present"
      ? date
      : months[date.slice(5)] + " " + date.slice(0, 4);
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
            : `${props.experience.school}, ${
                props.experience.major
              }, ${formatDate(props.experience.gradDate)}`
          : `${props.experience.organization}, ${
              props.experience.title
            }, ${formatDate(props.experience.endDate)}`}
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
