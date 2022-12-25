import React from "react";
import { removeData } from "../server/index.js";

function SkillsItem(props) {
  return (
    <div className="item-div">
      <div
        className="education-item"
        onClick={() => {
          props.handleEdit(props.entry);
        }}
      >
        {props.entry.skill}
      </div>
      <div
        className="education-item"
        onClick={() => {
          props.handleEdit(props.entry);
        }}
      >
        {props.entry.tag}
      </div>
      <div
        className="remove-education-button"
        onClick={() => {
          removeData("skills", props.entry.key);
        }}
      >
        X
      </div>
    </div>
  );
}

export default SkillsItem;
