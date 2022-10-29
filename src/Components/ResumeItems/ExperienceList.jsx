import React, { useState } from "react";
import { updateKeyedObjectSection } from "../../server/index.js";
import ExperienceDesc from 'ExperienceDesc.jsx'

function ExperienceList() {
    const [experienceDescs, setExperienceDescs] = useState([<ExperienceDesc addExperienceDesc={() => {}}/>])

    function addBullet() {
        let idx = experienceDescs.length + 1;
        setExperienceDescs([...experienceDescs,
                <ExperienceDesc addExperienceDesc={addBullet} key={idx}></ExperienceDesc>] 
                );
    }
}
