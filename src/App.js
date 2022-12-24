import './App.css';
import SignIn from './components/SignIn.jsx'
import Profile from './components/Profile.jsx';
import Build from './components/Build.jsx';
import CreateResume from './components/CreateResume.jsx';
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { auth, provider, validateBCEmail, writeUserData, dbRef } from './server/index.js';
import { onValue, child } from 'firebase/database';
import { signInWithPopup } from 'firebase/auth';

function App() {
  const [navState, setNavState] = useState()
  const [userState, setUserState] = useState()

  function handleSignIn() {
    signInWithPopup(auth, provider)
    .then((result) => {
    
    // The signed-in user info.
    const user = result.user;

    // read data on update; navigate to build if user has account, otherwise navigate to profile to begin signup
    onValue(child(dbRef, `users/${user.uid}`), snapshot => {
        if (snapshot.exists()) {
          navState.build()
          setUserState(snapshot.val())
        } else if (validateBCEmail(user.email)) {
          writeUserData(user)
          navState.profile()
          setUserState(snapshot.val())
        }
    })
    })  
  }

  function getNavigate(navigateObj) {
    setNavState(navigateObj)
  }

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<SignIn handleSignIn={handleSignIn} passUpwards={getNavigate}/>}></Route>
        <Route exact path='/profile' element={<Profile/>}></Route>
        <Route exact path='/build' element={<Build user={userState}/>}></Route>
        <Route exact path='/create' element={<CreateResume/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
