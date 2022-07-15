import React from 'react';
import './Nav.css';
import { Link } from "react-router-dom";

export default function Nav(props) {
    return (
        <aside className="menu-area">
            <nav className="menu">
                {/* Refatora no fim do projeto... Criar componente NavItem*/}
                <Link to="/">
                    <i className="fa fa-home"></i> Inicio
                </Link>
                <Link to="/Logs">
                    <i className="fa fa-users"></i> Registros
                </Link>
            </nav>
        </aside>
    )
}

