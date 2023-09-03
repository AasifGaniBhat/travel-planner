import ContentContainer from "../components/ui/content-container/content-container";
import Head from "next/head";
import MainWrapper from "../components/ui/wrapper/wrapper";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useEffect, useState } from "react";
import EventItem from "../components/home/event-item";
import classes from "./index.module.less";
import { GetEvents } from "../services/apis/apisHome";
import EventsGallery from "../components/Events-gallery";
import EventDescription from "../components/Event_description";
import Tabs from "../components/ui/tabs/tabs";
import { currentEventState } from "../recoil/atoms/home";
import { useSetRecoilState } from "recoil";

const initSlides = [
    "/images/travelplanner/home-banner.png",
    "/images/travelplanner/slider1.jpg",
    "/images/travelplanner/slider2.jpg",
];

const spanStyle = {
    padding: "20px",
    background: "#efefef",
    color: "#000000",
};

const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
};

function Home() {
    const router = useRouter();
    const { t } = useTranslation("common");

    const tabs = ["Kashmir packages", "Outside Kashmir packages"];

    //use states
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [selectedTab, setSelectedTab] = useState(0);
    const [events, setEvents] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [viewAll, setViewAll] = useState(false);

    //recoil state
    const setcurrentEvent = useSetRecoilState(currentEventState)

    //api call
    const GetEventsFunc = GetEvents();

    useEffect(() => {
        GetEventsFunc({
            callback: (res) => {
                if (res) {
                    let localPackages = [];
                    Object.values(res)
                        .slice(0, 99)
                        .forEach((item) => {
                            let random = Math.floor(Math.random() * 100);
                            localPackages.push({
                                ...item,
                                kashmir: random % 2 === 0 ? true : false,
                                duration: "2 Nights and 3 Days",
                                cab: "Innova new",
                                place: "1 day Yusmarg 2 days Sangerwani ",
                            });
                        });
                    setEvents(localPackages);
                }
            },
        });
    }, []);

    const onEventClick = (event) => {
        setSelectedEvent(event);
        setcurrentEvent(event);

        console.log({ event });
        router.push("/package-details")
        // setShowModal(!showModal)
    };

    const [counter, setCounter] = useState(1);
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
                <Slide>
                    {initSlides.map((slideImage, index) => (
                        <div key={index}>
                            <div
                                style={{ ...divStyle, backgroundImage: `url(${slideImage})` }}
                            >
                                {/* <span style={spanStyle}>{slideImage.caption}</span> */}
                            </div>
                        </div>
                    ))}
                </Slide>
                <ContentContainer>
                    <div className={classes.gallery_section}>
                        <div className={classes.gallery_heading}>PHOTO GALLERY</div>
                        <div className={classes.events_gallery}>
                            <EventsGallery view={showAll} />
                        </div>
                        <div className={classes.viewall_button}>
                            <span onClick={() => setShowAll(!showAll)}>
                                {showAll ? "View Less" : "View All"}
                            </span>
                        </div>
                    </div>

                    <div className={classes.events_parent}>
                        <div className={classes.events_created}>
                            Latest tour and Travel Packages
                        </div>

                        <div className={classes.tabs_container}>
                            <Tabs data={tabs} setTab={setSelectedTab} />
                        </div>

                        <div className={classes.events_container}>
                            {selectedTab === 0
                                ? events
                                    .filter((pack) => pack.kashmir === true)
                                    ?.slice(0, viewAll ? events.length : 3)
                                    ?.map((event, index) => {
                                        return (
                                            <EventItem
                                                event={event}
                                                index={index}
                                                onClick={() => onEventClick(event)}
                                            />
                                        );
                                    })
                                : selectedTab === 1
                                    ? events
                                        .filter((pack) => pack.kashmir === false)
                                        ?.slice(0, 6)
                                        ?.map((event, index) => {
                                            return (
                                                <EventItem
                                                    event={event}
                                                    index={index}
                                                    onClick={() => onEventClick(event)}
                                                />
                                            );
                                        })
                                    : ""}
                        </div>

                        <div className={classes.viewall_button}>
                            <span onClick={() => setViewAll(!viewAll)}>
                                {viewAll ? "View Less" : "View All"}
                            </span>
                        </div>
                    </div>
                    {/* <TravelPlannerCards /> */}
                    {/* <Destinations /> */}
                </ContentContainer>
            </div>
            {showModal && (
                <EventDescription
                    item={selectedEvent}
                    setShowModal={() => setShowModal(false)}
                />
            )}
        </MainWrapper>
    );
}
export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? "es", ["common"])),
    },
});

export default Home;
