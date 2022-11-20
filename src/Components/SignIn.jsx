import React from "react";
import { handleSignIn } from '../server/index'
import pencil from './../assets/pencil.png'
import build from './../assets/build.png'
import diamond from './../assets/diamond.png'
import "../sass/layout/signin.scss"


function SignIn() {

    return (
        <>
        <div className="page-left">
        <div className="title">Reactive Resume</div>
        <div className="tagline">Generate a resume without the pain of formatting.</div>
        <span className="test">
        <img src={pencil} className="pencil"/>
        <span className="main-point">TRACK</span>
        <span className="point-desc">experiences across multiple fields</span>
        </span>
        <br/>
        <span className="test">
        <img src={build} className="build"/>
        <span className="main-point">BUILD</span>
        <span className="point-desc">one section at a time</span>
        </span>
        <br/>
        <span className="test">
        <img src={diamond} className="diamond"/>
        <span className="main-point">CREATE</span>
        <span className="point-desc">professional resumes</span>
        </span>
        </div>
        <div className="page-right">
        <a onClick={handleSignIn} className="signin-button login">Login with Google</a>
        <div className="signup">
        <text className="text">No account? Sign up with </text><a onClick={handleSignIn} className="google">Google</a>
        </div>
        </div>
        </>
    )
};

export default SignIn;