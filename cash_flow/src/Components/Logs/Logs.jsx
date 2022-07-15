import React from 'react';
import Main from '../Templates/Main'

export default function Logs(props) {
    return (
        <Main icon="paste" title="Registro" subtitle="Verifique os registros dos seus gastos financeiros...">
            <div className="display-4">Registros Financeiros</div>
            <hr />
            <p className="mb-0">Realize a verificação das suas finanças em meses anteriores...</p>
        </Main>
    )
}