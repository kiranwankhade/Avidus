import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import SignUp from '../Pages/SignUp';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import User from '../Pages/User';
import SinglePage from '../Pages/SinglePage';

const AllRoutes = () => {
  return (
    <div>                          
            <Routes>                     
                <Route path="/" element={<Login/>}/> 
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/user" element={<User/>}/>
                <Route path="/singlepage/:id" element={<SinglePage/>}/>
                
            </Routes>  
      </div>
  )
}

export default AllRoutes