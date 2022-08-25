import React from 'react';

export default (props) => {

    const options = props.lista.map( (options, index) => {
        return (
            <option key={index} value={options.value}>{options.label}</option>
        )
    })

    return (
        <select {...props} >
            <option value="" disabled selected>Selecione...</option>
            {options}
        </select>
    )
}