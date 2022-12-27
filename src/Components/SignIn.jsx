import React, { useEffect, useRef } from "react";
// import { handleSignIn } from '../server/index'
import stem from "../assets/stem-resume.png";
import business from "../assets/business-resume.png";
import business2 from "../assets/business-resume2.png";
import comm from "../assets/communication-resume.png";
import "../sass/layout/signin.scss";
import { animated, useSpring } from "react-spring";
import { useScroll } from "react-use-gesture";
import { useNavigate } from "react-router-dom";

const resumes = [business, comm, stem, business2];

function SignIn(props) {
  const navigate = useNavigate();

  props.passUpwards({
    profile: () => navigate("/profile"),
    build: () => navigate("/build"),
  });

  // used to scroll to end so user knows it's scrollable
  const beg = useRef(null);
  const end = useRef(null);

  // scroll on render; wait so that user sees the effect and then scroll back to beg
  useEffect(() => {
    setTimeout(() => {
      end.current.scrollIntoView({ behavior: "smooth" });
    }, 500);
    setTimeout(() => {
      beg.current.scrollIntoView({ behavior: "smooth" });
    }, 2100);
  }, []);

  // make sure scroll turn doesn't exceed 30 deg
  const clamp = (value, clampAt = 30) => {
    if (value > 0) {
      return value > clampAt ? clampAt : value;
    } else {
      return value < -clampAt ? -clampAt : value;
    }
  };

  // add 3D effect on scroll
  const [style, set] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)",
  }));

  // turn elements on scroll
  const bind = useScroll((event) => {
    set({
      transform: `perspective(500px) rotateY(${
        event.scrolling ? clamp(event.delta[0]) : 0
      }deg)`,
    });
  });

  // handle sign in and redirect
  // TODO: pass user data to other components?

  return (
    <>
      <div className="page-left">
        <div className="title">Reactive Resume</div>
        <div className="tagline">
          Generate a resume without the pain of formatting.
        </div>
        <div className="img-container" {...bind()}>
          <div ref={beg}></div>
          {resumes.map((src) => (
            <animated.div
              key={src}
              className="resume"
              style={{
                ...style,
                backgroundImage: `url(${src})`,
              }}
            />
          ))}
          <div ref={end}></div>
        </div>
      </div>
      <div className="page-right">
        <div onClick={props.handleSignIn} className="signin-button login">
          Continue with Google
        </div>
        <div className="signup-subtext">
          <span className="text">No account? Sign up with </span>
          <span onClick={props.handleSignIn} className="google">
            Google
          </span>
        </div>
      </div>
    </>
  );
}

export default SignIn;
