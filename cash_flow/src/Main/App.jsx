import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {BrowserRouter} from 'react-router-dom';

import Logo from '../Components/Templates/Logo';
import Nav from '../Components/Templates/Nav';
import RootRoute from './AppRoutes';
import Footer from '../Components/Templates/Footer';

export default function App(props){
    return (
        <BrowserRouter>
            <div className="app">
                <Logo/>
                <Nav/>
                <RootRoute />
                <Footer/>
            </div>
        </BrowserRouter>
    )
}