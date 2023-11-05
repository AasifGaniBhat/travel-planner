import React, { useState } from "react";

import ContentContainer from "../content-container/content-container";
import Image from "next/image";
import classes from "./footer.module.less";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  const images = [
    "facebook.png",
    "twitter.png",
    "youtube.png",
    "whatsapp.png",
    "linkedin.png",
    "instagram.png",
  ];
  const footerLinks = [
    // {
    //   title: "About Us",
    //   content: [ "Education project", "Contact"],
    // },
    {
      title: "Support",
      content: [
        { title: "Help", link: "help" },
        { title: "Contact us", link: "contact" },
      ],
    },
    {
      title: "Information",
      content: [
        { title: "Terms and Conditions", link: "terms" },
        { title: "Privacy Policy", link: "privacy" },
      ],
    },
  ];
  const routeToLink = (item) => {
    router.push(item);
  };
  return (
    <>
      <div className={classes.footer_wrapper}>
        {/* <div className={classes.logo_social}> */}
        <div className={classes.logo}>
          <Image
            src={"/images/iustimages/tplan.png"}
            width={200}
            height={100}
            alt=""
          />
        </div>

        {/* </div> */}
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
                      onClick={() => routeToLink(item.link)}
                    >
                      {item.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

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
    </>
  );
};
export default Footer;
