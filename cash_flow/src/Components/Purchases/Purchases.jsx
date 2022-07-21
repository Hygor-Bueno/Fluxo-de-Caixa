import React, { useState, useEffect } from 'react';
import Option from '../Option'
import Main from '../Templates/Main';
import inputFormPurchase, { inputFooterPurchase, optionSelectFormPurchase } from './PurchasesSettings.js'
import './Purchases.css';
// import InputForm from '../InputForm'

export default function Purchases(props) {
    var [inputForm, setInputForm] = useState([]);
    var [inputFooter, setInputFooter] = useState([]);
    var [optionForm, setOptionForm] = useState("default");
    var [total, setTotal] = useState(0);

    useEffect(() => {
        setInputForm(inputFormPurchase);
        setInputFooter(inputFooterPurchase);
    }, [])

    useEffect(() => {
        console.log(inputForm, optionForm,total)
    }, [inputForm, optionForm,total])

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
            </form>
            <hr />
            <section>
                <h1>Aqui ficará a Lista de Compras...</h1>
            </section>
            <hr />
            <footer>
                {
                    inputFooter.map(input =>
                        <span key={input.position}>
                            <label className={input.classLabel !== "" ? input.classLabel : ""}><b>{input.labelIput}</b></label><input onChange={e => updateField(e, inputFooter, setInputFooter)} onBlur={e => calcTotal(e.target.value) } data-position={input.position} id={input.idInput !== "" ? input.idInput : ""} className={input.classInput !== "" ? input.classInput : ""} value={input.valueInput} type={input.typeInput} title={input.titleInput} placeholder={input.placeholderInput !== "" ? input.placeholderInput : ""} disabled={input.disabledInput} />
                        </span>
                    )
                }
                <span>
                    <label className="col-auto my-1"><b>Valor Total:</b></label>
                    <input  data-position="1" id="valueFormFinal" type="number" title="Insira o valor do Item" placeholder="R$ 0,00"   disabled value = {total} />
                </span>
            </footer>
        </Main>
    )
    function updateField(event, vMethods, method) {
        let position = event.target.getAttribute("data-position"), input = event.target;
        vMethods[position].valueInput = input.value
        method([...vMethods])
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
        var a = parseFloat(total)+ (parseFloat(value) || 0 )
        console.log(value,a)
        setTotal(a)
    }
    
    // function onChange(e) {
    //     console.log(e); // só irá emitir esse evento, ao sair do campo
    //   }
}