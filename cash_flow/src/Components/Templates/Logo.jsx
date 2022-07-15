import React from 'react';
import './Logo.css';
import logo from '../../Assets/imgs/Mercurius196.png'
import { Link } from "react-router-dom";


export default function Logo(props) {
    return (
        <aside className="logo">
            <Link to="/" className="logo">
                <img src={logo} alt="" />
            </Link>
        </aside>
    )
}