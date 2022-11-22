import React, { useState, forwardRef, useImperativeHandle } from 'react';
import "../sass/layout/profile.scss";

const TextInput = forwardRef((props, _ref) => {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  // TODO: handle international numbers
  // TODO: figure out deletion of phone number keeping formatting as user had
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

  // used to pass value upwards to parent
  useImperativeHandle(_ref, () => ({
    getValue: () => {
      return value;
    }
  }))

  return (
    <div className="input-container">
      <input className="text-input" value={value} onChange={props.phone ?  handlePhoneChange : handleChange}/>
      <label className={value && 'filled'}>
        {props.label}
      </label>
    </div>
  )
});

export default TextInput;