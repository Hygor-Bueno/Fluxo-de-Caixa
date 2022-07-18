import React, { useEffect, useState } from 'react';
import Main from '../Templates/Main';
import { IndexedDB } from '../../Utils/IndexedDB.js';
import './Home.css';
export default function Home() {
    let teste = new IndexedDB();
    var [list, setList] = useState([])
    let fetchdata = async () => {
        await teste.createDB();
        let list = await teste.getAllData();
        setList(list)
    }
    useEffect(() => {
        fetchdata();
    }, [])
    useEffect(() => {
        console.log(list);
    }, [list])

    return (
        <Main icon="home" title="Início" subtitle="Sistema de auxílio e controle aos gastos financeiros">
            <h1>Bem Vindos ao Mercurius...</h1>
            <hr />
                <form>
                    
                </form>
            <hr />
            <div id="divTable">
                <table id="tableHome" className="table table-reponsive">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nº</th>
                            <th scope="col">Data</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Entrada</th>
                            <th scope="col">Saída</th>
                            <th scope="col">Caixa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((item) => (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.date}</td>
                                    <td>{item.description}</td>
                                    <td>{item.prohibited}</td>
                                    <td>{item.exit}</td>
                                    <td>{item.cashier}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>#</td>
                            <td>-</td>
                            <td>Totais</td>
                            <td>100</td>
                            <td>100</td>
                            <td>100</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {/* <p className="mb-0">Sistema de auxílio e controle aos gastos financeiros</p> */}
        </Main >
    )
}