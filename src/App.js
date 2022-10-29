import './App.css';
import SignIn from './Components/SignIn.jsx'
import Profile from './Components/Profile.jsx';
import Experiences from './Components/ResumeItems/Experiences.jsx'
import Education from './Components/ResumeItems/Education.jsx';
import CreateResume from './Components/CreateResume.jsx';
import Skills from './Components/ResumeItems/Skills.jsx';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<SignIn/>}></Route>
        <Route exact path='/signup' element={<SignIn/>}></Route>
        <Route exact path='/profile' element={<Profile/>}></Route>
        <Route exact path='/build' element={<Experiences/>}></Route>
        <Route exact path='/create-resume' element={<CreateResume/>}></Route>
        <Route exact path='/skills' element={<Skills/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
