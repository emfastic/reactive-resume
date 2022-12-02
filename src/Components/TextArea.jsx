import React, { useState, forwardRef, useImperativeHandle } from 'react';
import "../sass/layout/profile.scss";

const TextArea = forwardRef((props, _ref) => {
  const [value, setValue] = useState('\u2022 ');

  function handleChange(e) {
    if (e.code === 'Enter') {
      console.log('enter')
      e.target.value = e.target.value + "\n\n\u2022 "
    } else {
      if (e.target.value[e.target.value.length - 1] === '\n') {
        e.target.value = e.target.value.substring(0, e.target.value.length - 1)
        setValue(e.target.value);
      } else {
        setValue(e.target.value);
      }
    }
    e.target.value = e.target.value.replace(/\n/g,"\n\u2022").replace(/\r/g,"\r\u2022")
    setValue(e.target.value)
  }

  // used to pass value upwards to parent
  useImperativeHandle(_ref, () => ({
    getValue: () => {
      return value;
    }
  }))

  return (
    <span className={props.className}>
      <textarea className={props.className} value={value} onChange={handleChange} onKeyDown={handleChange}/>
      <label className="area">
        {props.label}
      </label>
    </span>
  )
});

export default TextArea;