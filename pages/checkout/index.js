import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ContentContainer from "../../components/ui/content-container/content-container";
import MainWrapper from "../../components/ui/wrapper/wrapper";
import { useTranslation } from "react-i18next";
import MyInput from "../../components/ui/my-input";
import { useEffect, useState } from "react";
import MyButton from "../../components/ui/my-button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  kuposModalErrorSuccessState,
  loginDataState,
} from "../../recoil/atoms/common";
import CommonService from "../../services/commonService";
import { useRouter } from "next/router";
import {
  GetCabTypes,
  GetDestinations,
  GetGuides,
  GetHotels,
  PurchaseBooking,
} from "../../services/apis/apisHome";
import { currentEventState } from "../../recoil/atoms/home";
import DateService from "../../services/dateService";
import MyDropdown from "../../components/ui/my-dropdown";

const Checkout = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  //recoil states
  const setModalErrorSuccessState = useSetRecoilState(
    kuposModalErrorSuccessState
  );
  const currentEvent = useRecoilValue(currentEventState);
  const loginData = useRecoilValue(loginDataState);

  // APIS
  const purchaseBookingFunc = PurchaseBooking();
  const getCabTypesFunc = GetCabTypes();
  const getDestinationsFunc = GetDestinations();
  const getHotelsFunc = GetHotels();
  const getGuidesFunc = GetGuides();

  //local states
  const [inputs, setInputs] = useState({});
  const [cabs, setCabs] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    getCabs();
    getDestinations();
    getHotels();
    getGuides();
  }, []);

  const getCabs = () => {
    getCabTypesFunc({
      callback: (res) => {
        console.log("dfgjhkhdfgjhd", res);
        if (res?.data?.data) {
          let localData = res.data.data.map((it) => {
            return { value: it.id, label: it.name };
          });
          setCabs(localData);
        }
      },
    });
  };

  const getDestinations = () => {
    getDestinationsFunc({
      callback: (res) => {
        console.log("destinations", res);
        if (res?.data?.data) {
          let localData = res.data.data.map((it) => {
            return { value: it.id, label: it.name };
          });
          setDestinations(localData);
        }
      },
    });
  };

  const getHotels = () => {
    getHotelsFunc({
      callback: (res) => {
        console.log("hotels", res);
        if (res?.data?.data) {
          let localData = res.data.data.map((it) => {
            return { value: it.id, label: it.name };
          });
          setHotels(localData);
        }
      },
    });
  };

  const getGuides = () => {
    getGuidesFunc({
      callback: (res) => {
        console.log("guides", res);
        if (res?.data?.data) {
          let localData = res.data.data.map((it) => {
            return { value: it.id, label: it.name };
          });
          setGuides(localData);
        }
      },
    });
  };

  const onChange = (val, type) => {
    console.log({ val, type });
    let error = `${type}Error`;

    setInputs({ ...inputs, [type]: val, [error]: null });
  };

  const isValid = () => {
    let localInputs = CommonService.copyObject(inputs);

    let errors = 0;
    if (!inputs.name) {
      localInputs["nameError"] = "Please enter a name";
      // setInputs({ ...inputs, nameError: "Please enter name" });
      errors++;
    }

    if (!inputs.phone) {
      localInputs["phoneError"] = "Please enter your phone number";
      errors++;
    }

    if (!inputs.address) {
      localInputs["addressError"] = "Please enter your address";
      // setInputs({ ...inputs, addressError: "Please enter your address" });
      errors++;
    }

    if (!inputs.email) {
      localInputs["emailError"] = "Please enter email";
      // setInputs({ ...inputs, emailError: "Please enter email" });
      errors++;
    }

    if (!inputs.aadhar) {
      localInputs["aadharError"] = "Please enter aadhar number";
      // setInputs({ ...inputs, aadharError: "Please enter aadhar" });
      errors++;
    }
    if (!inputs.passengers) {
      localInputs["passengersError"] = "Please enter your no of passengers";
      // setInputs({ ...inputs, passengersError: "Please enter your no of passengers" });
      errors++;
    }

    console.log({ localInputs });

    setInputs({ ...inputs, ...localInputs });

    if (errors > 0) {
      return false;
    }

    return true;
  };

  console.log({ inputs });
  console.log({ router });

  const submit = () => {
    if (!isValid()) {
      return;
    }

    let data = {
      package_id: currentEvent.id,
      user_id: loginData?.id,
      amount: currentEvent.price,
      trip_date: DateService.getTodayString("yyyy-mm-dd"),
      passenger_data: {
        name: inputs.name,
        phone: inputs.phone,
        address: inputs.address,
        email: inputs.email,
        aadhar: inputs.aadhar,
        passengers: inputs.passengers,
      },
      addons: {
        cab: inputs.cab ? inputs.cab : cabs[0].value,
        destination: inputs.destination
          ? inputs.destination
          : destinations[0].value,
        hotel: inputs.hotel ? inputs.hotel : hotels[0].value,
        guide: inputs.guide ? inputs.guide : guides[0].value,
      },
    };

    console.log({ data });

    return;

    purchaseBookingFunc({
      callback: (res) => {
        console.log("response from booking api", res);
        if (res?.message == "SUCCESS") {
          setModalErrorSuccessState({
            showModal: true,
            success: true,
            modalTitle: "Successfully Booked!",
            onButtonClick: () => {
              setModalErrorSuccessState({});
              router.push("/");
            },
          });
        } else {
          setModalErrorSuccessState({
            showModal: true,
            success: false,
            modalTitle:
              "There is some issue in booking, Please try again after a while!",
            onButtonClick: () => {
              setModalErrorSuccessState({});
              router.push("/");
            },
          });
        }
      },
      data: data,
    });
  };

  return (
    <MainWrapper t={t}>
      <ContentContainer>
        <div className="form_wrapper">
          <MyInput
            label="Name"
            placeholder="E.g AASIF"
            type="text"
            onChange={(val) => onChange(val.target.value, "name")}
            value={inputs.name}
            // error={inputs.nameError ? true : false}
            error={inputs.nameError ? inputs.nameError : null}
          />

          <MyInput
            label="Phone"
            placeholder="E.g 1234567890"
            type="text"
            onChange={(val) => onChange(val.target.value, "phone")}
            value={inputs.phone}
            // error={inputs.phoneError ? true : false}
            error={inputs.phoneError ? inputs.phoneError : null}
          />

          <MyInput
            label=" Address"
            placeholder="E.g kashmir"
            type="text"
            onChange={(val) => onChange(val.target.value, "address")}
            value={inputs.address}
            // error={inputs.addressError ? true : false}
            error={inputs.addressError ? inputs.addressError : null}
          />

          <MyInput
            label="Email"
            placeholder="E.g someone@mail.com"
            type="email"
            onChange={(val) => onChange(val.target.value, "email")}
            value={inputs.email}
            // error={inputs.emailError ? true : false}
            error={inputs.emailError ? inputs.emailError : null}
          />

          <MyInput
            label="Aadhar"
            placeholder="E.g 92912354367"
            type="text"
            onChange={(val) => onChange(val.target.value, "aadhar")}
            value={inputs.aadhar}
            // error={inputs.aadharError ? true : false}
            error={inputs.aadharError ? inputs.aadharError : null}
          />

          <MyInput
            label="Passengers"
            placeholder="E.g 2"
            type="number"
            onChange={(val) => onChange(val.target.value, "passengers")}
            value={inputs.passengers}
            // error={inputs.passengersError ? true : false}
            error={inputs.passengersError ? inputs.passengersError : null}
          />

          <MyDropdown
            options={cabs}
            label="Select Cab"
            onChange={(val) => onChange(val, "cab")}
          />

          <MyDropdown
            options={destinations}
            label="Select Destinations"
            onChange={(val) => onChange(val, "destination")}
          />

          <MyDropdown
            options={hotels}
            label="Select Hotel"
            onChange={(val) => onChange(val, "hotel")}
          />

          <MyDropdown
            options={guides}
            label="Select Guide"
            onChange={(val) => onChange(val, "guide")}
          />

          <MyButton label="Checkout" onClick={submit} />
        </div>
      </ContentContainer>
    </MainWrapper>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "es", ["common"])),
  },
});

export default Checkout;
