import React from 'react';
import { removeData } from '../server/index.js'

function HistoryItem(props) {
    /* only used for work experiences or education; so only 1 type */

    return (props.type === "experience" ?
    <div className="item-div">
    <div className="experience-item" onClick={() => {props.handleEdit(props.entry)}}>{props.entry.organization}, {props.entry.title}, {props.entry.location}, {props.entry.startDate} - {props.entry.endDate}</div>
    <div className="experience-item">{props.entry.section}</div>
    <div className="remove-education-button" onClick={() => {removeData('experiences', props.entry.key)}}>X</div>
    </div>
    :
    <div className="item-div">
    <div className="education-item" onClick={() => {props.handleEdit(props.entry)}}>{props.entry.school}, {props.entry.degreeType}, {props.entry.major}, {props.entry.gradDate}</div>
    <div className="remove-education-button" onClick={() => {removeData('education', props.entry.key)}}>X</div>
    </div>
    )
}

export default HistoryItem;