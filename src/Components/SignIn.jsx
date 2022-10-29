import React from "react";
import { handleSignIn } from '../server/index'


function SignIn() {
    return (
        <button onClick={handleSignIn}>Sign In Here</button>
    )
};

export default SignIn;