import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import Peridct from './components/Predict.js';
import ImageRetrival from './components/ImageRetrival.js';

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Navbar />}  >
            <Route path="/" exact element={<Home />} />
            <Route path="/Login" exact element={<Login />} />
            <Route path="/SignUp" exact element={<SignUp />} />
            <Route path="/Predict" exact element={<Peridct />} />
            <Route path="/ImageRetrival" exact element={<ImageRetrival />} />
          </Route>
        </Routes>
      </Router>
      <Footer></Footer>
      {/* <AdminPage></AdminPage> */}
    </>
  )
}
