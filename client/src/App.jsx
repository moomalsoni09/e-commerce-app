import './App.css'
import {useState,useEffect } from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import axios from "axios";
import Header from './component/header';
import HomePage from './component/homePage';
import LoginPage from './component/loginPage';


function App() {
  useEffect(()=>{
    const fetchProductsData = async()=>{
      //axios
      let res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/product`);

      console.log(res.data);
    }
    fetchProductsData();
  },[]);
  
  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage/>} path="/" />
          <Route element={<LoginPage/>} path="/login" />
        </Routes>      
      </BrowserRouter>
    </>
  )
}
export default App;