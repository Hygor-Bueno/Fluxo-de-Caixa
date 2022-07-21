import React, { useState, useEffect } from 'react';
import './Logs.css';
import Main from '../Templates/Main'
import { IndexedDB } from '../../Utils/IndexedDB.js';
import optionsMonth from './LogSettings.js'
import Option from '../Option';
import Table from '../Table';
import {calculateList} from '../../Utils/UtilsJS.js'


export default function Logs(props) {
	var idb = new IndexedDB();
	var [data, setData] = useState([]);
	var [list, setList] = useState([]);
	var [modal, setModal] = useState({});
	
	let getData = async () => {
		await idb.createDB();
		let data = await idb.getAllData();
		modal = { display: "d-none alert alert-warning alert-dismissible fade show", text: "" }
		list = data;
		setModal(modal);
		setData(data);
	}
	useEffect(() => {
		getData();
	}, []);

	return (
		<Main icon="paste" title="Registro" subtitle="Verifique os registros dos seus gastos financeiros...">
			<div id="modalPageInfo" className={modal.display} role="alert">
				<strong>Atenção!</strong> {modal.text}
				<button onClick={() => closeModal()} type="button" className="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<h1>Registros Financeiros</h1>
			<hr />
			<form className="d-flex flex-column flex-sm-row align-items-sm-end col-6 col-sm-12">
				<span>
					<label className="col-auto my-1">Mês: </label>
					<select id="selectMonth">
						{optionsMonth.map(option => <Option key={option.valueOption} {...option} />)}
					</select>
				</span>
				<span>
					<label className="col-auto my-1">Ano: </label>
					<select id="selectYear">
						{filterYear(data).map(option => <option key={option}>{option}</option>)}
					</select>
				</span>
				<button type="button" onClick={() => { query() }} className="btn btn-success mx-2 d-flex align-items-center">Buscar</button>
			</form>
			<hr />
			{(list.length > 0) && <Table {...{ list,footer:calculateList(list) }}></Table>}
			<p className="mb-0">Realize a verificação das suas finanças em meses anteriores...</p>
		</Main>
	)

	function filterYear(datas) {
		let years = [];
		let yearAssisted = "";
		datas.forEach(year => {
			if (findInArray(years, year.year) && yearAssisted !== year.year) {
				years.push(year.year)
				yearAssisted = year.year
			}
		})
		return years.sort()
	}
	function findInArray(array, key) {
		let response = true;
		array.forEach(item => {
			if (item === key) {
				response = false;
			}
		})
		return response;
	}
	function query() {
		let filter = filterSelect();
		if (filter.length > 0) {
			setModal({ display: 'd-none'}); 
			setList(filter)
		} else {
			setModal({ display: "d-flex alert alert-warning alert-dismissible fade show",text: " Não foi possível localizar os dados."  })
			console.log(modal)
		}
	}
	function filterSelect() {
		var year, month;
		month = document.getElementById("selectMonth").value;
		year = document.getElementById("selectYear").value;
		let resp = data.filter(item => item.month === month && item.year === year);
		return resp;
	}
	function closeModal() {
		setModal({ display: 'd-none'}); 
		console.log(modal)
	}
}