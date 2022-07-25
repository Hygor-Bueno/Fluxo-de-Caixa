import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from '../Components/Home/Home';
import Logs from '../Components/Logs/Logs';
import Purchases from '../Components/Purchases/Purchases'


export default function RootRoute(props) {
 
    return (
        <Routes>
            <Route exact path="index.html/" element={< Home />} />
            <Route path="index.html/logs" element={<Logs />} />
            <Route path="index.html/purchases" element={<Purchases />} />
            <Route to="index.html/" element={<Home />} />
        </Routes>
    )
}