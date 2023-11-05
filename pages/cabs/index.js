import React, { useEffect, useState } from "react";
import classes from "./cabs.module.less";
import MainWrapper from "../../components/ui/wrapper/wrapper";
import { useTranslation } from "react-i18next";
import Head from "next/head";
import { cartListState } from "../../recoil/atoms/cart";
import EventHeading from "../../components/headings";
import ContentContainer from "../../components/ui/content-container/content-container";
import { GetCabTypes } from "../../services/apis/apisHome";
import baseUrls from "../../services/constants/baseUrls";

const Cabs = (props) => {
  const { t } = useTranslation("common");
  const [cabs, setCabs] = useState([]);

  const GetCabTypesFunc = GetCabTypes();

  useEffect(() => {
    GetCabTypesFunc({
      callback: (res) => {
        console.log("dfgjhkhdfgjhd", res);

        let cabsLocal = [];
        if (res?.data?.data) {
          res?.data?.data?.map((cab) => {
            cabsLocal.push({
              ...cab,
              image: baseUrls.baseUrl + "/" + res.mediaPath + "/" + cab.image,
            });
          });
          setCabs(cabsLocal);
        }
      },
    });
  }, []);
  return (
    <MainWrapper t={t}>
      <div className={classes.container}>
        <Head>
          <title>TRAVEL-PLANNER</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
        </Head>
        <ContentContainer>
          <EventHeading label="Cabs Section" />
          <div className={classes.cabs_main_container}>
            {cabs.map((cab) => {
              console.log({ cab });
              return (
                <div className={classes.cabs_section}>
                  <div className={classes.cab_images}>
                    <div className={classes.cabs_image}>
                      <img src={cab.image} />,
                    </div>
                    <div className={classes.cab_desc}>{cab.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </ContentContainer>
      </div>
    </MainWrapper>
  );
};
export default Cabs;
