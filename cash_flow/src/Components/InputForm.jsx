import React from "react";

export default function InputForm(props){
    return(
        <span>
            <label>{props.labelIput}</label><input id={props.idInput} type={props.typeInput} title={props.titleInput} placeholder={props.placeholderInput !== ""?props.placeholderInput:""} />
        </span>
    )
}