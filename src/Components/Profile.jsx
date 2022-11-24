import React, { useRef } from "react";
import { updateProfile } from "../server/index";
import TextInput from "./TextInput";

function Profile() {
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const phoneNumRef = useRef();

    function handleProfileSubmit() {
        const firstName = firstNameRef.current.getValue();
        const lastName = lastNameRef.current.getValue();
        let phoneNum = phoneNumRef.current.getValue();

        // strip phone formatting for update
        phoneNum = phoneNum.replace(/\D/g, '');

        updateProfile(firstName, lastName, phoneNum);
    }

    return (
        <>
        <div className="container">
        <span className="prompt-header">Create Profile</span>
        <form className="profile-form">
        <TextInput label="First Name" ref={firstNameRef} phone={false}></TextInput>
        <TextInput label="Last Name" ref={lastNameRef} phone={false}></TextInput>
        <TextInput label="Phone Number" ref={phoneNumRef} phone={true}></TextInput>
        <span className="submit-container">
        <span className="submit-button" onClick={handleProfileSubmit}>Next</span>
        </span>
        </form>
        </div>
        </>
    );
};

export default Profile;
