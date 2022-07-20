import React from "react";

export default function Option(props) {
    return (
        <option value={props.valueOption !== "" ? props.valueOption : ""}>{props.textOption}</option>
    )
}