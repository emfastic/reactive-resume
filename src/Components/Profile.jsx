import React, { useRef } from "react";
import { updateProfile } from "../server/index";
import TextInput from "./TextInput";

function Profile() {
    const firstName = useRef(null);
    const lastName = useRef(null);
    const phoneNumber = useRef(null);
    const alternativeEmail = useRef(null);
    const website = useRef(null);

        // <input ref={lastName} placeholder="last name"></input>
        // <input ref={phoneNumber} placeholder="phone number"></input>
        // <input ref={alternativeEmail} placeholder="email"></input>
        // <input ref={website} placeholder="website"></input>
        // <button onClick={() => updateProfile(firstName.current.value, lastName.current.value, phoneNumber.current.value, alternativeEmail.current.value, website.current.value)}>Update Profile</button>

    return (
        <>
        <div className="container">
        <div className="prompt-header">Create Profile</div>
        <form className="profile-form">
        <TextInput label="first name"></TextInput>
        <TextInput label="last name"></TextInput>
        <TextInput label="phone number"></TextInput>
        <span className="testing"><span>testing</span></span>
        </form>
        </div>
        </>
    );
};

export default Profile;
