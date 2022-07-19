import React from "react";

export default function InputForm(props){
    return(
        <span>
            <label className={props.classLabel !==""? props.classLabel:""}><b>{props.labelIput}</b></label><input id={props.idInput !==""? props.idInput:""} className={props.classInput !==""? props.classInput:""} defaultValue={props.valueInput} type={props.typeInput} title={props.titleInput} placeholder={props.placeholderInput !== ""?props.placeholderInput:""} />
        </span>
    )
}