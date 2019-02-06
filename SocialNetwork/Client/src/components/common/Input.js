import React from 'react';

const Input = (props) => {
    const {name, type = 'text', value, onChange, label} = props;

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input 
                onChange= {onChange}
                name={name}
                id={name}
                type={type}
                value= {value}
            />
        </div>
    );
}

export default Input;