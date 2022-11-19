import React, { useRef } from "react";
import { updateStandardObjectSection } from "../../server/index.js";

function Skills() {
    const skill1 = useRef(null);
    const skill2 = useRef(null);

    function generateDataArray(array) {
        let objArray = []

        // Reformat standard skill array into objects
        array.forEach((item, idx) => {objArray.push({[idx]: item})})

        return objArray
    }

    return (
        <>
        <input ref={skill1} placeholder='skill1'></input>
        <input ref={skill2} placeholder='skill2'></input>
        <button onClick={() => {updateStandardObjectSection(generateDataArray([skill1.current.value, skill2.current.value]), 'skills')}}></button>
        </>
    )
}

export default Skills;