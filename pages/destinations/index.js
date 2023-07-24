

import React from "react";
import  classes  from './destination.module.less'
const Destinations=()=>{
    return(
        <div className={classes.destination_container}>
            <div className={classes.destination_heading}>DESTINATIONS</div>
            <div className={classes.image_conatiner}>
    <div className={classes.image1}><img src="/images/travelplanner/pic1.jpg"></img></div>
    <div className={classes.image1}><img src="	/images/travelplanner/pic2.jpg"/></div>
    <div className={classes.image1}>< img src="	/images/travelplanner/pic3.jpg"/></div>
    <div className={classes.image1}><img src="	/images/travelplanner/pic4.jpg"/></div>
    </div>
    </div>
    )
}
export default Destinations;


//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