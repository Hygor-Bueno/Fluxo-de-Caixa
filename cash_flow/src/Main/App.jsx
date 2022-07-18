import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter } from 'react-router-dom';

import Logo from '../Components/Templates/Logo';
import Nav from '../Components/Templates/Nav';
import RootRoute from './AppRoutes';
import Footer from '../Components/Templates/Footer';
import ItemMenu from '../Components/ItemMenu/ItemMenu';

export default function App(props) {
    return (
        <BrowserRouter>
            <div className="app">
                <Logo />
                <Nav>
                    <ItemMenu pathItem="/" classItem="fa fa-home" textItem="Início" />
                    <ItemMenu pathItem="/Logs" classItem="fa fa-paste" textItem="Registro" />
                </Nav>
                <RootRoute />
                <Footer />
            </div>
        </BrowserRouter>
    )
}