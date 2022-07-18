import React, { useEffect, useState } from 'react';
import Main from '../Templates/Main';
import { IndexedDB } from '../../Utils/IndexedDB.js';
import './Home.css';
import InputForm from '../InputForm';
import { toDay } from "../../Utils/UtilsJS.js";

var inputForm = [
    {
        labelIput: "Descrição",
        idInput: "descFormItem",
        classInput: "",
        classLabel: "col-auto my-1",
        typeInput: "text",
        titleInput: "Insira a descrição da movimentação.",
        placeholderInput: "Descrição."
    },
    {
        labelIput: "Valor R$ :",
        idInput: "valueFormItem",
        classLabel: "col-auto my-1",
        typeInput: "number",
        titleInput: "Insira o valor da movimentação",
        placeholderInput: "valor"
    },
    {
        labelIput: "Data:",
        idInput: "dateFormItem",
        classLabel: "col-auto my-1",
        typeInput: "date",
        titleInput: "Escolha a data da movimentação",
        placeholderInput: "valor",
        valueInput: toDay()
    }
]
export default function Home() {
    // console.log(today)
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
            <form className="d-flex">
                {inputForm.map((form, index) =>
                    <InputForm key={`input_${index}`} {...form} />
                )}
                <select id="controllerFormItem" className="col-auto mx-2">
                    <option value="prohibited">Entrada</option>
                    <option value="exit">Saída</option>
                </select>
                <button className="mx-2" type="button" onClick={() => { addMoviment(list) }}>Salvar</button>
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
    function addMoviment(list) {
        let desc, value, select;
        
        desc = document.getElementById("descFormItem").value;
        value = document.getElementById("valueFormItem").value;
        select = document.getElementById("controllerFormItem").value;

        let item = maskItem();
        item.description = desc;
        item[select] = value;
        console.log(item);
        // teste.addData();
    }
    function maskItem(){
        return {
            cashier: "",
            date: "",
            description: "",
            exit: "",
            prohibited: ""
        }
    }
}

