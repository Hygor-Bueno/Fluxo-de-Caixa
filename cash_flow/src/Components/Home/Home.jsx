import React from 'react';
import Main from '../Templates/Main'

export default function Home(props){
    return(
        <Main icon="home" title="Início" subtitle="Sistema de auxílio e controle aos gastos financeiros">
            <div className="display-4">Bem Vindos ao Mercurius...</div>
            <hr />
            <p className="mb-0">Sistema de auxílio e controle aos gastos financeiros</p>
        </Main>
    )
}