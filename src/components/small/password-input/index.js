import React, { useState } from "react";
import { Input } from "antd";


export const PasswordInput = (props) => {
    const [focus, setFocus] = React.useState(false);
    let { label, value, placeholder, type, required, style, passwordVisible, setPasswordVisible } = props;

    if (!placeholder) placeholder = label;

    const isOccupied = focus || (value && value.length !== 0);
    const labelClass = isOccupied ? "input-label as-label" : "input-label as-placeholder";
    const requiredMark = required ? <span className="text-danger">*</span> : null;


    return (
        <div className='input-wrapper'>
            <div
                className="float-label"
                onBlur={() => setFocus(false)}
                onFocus={() => setFocus(true)}
            >
                <Input.Password
                    defaultValue={value}
                    onChange={props.onChange}
                    type={type}
                    className="input"
                    style={style}
                    visibilityToggle={{
                        visible: passwordVisible,
                        onVisibleChange: setPasswordVisible,
                    }}
                />
                <label className={labelClass}>
                    {isOccupied ? label : placeholder} {requiredMark}
                </label>
            </div>
        </div>
    );
};

