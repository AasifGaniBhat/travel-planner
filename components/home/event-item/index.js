import classes from "./event-item.module.less";

const EventItem = ({ event, index, onClick }) => {

  return (
    <div className={classes.event_single_item} key={index} onClick={onClick}>
      <img src="/images/iustimages/image8.jpg" alt="" />
      <div className={classes.title}>{event.title}</div>
      <div className={classes.desc}>{event.body}</div>

      <div className={classes.dest_desc}>
        <div className={classes.duration}>
          <span className={classes.event_icon}>
            <img
              src="/images/icons/duration.png"
              width={20}
              height={20}
              alt=""
            />
          </span>
          <span>{event.duration}</span>
        </div>
        <div className={classes.cab}>
          <span className={classes.event_icon}>
            <img src="/images/icons/car.png" width={20} height={20} alt="" />
          </span>
          <span className={classes.label}></span>
          {event.cab}
        </div>
        <div className={classes.place}>
          <span className={classes.event_icon}>
            <img src="/images/icons/place.png" width={20} height={20} alt="" />
          </span>
          {event.place}
        </div>
      </div>
      <div className={classes.date_action_container}>
        <div className={classes.date}>{event.date}</div>
        <img
          className={classes.action_button}
          src="/images/icons/chevron-right.png"
        />
      </div>
    </div>
  );
};

export default EventItem;
