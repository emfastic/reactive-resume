import React, { useRef, useState } from "react"
import { updateKeyedObjectSection } from "../../server/index.js"
import TextInput from "../TextInput.jsx"
import "../../sass/layout/experience.scss"
import TextArea from "../TextArea.jsx"

function Experience() {
    let organizationRef = useRef()
    let titleRef= useRef()
    let locationRef = useRef()
    let startDateRef = useRef()
    let endDateRef= useRef()
    let descriptionRef = useRef()

    // Need to update based on text area
    function convertDescsToCSV(valObjArray) {
        let description = ''

        // Iterate through each description appending it to desc, separated by comma with no space
        // If user didn't capitalize the first word of desc capitalize it
        // If user has leading or trailing whitespace trim it
        valObjArray.forEach(element => {
            let descBullet = element.description.trim()
            description += descBullet.charAt(0).toUpperCase() + descBullet.slice(1) + ','
        })

        // Remove last comma bc it is unnecessary
        description = description.slice(0, -1)

        return description
    }

    function handleExperienceSubmit() {
        // get values from text inputs; convert the descriptions
        updateKeyedObjectSection([{
            organization: organizationRef.current.getValue(),
            title: titleRef.current.getValue(),
            location: locationRef.current.getValue(),
            startDate: startDateRef.current.getValue(),
            endDate: endDateRef.current.getValue(),
            description: convertDescsToCSV(descriptionRef.current.getValue())
        }, 'experiences'])
    }

    // let box = document.querySelector('.experience-tag')
    // console.log(box.offsetWidth);

    return (
        <>
        <form className="experience-form">
        <TextInput className="small-input" label="Organization" ref={organizationRef}></TextInput>
        <TextInput className="small-input" label="Position Title" ref={titleRef}></TextInput>
        <TextInput className="small-input" label="Location" ref={locationRef}></TextInput>
        <TextInput className="small-input month" label="Start" ref={startDateRef} type="month"></TextInput>
        <TextInput className="small-input month" label="End (blank if current role)" ref={startDateRef} type="month"></TextInput>
        <TextArea className="text-container" label="Description" ref={descriptionRef}></TextArea>
        <div className="submit-container">
        <span className="submit-button">Add</span>
        </div>
        </form>
        <div className="current-education-header">Experience History</div>
        <div className="current-experiences">
        <div className="item-div">
        <div className="experience-item">Best Buy, Sales Advisor, Cleveland, June 2019 - January 2022</div>
        <div className="remove-education-button">X</div>
        </div>
        <div className="item-div">
        <span className="experience-item">Test2</span>
        </div>
        <div className="item-div">
        <div className="experience-item">Test3</div>
        </div>
        <div className="item-div">
        <div className="experience-item">Test3</div>
        </div>
        <div className="item-div">
        <div className="experience-item">Test3</div>
        </div>
        <div className="item-div">
        <div className="experience-item">Test3</div>
        </div>
        <div className="item-div">
        <div className="experience-item">Test3</div>
        </div>
        <div className="item-div">
        <div className="experience-item">Test3</div>
        </div>
        <div className="item-div">
        <div className="experience-item">Test3</div>
        </div>
        <div className="item-div">
        <div className="experience-item">Test3</div>
        </div>
        <div className="item-div">
        <div className="experience-item">Test3</div>
        </div>  
        <div className="item-div">
        <div className="experience-item">Test3</div>
        </div>
        <div className="item-div">
        <div className="experience-item">Test3</div>
        </div>
        </div>
        </>
    )
}

export default Experience;