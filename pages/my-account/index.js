import {
  AddAddress,
  Addresses,
  DeleteAddress,
  UpdateAddress,
} from "../../services/apis/apisAuth";
import { useEffect, useState } from "react";

import ContentContainer from "../../components/ui/content-container/content-container";
import Head from "next/head";
import Image from "next/image";
import KuposModal from "../../components/ui/kupos-modal/kupos-modal";
import MainWrapper from "../../components/ui/wrapper/wrapper";
import MyButton from "../../components/ui/my-button";
import MyInput from "../../components/ui/my-input";
import ResetMyAccountData from "../../components/my-account/reset-my-account-data";
import classes from "./my-account.module.less";
import {
  kuposModalWithButtonsState,
  loginDataState,
} from "../../recoil/atoms/common";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { toast } from "react-toastify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

function ManageAccount() {
  const router = useRouter();
  const [addressModal, setAddressModal] = useState(false);
  let [addressItems, setAddressItems] = useState({});
  const [allAddress, setAllAddresses] = useState(null);
  const [addressInFocus, setAddressInFocus] = useState(null);

  //recoil state
  const [kuposModalWithButtons, setKuposModalWithButtonsState] = useRecoilState(
    kuposModalWithButtonsState
  );

  const getAddresses = Addresses();
  const addAddressFunc = AddAddress();

  const [tabsMenu, setTabMenu] = useState([
    { name: "Account", active: true },
    // { name: "Address", active: false },
  ]);

  useEffect(() => {
    getAddresses({
      callback: (res) => {
        if (res?.data?.length > 0) {
          setAllAddresses(res.data);
        }
      },
    });
  }, [addressModal, kuposModalWithButtons]);

  const changeTab = (tab) => {
    let menuLocal = [];
    tabsMenu.map((tabLocal, index) => {
      if (index === tab) {
        menuLocal.push({ ...tabLocal, active: true });
      } else {
        menuLocal.push({ ...tabLocal, active: false });
      }
    });
    setTabMenu(menuLocal);
  };

  const user = {
    name: "Tanveer Hussain",
    dob: "21 Oct 1996",
    gender: "Male",
    cell: "7006362238",
    email: "veerg2238@gmail.com",
    password: "qwertyuiop",
    address1: "Gangoo",
    city: "Pulwama",
    state: "Jammu & Kashmir",
  };
  const { t } = useTranslation("common");

  //recoil states
  const [loginData, setLoginData] = useRecoilState(loginDataState);

  const logoutUser = () => {
    localStorage.clear("loginData");
    router.push("/login");
  };

  let userData = loginData;

  const onChange = (val, type) => {
    setAddressItems({ ...addressItems, [type]: val });
  };

  const addAddress = () => {
    let data = {
      contact_person_name: addressItems.name,
      address_type: "OFFICE",
      contact_person_number: addressItems.phone,
      address: addressItems.address,
      longitude: "",
      latitude: "",
    };
    if (addressInFocus !== null) {
      UpdateAddress(addressInFocus?.id)({
        callback: (res) => {
          setAddressModal(false);
          setAddressItems({});

          if (res && res?.success) {
            toast("Address added successfully");
          } else {
            toast("Address not added!");
          }
        },
        data: data,
      });
    } else {
      addAddressFunc({
        callback: (res) => {
          setAddressModal(false);
          setAddressItems({});

          if (res && res?.success) {
            toast("Address added successfully");
          } else {
            toast("Address not added!");
          }
        },
        data: data,
      });
    }
  };

  const showDeleteModal = (address) => {
    setKuposModalWithButtonsState({
      showModal: true,
      showButton1: true,
      buttonText1: "Delete",
      showButton2: true,
      buttonText2: "Cancel",
      modalTitle: "Delete Address",
      // modalBody: t('PROFILE.PAYMENT_EXPIRY'),
      modalIcon: "/images/icons/timeup.png",
      onButtonClick1: () => deleteAddress(address),
      onButtonClick2: () => setKuposModalWithButtonsState({}),
      onHide: () => setKuposModalWithButtonsState({}),
    });
  };
  const deleteAddress = (address) => {
    DeleteAddress()({
      callback: (res) => {
        setKuposModalWithButtonsState({});

        console.log("Response from delete api is---", res);
        if (res && res.code === "DELETE_SUCCESS") {
          toast("Address deleted successfully");
        } else {
          toast("Address not deleted!");
        }
      },
      id: address.id,
    });
  };

  console.log({ userData });
  return (
    <div className={{}}>
      <Head>
        <title>My Account</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      </Head>

      <ResetMyAccountData />

      <MainWrapper t={t}>
        <ContentContainer>
          <div className={classes.manage_account}>
            <div className={classes.profile}>
              <div className={classes.title}>
                <span className="font24 bold">Manage your account</span>
              </div>
              <div className={classes.logout_wrapper}>
                <span className="font11">
                  Need to change account?{" "}
                  <span
                    className={classes.logout + " bold"}
                    onClick={logoutUser}
                  >
                    Log out
                  </span>
                </span>
              </div>
              <div className={classes.user_profile}>
                <Image
                  src={"/images/logos/user.jpg"}
                  width={200}
                  height={200}
                  alt=""
                />
                <span className="font11 bold">{userData?.name}</span>
              </div>
            </div>
            <div className={classes.account_wrapper}>
              <div className={classes.account}>
                {tabsMenu.map((tab, i) => {
                  return (
                    <>
                      <div
                        className={
                          tab.active
                            ? classes.tab_item + " " + classes.active
                            : classes.tab_item
                        }
                        onClick={() => changeTab(i)}
                      >
                        {tab?.name}
                      </div>
                    </>
                  );
                })}
              </div>
              {tabsMenu[0].active ? (
                <div className={classes.account_child}>
                  <div className={classes.account_item}>
                    <div className={classes.edit_container}>
                      <span className="bold font12">Personal Information</span>
                      <div className={classes.address_actions}>
                        {/* <span className={classes.edit + " bold font12"}>
                          Edit
                        </span> */}
                      </div>
                    </div>
                    <span>{userData?.name}</span>
                    {/* <span>{user.gender}</span> */}
                  </div>
                  <div className={classes.account_item}>
                    <span className="bold font12">Contact Number</span>
                    <span>{userData?.mobile}</span>
                  </div>
                  <div className={classes.account_item}>
                    <span className="bold font12">Email</span>
                    <span>{userData?.email}</span>
                  </div>
                  {/* <div className={classes.account_item}>
                    <span className="bold font12">Password</span>
                    <span className={classes.password}>{user.password}</span>
                  </div> */}
                </div>
              ) : tabsMenu[1].active ? (
                <div className={classes.address_wrapper}>
                  <div className={classes.edit_container}>
                    <span className="bold font12">Primary Address</span>
                    <div className={classes.address_actions}>
                      <span
                        className={classes.edit + " bold font12"}
                        onClick={() => setAddressModal(true)}
                      >
                        Add+
                      </span>
                    </div>
                  </div>

                  {allAddress?.length > 0 &&
                    allAddress.map((address, index) => {
                      return (
                        <div className={classes.address_item} key={index}>
                          <span className={classes.address_details + " font10"}>
                            {address.contact_person_name} ,
                            {address.contact_person_number} , {address.address}
                          </span>

                          <div className={classes.address_actions}>
                            <span
                              className={classes.edit + " bold font11"}
                              onClick={() => {
                                setAddressModal(true);
                                setAddressInFocus(address);
                                setAddressItems({
                                  ...addressItems,
                                  name: address.contact_person_name,
                                  phone: address.contact_person_number,
                                  address: address.address,
                                });
                              }}
                            >
                              Edit
                            </span>

                            <span
                              className="bold font11"
                              onClick={() => showDeleteModal(address)}
                            >
                              Delete
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : null}
            </div>
          </div>
        </ContentContainer>

        <KuposModal
          ariaLabel="tncmodal"
          size={"xl"}
          onHide={() => setAddressModal(false)}
          showModal={addressModal}
        >
          <div className={classes.address_form}>
            <div className={classes.title + " font12 text-center bold-text"}>
              Address
            </div>
            <MyInput
              border={true}
              label="Name"
              onChange={(val) => onChange(val.target.value, "name")}
              value={addressItems?.name}
              type="text"
            />
            <MyInput
              border={true}
              label="Phone"
              onChange={(val) => onChange(val.target.value, "phone")}
              value={addressItems?.phone}
              type="number"
            />
            <MyInput
              border={true}
              label="Address"
              onChange={(val) => onChange(val.target.value, "address")}
              value={addressItems?.address}
              type="text"
            />

            <MyButton
              label="Save Address"
              onClick={() => addAddress(false)}
              style={{
                borderRadius: "8px",
                marginTop: "30px",
              }}
            />
          </div>
        </KuposModal>
      </MainWrapper>
    </div>
  );
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});

// export const getStaticPaths = async () => {
//     return {
//         paths: [], //indicates that no page needs be created at build time
//         fallback: "blocking", //indicates the type of fallback
//     };
// };

export default ManageAccount;
