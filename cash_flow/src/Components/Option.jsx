import React from "react";

export default function Option(props) {
    return (
        <option hidden={props.hidden === true?props.hidden : false} default={props.default === true?props.default : false} value={
            props.valueOption !== "" ? props.valueOption : ""}>
                {props.textOption}</option>
    )
}