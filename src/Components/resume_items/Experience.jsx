import React, { useRef, useState } from "react"
import { updateKeyedObjectSection } from "../../server/index.js"
import ExperienceDesc from "./ExperienceDesc.jsx"

function Experience() {
    let organization = useRef(null)
    let title = useRef(null)
    let location = useRef(null)
    let startDate = useRef(null)
    let endDate = useRef(null)

    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [show4, setShow4] = useState(false)
    const [show5, setShow5] = useState(false)
    const [valObjArray, setValObjArray] = useState([{description: null, setDescription: null}, {description: null, setDescription: null}, {description: null, setDescription: null}, {description: null, setDescription: null}, {description: null, setDescription: null}, {description: null, setDescription: null}])
    const setArray = [true, () => setShow1(!show1), () => setShow2(!show2), () => setShow3(!show3), () => setShow4(!show4), () => setShow5(!show5)]
    const [bulletArray, setBulletArray] = useState([true, false, false, false, false, false])

    /* show the next bullet on user return, shifting the vals to give appearance of next input being newly rendered */
    function showBullet(call_idx, setArray, bulletArray) {
        
        // Find the first false element in shown state array
        const firstFalse = bulletArray.findIndex(element => !element)
        
        // If all are true print message
        // TODO: Render error message
        if (firstFalse === -1) {
            console.log('all are enabled')
            return
        }
        
        // Update bullet array to contain new shown value
        const newBulletArray = [...bulletArray]
        newBulletArray[firstFalse] = true
        setBulletArray(newBulletArray)

        // If input after call idx isn't shown, show and return
        if (firstFalse - call_idx === 1) {
            setArray[firstFalse]()
            return
        }

        // Store description for next element in temp
        // Set next element to empty and set the following to next's initial val
        valObjArray[call_idx + 1].setDescription('')

        // Start at the position past the empty input
        // Go to last position in list (5)
        for (let i = call_idx + 1; i < 5; i++) {
            // Set the next position to the val of the last (shifting the element's vals)
            // Imitates a new input being rendered next to the previous
            console.log(valObjArray[i].description)
            valObjArray[i + 1].setDescription(valObjArray[i].description)
        }

        // Once the values are changed, show the new item (actually at the end)
        setArray[firstFalse]()
    }

    /* pass the val state and set val state up to experiences; change val array on effect change */ 
    function getRefsFromChild(description, setDescription, idx) {

        // Dereference val obj state array (tracking exp desc vals)
        const newValArray = [...valObjArray]

        // Set the val array obj at position idx corresponding to component's idx
        newValArray[idx].description = description
        newValArray[idx].setDescription = setDescription

        // Update val array
        setValObjArray(newValArray)
    }

    function removeBullet(call_idx, setArray, bulletArray) {

        // Find the last true element in shown state array
        const lastTrue = bulletArray.lastIndexOf(true)

        // Catch user trying to delete only bullet
        // TODO: set error message that you need 1 bullet
        if (lastTrue === 0) {
            console.log('need at least 1 bullet')
            return
        }
        
        // Update bullet array that has deleted value
        const newBulletArray = [...bulletArray]
        newBulletArray[lastTrue] = false
        setBulletArray(newBulletArray)

        // If last bullet in the list: hide bullet and return
        if (lastTrue === call_idx) {
            setArray[lastTrue]()
            return
        }

        // Set last to be empty so when bullet is added it is empty again
        valObjArray[lastTrue].setDescription('')

        // Start at last true position and decrement to call idx
        for (let i = lastTrue; i > call_idx; i--) {
            // Set the next position to the val of the last (shifting the element's vals)
            // Imitates a new input being rendered next to the previous
            valObjArray[i - 1].setDescription(valObjArray[i].description)
        }

        // Once the values are changed, show the new item (actually at the end)
        setArray[lastTrue]()
    }

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

    return (
        <>
        <ExperienceDesc passUpwards={getRefsFromChild} delDesc={() => {removeBullet(0, setArray, bulletArray)}} addDesc={() => {showBullet(0, setArray, bulletArray)}} idx={0} shown={true}></ExperienceDesc>
        <ExperienceDesc passUpwards={getRefsFromChild} delDesc={() => {removeBullet(1, setArray, bulletArray)}} addDesc={() => {showBullet(1, setArray, bulletArray)}} idx={1} shown={show1}></ExperienceDesc>
        <ExperienceDesc passUpwards={getRefsFromChild} delDesc={() => {removeBullet(2, setArray, bulletArray)}} addDesc={() => {showBullet(2, setArray, bulletArray)}} idx={2} shown={show2}></ExperienceDesc>
        <ExperienceDesc passUpwards={getRefsFromChild} delDesc={() => {removeBullet(3, setArray, bulletArray)}} addDesc={() => {showBullet(3, setArray, bulletArray)}} idx={3} shown={show3}></ExperienceDesc>
        <ExperienceDesc passUpwards={getRefsFromChild} delDesc={() => {removeBullet(4, setArray, bulletArray)}} addDesc={() => {showBullet(4, setArray, bulletArray)}} idx={4} shown={show4}></ExperienceDesc>
        <ExperienceDesc passUpwards={getRefsFromChild} delDesc={() => {removeBullet(5, setArray, bulletArray)}} addDesc={() => {showBullet(5, setArray, bulletArray)}} idx={5} shown={show5}></ExperienceDesc>
        <br/>
        <br/>
        <br/>
        <input ref={organization} placeholder={`organization 1`}></input>
        <input ref={title} placeholder={`title 1`}></input>
        <input ref={location} placeholder={`location 1`}></input>
        <input ref={startDate} placeholder={`start date 1`}></input>
        <input ref={endDate} placeholder={`end date 1`}></input>
        <button onClick={() => { updateKeyedObjectSection([{
            organization: organization.current.value,
            title: title.current.value,
            location: location.current.value,
            startDate: startDate.current.value,
            endDate: endDate.current.value,
            description: convertDescsToCSV(valObjArray)
        }], 'experiences') }}>Update Experiences</button>
        </>
    )
}

export default Experience