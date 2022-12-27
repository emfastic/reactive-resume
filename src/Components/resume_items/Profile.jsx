import React, { useRef } from "react";
import { updateProfile } from "../../server/index.js";
import TextInput from "../TextInput";
import "../../sass/layout/education.scss";

function Profile(props) {
  let firstNameRef = useRef();
  let lastNameRef = useRef();
  let emailRef = useRef(props.user !== null ? props.user.email : "");
  let phoneNumberRef = useRef();
  let websiteRef = useRef();

  function handleSubmit() {
    let phoneNumber = phoneNumberRef.current.getValue().replace(/\D/g, "");

    updateProfile(
      firstNameRef.current.getValue(),
      lastNameRef.current.getValue(),
      phoneNumber,
      emailRef.current.getValue(),
      websiteRef.current.getValue()
    );
    props.changeState("experiences");
  }

  return (
    <div className="container">
      <form className="education-form profile">
        <TextInput
          className="normal-input"
          label="First Name"
          ref={firstNameRef}
          type="text"
        ></TextInput>
        <TextInput
          className="normal-input"
          label="Last Name"
          ref={lastNameRef}
          type="text"
        ></TextInput>
        <TextInput
          className="normal-input"
          label="Email"
          ref={emailRef}
          type="text"
        ></TextInput>
        <TextInput
          className="normal-input"
          label="Phone Number"
          ref={phoneNumberRef}
          type="text"
        ></TextInput>
        <TextInput
          className="normal-input"
          label="Website (LinkedIn)"
          ref={websiteRef}
          type="text"
        ></TextInput>
        <div className="submit-container">
          <span className="submit-button" onClick={handleSubmit}>
            Next
          </span>
        </div>
      </form>
    </div>
  );
}

export default Profile;
