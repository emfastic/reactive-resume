import './App.css';
import SignIn from './components/SignIn.jsx'
import Profile from './components/Profile.jsx';
import Experience from './components/resume_items/Experience.jsx'
import Education from './components/resume_items/Education.jsx';
import CreateResume from './components/CreateResume.jsx';
import Skills from './components/resume_items/Skills.jsx';
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<SignIn/>}></Route>
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
