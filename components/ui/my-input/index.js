import Image from "next/image";
import React from "react";
import classes from "./my-input.module.less";

const MyInput = (props) => {

  console.log({ props })
  return (
    <div
      className={classes.input_wrapper}
      style={props?.noSpace ? { marginBottom: 0 } : {}}
    >
      {props.label ? <div className={classes.label}>{props.label} </div> : null}

      <div className={classes.inner_input_wrapper} style={props.wrapperStyle}>
        {props.leftIcon ? (
          <Image src={props.leftIcon} alt="left-icon" width={20} height={20} />
        ) : null}

        <input
          className={props.border ? classes.input_border : null}
          border={props.border}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          type={props.type}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onDoubleClick={props.onDoubleClick}
          onKeyDown={props.onKeyDown}
          style={props.style}
          disabled={props.disbale ? true : false}
        />

        {props.rightIcon ? (
          <Image onClick={props.onRightIconClick} src={props.rightIcon} alt="left-icon" width={20} height={20} />
        ) : null}
      </div>


      {props.error ? <div className={classes.error}>{props.error}</div> : null}
    </div>
  );
};

export default MyInput;
