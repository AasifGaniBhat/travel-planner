import React from "react";
import  classes from './travelplanner.module.less'
const TravelPlannerCards=()=>{
    

    return(
    <div className={classes.card_main_section}>
      <div className={classes.image}><img src="	https://traveltur.newstg2-opsdweb.kupos.cl/assets/traveltur/Destinations/Home-destination2.png"/></div>
      <div className={classes.text}>packages</div>
    </div>
    )
}
export default TravelPlannerCards;