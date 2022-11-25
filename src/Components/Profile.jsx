import React, { useRef, useState } from "react";
import { updateProfile } from "../server/index";
import TextInput from "./TextInput";
import { Navigate } from 'react-router-dom';

function Profile() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneNumRef = useRef();
    const [eduDirect, setEduDirect] = useState(false)

    if (eduDirect) {
        return <Navigate to="/build"></Navigate>
    }

    function handleProfileSubmit() {

        // Retrieve values from fancy inputs
        const firstName = firstNameRef.current.getValue();
        const lastName = lastNameRef.current.getValue();
        let phoneNum = phoneNumRef.current.getValue();

        // strip phone formatting for update
        phoneNum = phoneNum.replace(/\D/g, '');

        if (localStorage.getItem('firstName') !== firstName || localStorage.getItem('lastName') !== lastName || localStorage.getItem('phoneNum') !== phoneNum) {
            // update local storage and profile; not concerned with costs bc time cost of local storage is neglible and firebase charges as 1 write per op not per item
            localStorage.setItem('firstName', firstName)
            localStorage.setItem('lastName', lastName)
            localStorage.setItem('phoneNum', phoneNum)
            updateProfile(firstName, lastName, phoneNum);
        }

        setEduDirect(true)
    }

    return (
        <>
        <div className="container">
        <span className="prompt-header">Create Profile</span>
        <form className="profile-form">
        <TextInput label="First Name" ref={firstNameRef}></TextInput>
        <TextInput label="Last Name" ref={lastNameRef}></TextInput>
        <TextInput label="Phone Number" ref={phoneNumRef} phone="true"></TextInput>
        <span className="submit-container">
        <span className="submit-button" onClick={handleProfileSubmit}>Next</span>
        </span>
        </form>
        </div>
        </>
    );
};

export default Profile;
