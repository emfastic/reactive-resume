import React, { useState } from 'react';
import "../sass/layout/profile.scss"

function TextInput({ type = 'text', label }) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <div className="input-container">
      <input className="text-input" type={type} value={value} onChange={handleChange} />
      <label className={value && 'filled'}>
        {label}
      </label>
    </div>
  );
};

export default TextInput;