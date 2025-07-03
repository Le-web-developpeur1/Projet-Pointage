import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home';
import FromEtudiant from './pages/FormEtudiant';
import DefinitionMdp from './pages/DefinitionMdp'
import PageAAdmin from './pages/PageAAdmin';
import Inscription from './pages/Inscription';
import Historique from './pages/Hisorique';
import SideBar from './components/Sidebar';
import ListEtudiant from './pages/ListEtudiant';
import Dashboard from './pages/Dashboard';
import Presences from './pages/Presences';
import Absences from './pages/Absences';
import ForgotPassword from './pages/ForgotPassword';

const App: React.FC =  () => {
 
  return (
    <Router>
        <Routes>
          <Route path="/definitionmdp" element={<DefinitionMdp/>}/>
          <Route path="/inscription" element={<Inscription/>}/>
          <Route path="/" element={<Login/>} />
          <Route path="/definitionmdp" element={<DefinitionMdp/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/formetudiant" element={<FromEtudiant/>} />
          <Route path="/pageaadmin" element={<PageAAdmin/>}/>
          <Route path='/historique' element={<Historique/>}/>
          <Route path='/sidebar' element={<SideBar/>}/>
          <Route path='/listetudiant' element={<ListEtudiant/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/presences' element={<Presences/>}/>
          <Route path='/absences' element={<Absences/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        </Routes>
    </Router>
  )
}

export default App