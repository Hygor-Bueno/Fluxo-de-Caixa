import React from 'react';
import Main from '../Templates/Main'

export default function Logs(props) {
    return (
        <Main icon="paste" title="Registro" subtitle="Verifique os registros dos seus gastos financeiros...">
            <h1>Registros Financeiros</h1>
            <hr />
            <p className="mb-0">Realize a verificação das suas finanças em meses anteriores...</p>
        </Main>
    )
}