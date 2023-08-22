import React, { useState } from "react";

import ContentContainer from "../content-container/content-container";
import Image from "next/image";
import classes from "./footer.module.less";

const Footer = () => {
  const images = [
    "facebook.png",
    "twitter.png",
    "youtube.png",
    "whatsapp.png",
    "linkedin.png",
    "instagram.png",
  ];
  const footerLinks = [
    {
      title: "About Us",
      content: ["Meet us", "Group", "Careers", "Education project", "Contact"],
    },
    {
      title: "Shortcuts",
      content: [
        "Means and cost of transport",
        "Orders",
        "Prices",
        "Payments",
        "Complaint form",
        "Help",
      ],
    },
    {
      title: "Information",
      content: [
        "Terms of cooperation",
        "Cookies policy",
        "save nature",
        "Environmental information",
      ],
    },
    {
      title: "Designer",
      content: ["Mohammad Aasif", "</>"],
    },
  ];
  const routeToLink = (item) => {
    console.log(item);
  };
  return (
    <>
      <div className={classes.footer_wrapper}>
        <div className={classes.logo_social}>
          <div className={classes.logo}>
            <Image
              src={"/images/iustimages/tplan.png"}
              width={200}
              height={100}
              alt=""
            />
          </div>
          <div className={classes.social}>
            <div className="font12 bold">Join Us</div>
            <div className={classes.icons}>
              {images.map((icon, index) => {
                return (
                  <Image
                    key={index}
                    src={`/images/icons/socialmedia/${icon}`}
                    width={40}
                    height={40}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
        </div>
        {footerLinks.map((link, index) => {
          return (
            <div className={classes.links_wrapper} key={index}>
              <div className="bold">{link.title}</div>
              <div className={classes.about_item}>
                {link.content.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={classes.link + " font9"}
                      onClick={() => routeToLink(item)}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Footer;
