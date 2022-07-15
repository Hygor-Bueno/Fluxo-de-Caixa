import React from 'react';
import './Nav.css';
import {childrenWithProps} from '../../Utils/Utils';

export default function Nav(props) {
    return (
        <aside className="menu-area">
            <nav className="menu">
                {
                    childrenWithProps(props)
                }
            </nav>
        </aside>
    )
}

