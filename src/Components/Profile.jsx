import React, { useRef } from "react";
import { updateProfile } from "../server/index";

function Profile() {
    const firstName = useRef(null);
    const lastName = useRef(null);
    const phoneNumber = useRef(null);

    return (
        <>
        <input ref={firstName} placeholder="first name"></input>
        <input ref={lastName} placeholder="last name"></input>
        <input ref={phoneNumber} placeholder="phone number"></input>
        <button onClick={() => updateProfile(firstName.current.value, lastName.current.value, phoneNumber.current.value)}>Update Profile</button>
        </>
    );
};

export default Profile;
