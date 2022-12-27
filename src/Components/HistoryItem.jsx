import React from "react";
import { removeData } from "../server/index.js";

function HistoryItem(props) {
  /* only used for work experiences or education; so only 1 type */

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

  return props.type === "experience" ? (
    <div className="item-div">
      <div
        className={"experience-item"}
        onClick={() => {
          props.handleEdit(props.entry);
        }}
      >
        {props.entry.organization}, {props.entry.title},{" "}
        {formatDate(props.entry.startDate)} - {formatDate(props.entry.endDate)}
      </div>
      <div className="experience-item">{props.entry.section}</div>
      <div
        className="remove-education-button"
        onClick={() => {
          removeData("experiences", props.entry.key);
        }}
      >
        X
      </div>
    </div>
  ) : (
    <div className="item-div">
      <div
        className="education-item"
        onClick={() => {
          props.handleEdit(props.entry);
        }}
      >
        {props.entry.school}, {props.entry.major},{" "}
        {formatDate(props.entry.gradDate)}
      </div>
      <div
        className="remove-education-button"
        onClick={() => {
          removeData("education", props.entry.key);
        }}
      >
        X
      </div>
    </div>
  );
}

export default HistoryItem;
