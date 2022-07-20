import React, { useEffect, useState } from 'react';
import Main from '../Templates/Main';
import { IndexedDB } from '../../Utils/IndexedDB.js';
import './Home.css';
import { toDay,convertDateToBrazil } from "../../Utils/UtilsJS.js";



export default function Home() {
    var idb = new IndexedDB();
    var [list, setList] = useState([])
    var [footer, setFooter] = useState({})
    var [nav, setNav] = useState([{}])
    var inputForm = [
        {
            position: "0",
            labelIput: "Descrição",
            idInput: "descFormItem",
            classInput: "",
            classLabel: "col-auto my-1",
            typeInput: "text",
            titleInput: "Insira a descrição da movimentação.",
            placeholderInput: "Descrição."
        },
        {
            position: "1",
            labelIput: "Valor R$:",
            idInput: "valueFormItem",
            classLabel: "col-auto my-1",
            typeInput: "number",
            titleInput: "Insira o valor da movimentação",
            placeholderInput: "valor"
        },
        {
            position: "2",
            labelIput: "Data:",
            idInput: "dateFormItem",
            classLabel: "col-auto my-1",
            typeInput: "date",
            titleInput: "Escolha a data da movimentação",
            placeholderInput: "valor"
        }
    ]

    let fetchdata = async () => {
        await idb.createDB();
        let list = await idb.getAllData();

        setNav([...inputForm]);
        setFooter(calculateList(list));
        setList(list);
    }

    function calculateList(list) {
        const values = filterList(list);
        let calc = [];
        let total = 0;
        let object = {}
        Object.keys(values).forEach(item => { calc.push(calculate(values[item], item)) })
        calc.forEach(item => {
            if (Object.keys(item)[0] === 'exit') {
                total -= item.exit
                object.exit = item.exit;
            } else if (Object.keys(item)[0] === 'prohibited') {
                total += item.prohibited
                object.prohibited = item.prohibited;
            } else {
                total += item.cashier
                object.cashier = item.cashier;
            }
        })
        object.cashier = total;
        return object;
    }

    function calculate(items, key) {
        let calc = 0;
        let object = {};
        items.forEach(item => {
            calc += parseFloat(item[key]);
        })
        object[key] = calc;
        return object;
    }

    function filterList(list) {
        let prohibited, exit, cashier;
        prohibited = list.filter(item => item.prohibited !== "");
        exit = list.filter(item => item.exit !== "");
        cashier = list.filter(item => item.cashier !== "");
        return { prohibited, exit, cashier }
    }

    useEffect(() => {
        fetchdata();
    }, []);

    useEffect(() => {
        console.log(list);
        console.log(footer);
        console.log(nav);
    }, [list, footer, nav]);

    function updateField(e, form) {
        let position = e.target.getAttribute("data-position");
        form.valueInput = e.target.value;
        nav[position] = form
        console.log(e.target.value, nav)

        setNav([...nav])
    };
    return (
        <Main icon="home" title="Início" subtitle="Sistema de auxílio e controle aos gastos financeiros">
            <h1>Bem Vindos ao Mercurius...</h1>
            <hr />
            <form className="d-flex flex-column flex-sm-row align-items-sm-end col-6 col-sm-12">
                {nav.map((form, index) =>
                    <span key={`input_${index}`} >
                        <label className={form.classLabel !== "" ? form.classLabel : ""}>
                            <b>{form.labelIput}</b>
                        </label>
                        <input onChange={e => updateField(e, form)} data-position={form.position} id={form.idInput !== "" ? form.idInput : ""} className={form.classInput !== "" ? form.classInput : ""} type={form.typeInput} title={form.titleInput} placeholder={form.placeholderInput !== "" ? form.placeholderInput : ""} />
                    </span>
                )}
                <select id="controllerFormItem" className="col-auto mx-sm-2">
                    <option value="prohibited">Entrada</option>
                    <option value="exit">Saída</option>
                </select>
                <button className="mx-sm-2" type="button" onClick={() => { addMoviment() }}>Salvar</button>
            </form>
            <hr />

            <div id="divTable">
                <table id="tableHome" className="table table-reponsive">
                    <thead>
                        <tr>
                            <th scope="col">Nº</th>
                            <th scope="col">Data</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Entrada</th>
                            <th scope="col">Saída</th>
                            <th scope="col">Caixa</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((item) => {
                                let element="";
                                if (item.month === toDay().split("-")[1]) {
                                    element = <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td>{convertDateToBrazil(item.date)}</td>
                                        <td>{item.description}</td>
                                        <td>{item.prohibited}</td>
                                        <td>{item.exit}</td>
                                        <td>{item.cashier}</td>
                                        <td className="d-flex justify-content-sm-center">
                                            <button type="button" className="btn btn-danger" title="Excluir linha" onClick={() => deleteItem(item.id)}><b>Delete</b></button>
                                        </td>
                                    </tr>
                                }
                                return element;
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>#</td>
                            <td>-</td>
                            <td>Totais</td>
                            <td>{footer.prohibited}</td>
                            <td>{footer.exit}</td>
                            <td>{footer.cashier}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <p className="mb-0">Sistema de auxílio e controle aos gastos financeiros.</p>
        </Main >
    )
    async function addMoviment() {
        let desc, value, select, dateNew;

        desc = document.getElementById("descFormItem").value;
        value = document.getElementById("valueFormItem").value;
        select = document.getElementById("controllerFormItem").value;
        dateNew = document.getElementById("dateFormItem").value;

        let item = maskItem();
        item.description = desc;
        item[select] = value;
        item.date = dateNew;
        item.month = dateNew.split("-")[1];
        item.year = dateNew.split("-")[0];

        await idb.createDB();
        idb.addData(item);
        await fetchdata();
        clear();
    }
    function clear() {
        document.getElementById("descFormItem").value = "";
        document.getElementById("valueFormItem").value = "";
        document.getElementById("controllerFormItem").value = "prohibited";
        document.getElementById("dateFormItem").value = "";
    }
    function maskItem() {
        return {
            cashier: "",
            date: "",
            description: "",
            exit: "",
            prohibited: "",
            month: "",
            year: ""
        }
    }
    async function deleteItem(id) {
        await idb.createDB();
        idb.deleteData(id);
        fetchdata();
    };
}

