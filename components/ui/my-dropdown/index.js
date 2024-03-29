import React from "react";
import classes from "./my-dropdown.module.less";
const MyDropdown = (props) => {
  return (
    <div className={classes.main_wrapper}>
      <div className={classes.dropdown_wraper}>
        {props.label ? <label>{props.label}</label> : ""}
      </div>
      <select
        className={
          props.border === false
            ? `${classes.no_border}`
            : `${classes.my_dropdown}`
        }
        onChange={(e) => props.onChange(e.target.value)}
      >
        {props.options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MyDropdown;
