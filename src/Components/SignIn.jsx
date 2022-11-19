import React from "react";
import { handleSignIn } from '../server/index'
import pencil from './../assets/pencil.png'
import build from './../assets/build.png'
import diamond from './../assets/diamond.png'
import "../sass/layout/signin.scss"


function SignIn() {

    return (
        <>
        <div className="title">Reactive Resume</div>
        <div className="tagline">Generate a resume without the pain of formatting.</div>
        <img src={pencil} className="pencil"/>
        <span className="main-point">TRACK</span>
        <span className="point-desc">experiences across multiple fields</span>
        <br/>
        <img src={build} className="build"/>
        <span className="main-point">BUILD</span>
        <span className="point-desc">one section at a time</span>
        <br/>
        <img src={diamond} className="diamond"/>
        <span className="main-point">CREATE</span>
        <span className="point-desc">professional resumes</span>
        <br/>
        <button onClick={handleSignIn}>Sign Up with Google</button>
        <button onClick={handleSignIn}>Login with Google</button>
        </>
    )
};

export default SignIn;