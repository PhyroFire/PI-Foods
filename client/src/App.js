import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from "react";

import LandingPage from './Components/LandingPage.jsx'
import Home from './Components/Home.jsx'
import About from './Components/About.jsx';
import RecipeDetail from './Components/RecipeDetail.jsx'
import CreateRecipe from './Components/CreateRecipe.jsx'


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About/>} />
        <Route path='/recipe/:id' element={<RecipeDetail />} />
        <Route path='/createRecipe' element={<CreateRecipe/>} />
      </Routes>
    </Router>
  );
}

export default App;