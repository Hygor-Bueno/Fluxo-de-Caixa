import React from "react";
import {convertDateToBrazil} from '../Utils/UtilsJS.js'

export default function InputForm(props){
    console.log(props)
    return(
        <table id="tableHome" className="table table-reponsive">
                    <thead>
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
                            props.list.map((item) =>(
                                    <tr key={item.id}>
                                        <th scope="row">{item.id}</th>
                                        <td>{convertDateToBrazil(item.date)}</td>
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
                            <td>{props.footer.prohibited}</td>
                            <td>{props.footer.exit}</td>
                            <td>{props.footer.cashier}</td>
                        </tr>
                    </tfoot>
                </table>
    )
}