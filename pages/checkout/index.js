import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ContentContainer from "../../components/ui/content-container/content-container"
import MainWrapper from "../../components/ui/wrapper/wrapper"
import { useTranslation } from "react-i18next";
import MyInput from "../../components/ui/my-input";
import { useState } from "react";
import MyButton from "../../components/ui/my-button";
import { useSetRecoilState } from "recoil";
import { kuposModalErrorSuccessState } from "../../recoil/atoms/common";
import CommonService from "../../services/commonService";
import { useRouter } from "next/router";

const Checkout = () => {


    const { t } = useTranslation("common");
    const router = useRouter()

    //recoil states
    const setModalErrorSuccessState = useSetRecoilState(
        kuposModalErrorSuccessState
    );


    const [inputs, setInputs] = useState({})


    const onChange = (val, type) => {

        let error = `${type}Error`

        setInputs({ ...inputs, [type]: val, [error]: null })

    }


    const isValid = () => {


        let localInputs = CommonService.copyObject(inputs)

        let errors = 0;
        if (!inputs.name) {

            localInputs["nameError"] = "Please enter a name"
            // setInputs({ ...inputs, nameError: "Please enter name" });
            errors++;
        }

        if (!inputs.phone) {
            localInputs["phoneError"] = "Please enter your phone number"
            errors++;
        }

        if (!inputs.address) {
            localInputs["addressError"] = "Please enter your address"
            // setInputs({ ...inputs, addressError: "Please enter your address" });
            errors++;
        }

        if (!inputs.email) {
            localInputs["emailError"] = "Please enter email"
            // setInputs({ ...inputs, emailError: "Please enter email" });
            errors++;
        }

        if (!inputs.aadhar) {
            localInputs["aadharError"] = "Please enter aadhar number"
            // setInputs({ ...inputs, aadharError: "Please enter aadhar" });
            errors++;
        }
        if (!inputs.passengers) {
            localInputs["passengersError"] = "Please enter your no of passengers"
            // setInputs({ ...inputs, passengersError: "Please enter your no of passengers" });
            errors++;
        }

        console.log({ localInputs })


        setInputs({ ...inputs, ...localInputs })


        if (errors > 0) {
            return false
        }

        return true
    }


    console.log({ inputs })
    console.log({ router })


    const submit = () => {

        if (!isValid()) {
            return
        }


        let data = {
            name: inputs.name,
            name: inputs.name,
            name: inputs.name,
            name: inputs.name,
            name: inputs.name,
            name: inputs.name,
            name: inputs.name,
        }

        setModalErrorSuccessState({
            showModal: true,
            success: true,
            modalTitle: "Successfully Booked!",
            onButtonClick: () => {
                setModalErrorSuccessState({});
                router.push("/")
            }
        });




    }

    return (
        <MainWrapper t={t}>

            <ContentContainer>


                <div className="form_wrapper">

                    <MyInput
                        label="Name"
                        placeholder="name"
                        type="text"
                        onChange={(val) => onChange(val.target.value, "name")}
                        value={inputs.name}
                        // error={inputs.nameError ? true : false}
                        error={inputs.nameError ? inputs.nameError : null}
                    />

                    <MyInput
                        label="Phone"
                        placeholder="phone"
                        type="text"
                        onChange={(val) => onChange(val.target.value, "phone")}
                        value={inputs.phone}
                        // error={inputs.phoneError ? true : false}
                        error={inputs.phoneError ? inputs.phoneError : null}
                    />

                    <MyInput
                        label="Address"
                        placeholder="address"
                        type="text"
                        onChange={(val) => onChange(val.target.value, "address")}
                        value={inputs.address}
                        // error={inputs.addressError ? true : false}
                        error={inputs.addressError ? inputs.addressError : null}
                    />

                    <MyInput
                        label="Email"
                        placeholder="email"
                        type="email"
                        onChange={(val) => onChange(val.target.value, "email")}
                        value={inputs.email}
                        // error={inputs.emailError ? true : false}
                        error={inputs.emailError ? inputs.emailError : null}
                    />

                    <MyInput
                        label="Aadhar"
                        placeholder="aadhar"
                        type="text"
                        onChange={(val) => onChange(val.target.value, "aadhar")}
                        value={inputs.aadhar}
                        // error={inputs.aadharError ? true : false}
                        error={inputs.aadharError ? inputs.aadharError : null}
                    />

                    <MyInput
                        label="Passengers"
                        placeholder="passengers"
                        type="number"
                        onChange={(val) => onChange(val.target.value, "passengers")}
                        value={inputs.passengers}
                        // error={inputs.passengersError ? true : false}
                        error={inputs.passengersError ? inputs.passengersError : null}
                    />

                    <MyButton label="Checkout" onClick={submit} />




                </div>




            </ContentContainer>

        </MainWrapper>
    )
}

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "es", ["common"])),
    },
});


export default Checkout