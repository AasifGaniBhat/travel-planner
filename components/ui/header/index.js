import React, { useEffect, useState } from "react";
import { cartListState, totalCartValueState } from "../../../recoil/atoms/cart";
import { useRecoilState, useRecoilValue } from "recoil";
import ContentContainer from "../content-container/content-container";
import Image from "next/image";
import LoginModal from "../../home/login-modal/login-modal";
import SearchBar from "../search-bar";
import classes from "./header.module.less";
import { useRouter } from "next/router";
import CommonService from "../../../services/commonService";

const Header = () => {
  const cartItems = useRecoilState(cartListState);
  const totalCartValue = useRecoilValue(totalCartValueState);
  const router = useRouter();
  const [search, setSearch] = useState("jhgfds");
  const [searchOption, setSearchOption] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const options = [
    { label: "All", value: "all" },
    { label: "Aerospace", value: "Aerospace" },
    { label: "Automobiles", value: "Automobiles" },
    { label: "Towers", value: "Towers" },
    { label: "Railways", value: "Railways" },
  ];
  // console.log("cart....", cartItems[0]);
  const searchFunction = () => {
    router.push("/search-page");
  };

  // const gotoCartPage = () => {
  //   router.push("/cart-page");
  // };
  const returnHome = () => {
    router.push("/");
  };
  const registerPage = () => {
    router.push("/register");
  };
  const loginPage = () => {
    router.push("/login");
  };
  const home = () => {
    router.push("/");
  };
  const gotoPhotopackage = () => {
    router.push("/package-details");
  };
  const gotologin = () => {
    router.push("/login");
  };
  const gotoCabs = () => {
    router.push("/cabs");
  };
  const hotels = () => {
    router.push("/hotels");
  };
  const Travelguide = () => {
    router.push("/Travelguide");
  };
  const Driver = () => {
    router.push("/Driver");
  };
  const profile = () => {
    router.push("/profile");
  };

  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let logindata = CommonService.getLocalEncryp("loginData");

      if (logindata?.id) {
        setLoginData(logindata);
      }
    }
  }, []);

  return (
    <div className={classes.main_wrapper}>
      <ContentContainer>
        <div className={classes.main_wrapper_inner}>
          <div className={classes.logo_container} onClick={returnHome}>
            Travel Planner
          </div>

          <div className={classes.cart_login}>
            <div
              className={classes.login_home}
              onClick={home}
              style={{ cursor: "pointer" }}
            >
              Home
            </div>

            <div
              className={classes.Cabs}
              onClick={gotoCabs}
              style={{ cursor: "pointer" }}
            >
              Cabs
            </div>
            <div
              className={classes.hotels}
              onClick={hotels}
              style={{ cursor: "pointer" }}
            >
              Hotels
            </div>
            <div
              className={classes.Travelguide}
              onClick={Travelguide}
              style={{ cursor: "pointer" }}
            >
              Travel Guide
            </div>
            {/* <div
              className={classes.Driver}
              onClick={Driver}
              style={{ cursor: "pointer" }}
            >
              Drivers
            </div> */}
            {loginData ? (
              <div
                className={classes.Profile}
                onClick={profile}
                style={{ cursor: "pointer" }}
              >
                Profile
              </div>
            ) : (
              <div className={classes.cart} onClick={gotologin}>
                Login
              </div>
            )}
          </div>
        </div>
      </ContentContainer>
      <div className={classes.login_modal}>
        <LoginModal
          showModal={showLoginModal}
          onHide={() => setShowLoginModal(false)}
          // t={t}
        />
      </div>
    </div>
  );
};

export default Header;
