import classes from "./tabs.module.less";
import { useState } from "react";

const Tabs = ({data, setTab}) => {
  const [selectedTab, setSelectedTab] = useState(0);



  const onTabSelect = (index) => {

    setSelectedTab(index);
    setTab(index)


  } 
  const renderTab = (tab, index) => {
    return (
      <div
        key={index}
        className={
          classes.single_tab +
          " " +
          (selectedTab == index ? classes.active : "")
        }
        onClick={() => onTabSelect(index)}
        style={{ cursor: "pointer", width: "300px" }}
      >
        {tab}
      </div>
    );
  };

  return (
    <div className={classes.tabs_wraper}>
      <div className={classes.tabs_container}>
        <div className={classes.tabs_container_inner + " font10"}>
          {data.length > 0 &&
            data.map((tab, index) => {
              return renderTab(tab, index);
            })}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
