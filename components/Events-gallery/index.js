import React from "react";
import classes from "./gallery-events.module.less";
const EventsGallery = (props) => {
  const gallery = [
    { id: 0, image: <img src="/images/iustimages/image1.jpg" />, desc: "" },
    { id: 1, image: <img src="/images/iustimages/image7.jpg" />, desc: "" },
    { id: 2, image: <img src="/images/iustimages/image3.jpg" />, desc: "" },
    { id: 3, image: <img src="/images/iustimages/image4.jpg" />, desc: "" },
    { id: 4, image: <img src="/images/iustimages/image5.jpg" />, desc: "" },
    { id: 5, image: <img src="/images/iustimages/image6.jpg" />, desc: "" },
    { id: 6, image: <img src="/images/iustimages/image8.jpg" />, desc: "" },
    { id: 7, image: <img src="/images/iustimages/image11.jpg" />, desc: "" },
    { id: 8, image: <img src="/images/iustimages/image10.jpg" />, desc: "" },
  ];

  return gallery?.slice(0, props.view ? gallery.length : 3).map((item) => {
    return (
      <div>
        <div className={classes.event_section}>
          <div className={classes.event_image}>{item.image}</div>
          <div className={classes.event_desc}>{item.desc}</div>
        </div>
      </div>
    );
  });
};
export default EventsGallery;
