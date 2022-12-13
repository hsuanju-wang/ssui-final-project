import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDawFOTlZsYpBIjXYXe6ecHHeVlALRT2MI",
  authDomain: "ssui-final-perspectiveai.firebaseapp.com",
  projectId: "ssui-final-perspectiveai",
  storageBucket: "ssui-final-perspectiveai.appspot.com",
  messagingSenderId: "531913995213",
  appId: "1:531913995213:web:be7b8ad373ad7a480f4a84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <HashRouter>
        <App app = {app}/>
      </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
