import "./App.scss";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Main from "./features/components/Main";
import { Login } from "./features/components/Login";
import PrivateRoute from "./features/components/PrivateRoute";
import Profile from "./features/components/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/home' element={<PrivateRoute ><Main /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute ><Profile /></PrivateRoute>} />
        <Route path="/contact" element={<p>maybe an about page</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
