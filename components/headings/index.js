import React from "react";
import classes from './headings.module.less'
 const EventHeading =(props)=>{
    return(
        <div className={classes.view_all_events_main}>
        <div className={classes.view_all_events_heading}>
            <div className={classes.line_separator}></div>
            <div className={classes.view_events_heading_text}>{props.label}</div>
            <div className={classes.line_separator}></div>
        </div>
    </div>
    )
 }
 export default EventHeading;