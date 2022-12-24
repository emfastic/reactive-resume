import React, { useState, forwardRef, useImperativeHandle } from 'react';
import "../sass/layout/profile.scss";

const TextArea = forwardRef((props, _ref) => {
  const [value, setValue] = useState('\u2022 ');

  function handleChange(event) {
      // Get the current value of the input box
    let currVal = event.target.value

    // Check if the user has pressed the return key
    if (event.key === 'Enter') {
      // Add two new lines and a bullet and a space to the value
      const newValue = `${currVal}\n\n• `;

      // Update the value of the input box
      event.target.value = newValue;
      event.target.value = event.target.value.substring(0, event.target.value.length - 1)
    }
    setValue(event.target.value)
}

  // used to pass value upwards to parent
  useImperativeHandle(_ref, () => ({
    getValue: () => {
      return value;
    },
    setValue: description => {
      setValue(description)
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