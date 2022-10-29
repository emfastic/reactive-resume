import React, { useRef, useState } from "react";
import { updateKeyedObjectSection } from "../../server/index.js";
import ExperienceDesc from "./ExperienceDesc.jsx";
import { experiences } from '../../server/cv-data';

function Experiences() {
    let organization = useRef(null);
    let title = useRef(null);
    let location = useRef(null);
    let startDate = useRef(null);
    let endDate = useRef(null);
    let description = useRef(null);

    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [show4, setShow4] = useState(false)
    const [show5, setShow5] = useState(false)

    function showBullet(show, setShow) {
        setShow(!show)
    }

    return (
        <>
        <ExperienceDesc addExperienceDesc={() => {showBullet(show1, setShow1)}} key={0} shown={true}></ExperienceDesc>
        <ExperienceDesc addExperienceDesc={() => {showBullet(show2, setShow2)}} key={1} shown={show1}></ExperienceDesc>
        <ExperienceDesc addExperienceDesc={() => {showBullet(show3, setShow3)}} key={2} shown={show2}></ExperienceDesc>
        <ExperienceDesc addExperienceDesc={() => {showBullet(show4, setShow4)}} key={3} shown={show3}></ExperienceDesc>
        <ExperienceDesc addExperienceDesc={() => {showBullet(show5, setShow5)}} key={4} shown={show4}></ExperienceDesc>
        <ExperienceDesc addExperienceDesc={() => {showBullet(show5, setShow5)}} key={5} shown={show5}></ExperienceDesc>
        <br/>
        <br/>
        <br/>
        <input ref={title} placeholder={`title 1`}></input>
        <input ref={location} placeholder={`location 1`}></input>
        <input ref={startDate} placeholder={`start date 1`}></input>
        <input ref={endDate} placeholder={`end date 1`}></input>
        <input ref={description} placeholder={`description 1`}></input>
        <button onClick={() => { updateKeyedObjectSection([{
            organization: organization.current.value,
            title: title.current.value,
            location: location.current.value,
            startDate: startDate.current.value,
            endDate: endDate.current.value,
            description: description.current.value
        }], 'experiences') }}>Update Experiences</button>
        </>
    )
}

export default Experiences;