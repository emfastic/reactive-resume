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
    const setArray = [true, () => setShow1(true), () => setShow2(true), () => setShow3(true), () => setShow4(true), () => setShow5(true)]
    const [bulletArray, setBulletArray] = useState([true, false, false, false, false, false])

    function showBullet(setArray, bulletArray, idx) {
        const trueIndices = bulletArray.map((val, idx) => val ? idx : undefined).filter(x => x !== undefined);
        for (let i = 0; i < 6; ++i) {
            if (trueIndices.find(element => element === i + 1) === undefined) {
                setArray[i + 1]();
                trueIndices[i + 1] = i + 1;
                break;
            }
        }
        const newBulletState = []
        for (let j = 0; j < 6; ++j) {
            console.log('gets here ')
            if (trueIndices.find(element => element === j) !== undefined) {
                newBulletState[j] = true
            } else {
                newBulletState[j] = false
            }
        }
        console.log("new bullet:", newBulletState);
        setBulletArray(newBulletState);
    }

    function removeBullet(setShow, idx) {
        setShow(false)
        const newBulletState = [...bulletArray];
        newBulletState[idx] = false
        setBulletArray(newBulletState)
    }

    return (
        <>
        <ExperienceDesc addDesc={() => {showBullet(setArray, bulletArray)}} key={0} shown={true}></ExperienceDesc>
        <ExperienceDesc addDesc={() => {showBullet(setArray, bulletArray)}} delDesc={() => {removeBullet(setShow1, 1)}} key={1} shown={show1}></ExperienceDesc>
        <ExperienceDesc addDesc={() => {showBullet(setArray, bulletArray)}} delDesc={() => {removeBullet(setShow2, 2)}} key={2} shown={show2}></ExperienceDesc>
        <ExperienceDesc addDesc={() => {showBullet(setArray, bulletArray)}} delDesc={() => {removeBullet(setShow3, 3)}} key={3} shown={show3}></ExperienceDesc>
        <ExperienceDesc addDesc={() => {showBullet(setArray, bulletArray)}} delDesc={() => {removeBullet(setShow4, 4)}} key={4} shown={show4}></ExperienceDesc>
        <ExperienceDesc addDesc={() => {}} delDesc={() => {removeBullet(setShow5, 5)}} key={5} shown={show5}></ExperienceDesc>
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