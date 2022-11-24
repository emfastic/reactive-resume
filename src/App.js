import './App.css';
import SignIn from './components/SignIn.jsx'
import Profile from './components/Profile.jsx';
import Experience from './components/resume_items/Experience.jsx'
import Education from './components/resume_items/Education.jsx';
import CreateResume from './components/CreateResume.jsx';
import Skills from './components/resume_items/Skills.jsx';
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { auth, provider, validateBCEmail, writeUserData, dbRef } from './server/index.js';
import { onValue, child } from 'firebase/database';
import { signInWithPopup } from 'firebase/auth';

function App() {
  const [currentUser, setCurrentUser] = useState();

  function handleSignIn() {
    signInWithPopup(auth, provider)
    .then((result) => {
    
    // The signed-in user info.
    const user = result.user;

    onValue(child(dbRef, `users/${user.uid}`), snapshot => {
        if (snapshot.exists()) {
          setCurrentUser(snapshot.val())
        } else if (validateBCEmail(user.email)) {
                writeUserData(user)
                setCurrentUser(snapshot.val())
        }
    })
    })
}

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<SignIn signIn={handleSignIn}/>}></Route>
        <Route exact path='/profile' element={<Profile/>}></Route>
        <Route exact path='/education' element={<Education/>}></Route>
        <Route exact path='/build' element={<Experience/>}></Route>
        <Route exact path='/create' element={<CreateResume/>}></Route>
        <Route exact path='/skills' element={<Skills/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
