import React from 'react';
import { Link } from "react-router-dom";

export default function ItemMenu(props) {
    return(
        <Link to={props.pathItem}>
            <i className={props.classItem}></i> <strong>{props.textItem}</strong>
        </Link>
    )
}