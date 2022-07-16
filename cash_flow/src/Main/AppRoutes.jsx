import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from '../Components/Home/Home';
import Logs from '../Components/Logs/Logs';


export default function RootRoute(props) {
    return (
        <Routes>
            <Route exact path="/" element={< Home />} />
            <Route path="/logs" element={<Logs />} />
            <Route to="/" element={<Home />} />
        </Routes>
    )
}