import React, { useState, forwardRef, useImperativeHandle } from "react";
import "../sass/layout/profile.scss";

const TextInput = forwardRef((props, _ref) => {
  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  // used to pass value upwards to parent
  useImperativeHandle(_ref, () => ({
    getValue: () => {
      return value;
    },
    setValue: (editValue) => {
      setValue(editValue);
    },
  }));

  return (
    <span className={props.className}>
      <input
        className={props.className}
        value={value}
        type={props.type}
        min={props.type === "month" ? "1940-01" : ""}
        onChange={handleChange}
      />
      <label className={props.type === "month" ? "month" : value && "filled"}>
        {props.label}
      </label>
    </span>
  );
});

export default TextInput;
