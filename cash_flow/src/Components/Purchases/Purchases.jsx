import React, { useState, useEffect } from 'react';
import Option from '../Option'
import Main from '../Templates/Main';
import inputFormPurchase, { inputFooterPurchase, optionSelectFormPurchase } from './PurchasesSettings.js'
import './Purchases.css';
import { IndexedDB } from '../../Utils/IndexedDB';
import { toDay } from '../../Utils/UtilsJS.js'

export default function Purchases(props) {
    var [inputForm, setInputForm] = useState([]);
    var [inputFooter, setInputFooter] = useState([]);
    var [optionForm, setOptionForm] = useState("default");
    const [list, setList] = useState([]);
    var [total, setTotal] = useState(0);
    var idb = new IndexedDB();

    var maskItem = {
        description: "",
        quantity: "",
        price: "",
        section: "",
        status: "1"
    }
    var maskRegister = {
        cashier: "",
        date: "",
        description: "",
        exit: "",
        prohibited: "",
        month: "",
        year: ""
    }
    async function getData() {
        await idb.createDB();
        let data = await idb.getAllData("purchase");

        setList(data);
        setInputForm([...inputFormPurchase]);
        setInputFooter(inputFooterPurchase);
        subTotal(data);
    }

    useEffect(() => {
        getData();
    }, [])
    // useEffect(() => {
    //     console.log(inputForm, optionForm, total, list)
    // }, [inputForm, optionForm, total, list])
    return (
        <Main icon="file" title="Lista de Compras" subtitle="Facilite suas compras e tenha sempre o controle dos seus gastos nas palmas de suas mãos">
            <h1>Bem vindo a lista de compras</h1>
            <hr />
            <form className="d-flex flex-column flex-sm-row align-items-sm-end col-6 col-sm-12">
                {inputForm.map(input =>
                    <span key={input.position}>
                        <label className={input.classLabel !== "" ? input.classLabel : ""}><b>{input.labelIput}</b></label><input onChange={e => updateField(e, inputForm, setInputForm)} data-position={input.position} id={input.idInput !== "" ? input.idInput : ""} className={input.classInput !== "" ? input.classInput : ""} value={input.valueInput} type={input.typeInput} title={input.titleInput} placeholder={input.placeholderInput !== "" ? input.placeholderInput : ""} disabled={input.disabledInput} />
                    </span>
                )}
                <select name="Setores" onChange={(e) => clearSelect(e)} value={optionForm}>
                    {
                        optionSelectFormPurchase.map((option, index) => <Option key={index}{...option} />)
                    }
                </select>
                <button type="button" className="mx-2" onClick={() => { clear(); setOptionForm("default") }}>Limpar</button>
                <button type="button" className="mx-2" onClick={() => { addItemList() }}>Inserir</button>
            </form>
            <hr />
            <section>
                {renderTable()}
            </section>
            <hr />
            <footer>
                {
                    inputFooter.map(input =>
                        <span key={input.position}>
                            <label className={input.classLabel !== "" ? input.classLabel : ""}><b>{input.labelIput}</b></label><input onChange={e => updateField(e, inputFooter, setInputFooter)} onBlur={e => calcTotal(e.target.value)} data-position={input.position} id={input.idInput !== "" ? input.idInput : ""} className={input.classInput !== "" ? input.classInput : ""} value={input.valueInput} type={input.typeInput} title={input.titleInput} placeholder={input.placeholderInput !== "" ? input.placeholderInput : ""} disabled={input.disabledInput} />
                        </span>
                    )
                }
                <span>
                    <label className="col-auto my-1"><b>Valor Total:</b></label>
                    <input data-position="1" id="valueFormFinal" type="number" title="Insira o valor do Item" placeholder="R$ 0,00" disabled value={total} />
                </span>
                <button type="button" id="openModalButton" className="btn" data-toggle="modal" onClick={() => document.getElementById('ModalConfirm').setAttribute("style", "opacity: 1;display: block;background: rgba(0,0,0,.2);")} >
                    <b>Registrar</b>
                </button>
                {modal()}
            </footer>
        </Main>
    )
    function updateField(event, vMethods, method) {
        let position = event.target.getAttribute("data-position"), input = event.target;
        vMethods[position].valueInput = input.value
        method([...vMethods])
    }
    function enabledItem(e, index, key) {
        list[index][key] = e.target.value;
        setList([...list]);
        subTotal(list);
    }
    function clear() {
        inputForm[0].valueInput = ""
        inputForm[1].valueInput = ""
        inputForm[2].valueInput = ""
        setInputForm([...inputForm])
    }
    function clearSelect(event) {
        setOptionForm(event.target.value)
    }

    function calcTotal(value) {
        let result = 0
        subTotal(list)
        if (total !== 0 && value !== "") {
            result = (parseFloat(value) - parseFloat(total)).toFixed(2)
        } else if (value !== 0) {
            result = parseFloat(total).toFixed(2)
        }
        setTotal(result)
    }

    function subTotal() {
        setTotal(0);
        let result =calcList();
        if (inputFooter.length !== 0 && inputFooter[0].valueInput !== '') {
            setTotal((parseFloat(inputFooter[0].valueInput) - parseFloat(result)).toFixed(2))
        } else {
            setTotal(result.toFixed(2))
        }
    }
    function calcList(){
        console.log(list)
        let result = 0;
        list.forEach(item => {
            result += parseFloat(item.price || 0) * parseFloat(item.quantity || 0)
        })
        
        return result;
    }

    async function addItemList() {
        await idb.createDB();
        maskItem.description = inputForm[0].valueInput;
        maskItem.quantity = inputForm[1].valueInput;
        maskItem.price = inputForm[2].valueInput;
        maskItem.section = optionForm;

        idb.addData(maskItem, "purchase")
        clear();
        await getData();
    }

    function renderTable() {
        return (
            <table className="table  table-reponsive">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Setor</th>
                        <th>R$ (Uni)</th>
                        <th>QTD</th>
                        <th>Sub. Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        )
    }

    function renderRows() {
        return (
            list.map((item, index) =>
                <tr key={index}>
                    <td>{item.description}</td>
                    <td>{item.section}</td>
                    <td className="text-center"><input type="number" className="text-center p-0" onBlur={() => { update(item) }} onChange={(e) => enabledItem(e, index, 'price')} value={item.price} /></td>
                    <td className="text-center"><input type="number" className="text-center p-0" onBlur={() => { update(item) }} onChange={(e) => enabledItem(e, index, 'quantity')} value={item.quantity} /></td>
                    <td className="text-center subtotal">{(parseFloat(item.price || 0) * parseFloat(item.quantity || 0)).toFixed(2)}</td>
                    <td id="celButton">
                        <button className="btn-danger" onClick={() => {deleteForID(item.id); getData()}}> Deletar</button>
                    </td>
                </tr >
            )
        )
    }
    async function update(item) {
        await idb.createDB();
        idb.update(item, "purchase")
        console.log(item);
    }

    async function registerPurchases() {
        let input = document.getElementById("descriptionModalInput");
        let item = maskRegister;
        item.description = input.value;
        item.exit = calcList();
        item.date = toDay();
        item.month = toDay().split("-")[1];
        item.year = toDay().split("-")[0];

        await idb.createDB();
        await idb.addData(item, "cash_flow");
        await clearListDB()
        closeModal();
    }
    async function clearListDB() {
        list.forEach(async(item) => {
            await deleteForID(item.id)
        })
        getData();
    }
    async function deleteForID(id) {
        await idb.createDB();
        idb.deleteData("purchase", id)
    }
    function modal() {
        return (
            <div>
                <div className="modal fade" id="ModalConfirm" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" ><b>Registrar compra no fluxo de caixa?</b></h5>
                            </div>
                            <div className="modal-body">
                                <label>Descrição do Gasto:</label> <input id="descriptionModalInput" type="text" />
                                <label>Total do gastos: R${calcList()}</label>
                                <label>Tipo de movimentação: Saída</label>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => closeModal()}><b>Cancelar</b></button>
                                <button type="button" className="btn btn-success" onClick={() => registerPurchases()}><b>Cadastrar</b></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    function closeModal() {
        document.getElementById('ModalConfirm').setAttribute("style", "opacity: 0;display: none;background: rgba(0,0,0,.2);")
    }
}