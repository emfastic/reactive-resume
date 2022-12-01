import React, { useState, forwardRef, useImperativeHandle } from 'react';
import "../sass/layout/profile.scss";

const TextArea = forwardRef((props, _ref) => {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  // TODO: handle international numbers
  // TODO: figure out deletion of phone number keeping formatting as user had
  // add formatting on type
  function handlePhoneChange(e) {
    if (e.target.value.length > 14) {
      return;
    }

    if (e.target.value.length < value.length) {
      setValue(e.target.value)
      return;
    }
    let phone = e.target.value.replace(/\D/g, '');
    const match = phone.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      phone = `${match[2] ? '(' : ''}${match[1]}${match[2] ? ')' : ''}${match[2] ? ' ' : ''}${match[2]}${match[3] ? '-' : ''}${match[3]}`;
    }
    setValue(phone)
  }

  // add formatting on type
  function handleGPAChange(e) {
    if (e.target.value.length > 8) {
      return
    }

    let gpa = e.target.value.replace(/\D/g, '');
    const match = gpa.match(/^(\d{0}[0-4])(\d{0}[0-9])(\d{0}[0-9])$/)
    if (match) {
      gpa = `${match[1] + "." + match[2] + match[3]}/4.00`
    }
    setValue(gpa)
  }

  // used to pass value upwards to parent
  useImperativeHandle(_ref, () => ({
    getValue: () => {
      return value;
    }
  }))

  // input : props.type === "month" ? "month-text-input" : "text-input"
  //label : || props.type === "month" ? "month" : ""

  return (
    <span className={props.className}>
      <textarea className={props.className} value={value} onChange={handleChange}/>
      <label className={value ? "filled area" : "area"}>
        {props.label}
      </label>
    </span>
  )
});

export default TextArea;