import React, { useEffect }  from 'react'
import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import './App.css'
import BookTable from './components/BookTable';
import Header from './components/Header'
import { authActions } from './components/Store';
import { useDispatch, useSelector } from 'react-redux';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Forgotpw from './components/Auth/Forgotpw';

function App() {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn)
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
      <Routes>
      
      {!isLoggedIn ? (<>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/forgotpw' element={<Forgotpw/>}/>
      </>):
      (<Route path='/dashboard' element={<BookTable/>} />) }
      </Routes>
      <Toaster/>
      </main>
    </>
  )
}

export default App
