import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer, toast } from "react-toastify";


import React from 'react'
import Router from './Router';

export const App = () => {
  return (
    <Provider store={store}>
       <ToastContainer />
   <Router/>
   </Provider>
  )
}

export default App;