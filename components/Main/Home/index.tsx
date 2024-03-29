/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, useEffect } from 'react';
//////////////////////////////////////////////////
import CustomLoader from '../../CustomLoader';

// Importing Icons
import { IoIosArrowDropdown } from 'react-icons/io';
import { AiOutlineCheck } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import EditIcon from '@mui/icons-material/Edit';
// Importing Widgets
import Widget1 from '../../Widgets/Widget1';
import Widget2 from '../../Widgets/Widget2';
import Widget3 from '../../Widgets/Widget3';
import Widget4 from '../../Widgets/Widget4';
import Widget5 from '../../Widgets/Widget5';
import Widget6 from '../../Widgets/Widget6';
//////////////////////////////////////////////////

// importing material ui
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

// Importing firebase
import { auth } from "../../../firebase";
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";

//Importing Containers CSS Files
import styles from './style.module.css';

interface HomeProps {
    totalCompletedTasks: number;
    projectList: any;
    projectMembers: any;
    // Customized Modal
    isModalOpenCustomized: boolean;
    setIsModalOpenCustomized: (value: boolean) => void;

    //Widgets
    widgetsList: any;
    setWidgetsList: (value: any) => void;
}

const Home: React.FC<HomeProps> = ({
    totalCompletedTasks,
    projectList,
    projectMembers,

    // Customized Modal
    isModalOpenCustomized,
    setIsModalOpenCustomized,

    //Widgets
    widgetsList,
    setWidgetsList
}) => {

    // Month Names
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Date
    const d = new Date();

    console.log("Date is equal to : ", d);

    const [currentFullLengthItem, setCurrentFullLengthItem] = useState<Number>(1);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dragItem = useRef<any>();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dragOverItem = useRef<any>();

    // ________________________ For Login ________________________ //

    // signed in user data
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [Loading, setloading] = useState(true);

    // For modal
    const [openModal, setOpenModal] = useState(false);

    const toggleModal = () => {
        setOpenModal(!openModal);
    };
    // For modal

    useEffect(() => {
        // console.log("Current Path : ", window.location.pathname);
        // console.log("activeJobs ==>", activeJobs);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                if (signedInUserData === null) {
                    if (user.isAnonymous === true) {
                        let tempUser = {
                            displayName: "Anonymous",
                            email: "anonymous@guest.com",
                            photoURL: user.photoURL,
                        }
                        console.log(tempUser);
                        setSignedInUserData(tempUser);
                        setloading(false);
                    } else {
                        console.log(user);
                        setSignedInUserData(user);
                        setloading(false);
                    }
                    // ...
                }
            } else {
                // User is signed out
                console.log("User is signed out");
                // alert("Please sign in to continue");
                // navigate("/login");
                // ...
            }
        });
    }, [signedInUserData, Loading]);

    const logoutUser = () => {
        if (window.confirm("Are you sure you want to logout?") && !Loading) {
            signOut(auth).then(() => {
                // Sign-out successful.
                setSignedInUserData(null);
                setloading(true);
                alert("You have been signed out successfully");
                // navigate("/login");
            }).catch((error) => {
                // An error happened.
                // alert(`Error Logging Out : ${error.message}`);
                console.log(`Error Logging out==> ${error}`);
            });
        }
    }
    //________________________ For Login ________________________ //

    // on Pointer Down
    const [pointerDown, setPointerDown] = useState<Boolean>(false);

    const dragStart = (e: any, position: any) => {
        dragItem.current = position;
        console.log(e.target.innerHTML);
    };

    const dragEnter = (e: any, position: any) => {
        dragOverItem.current = position;
        console.log(e.target.innerHTML);
    };

    const drop = (e: any) => {
        let localWidgetsList = widgetsList.widgets;
        const copyListItems = [...localWidgetsList];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setWidgetsList({ ...widgetsList, widgets: copyListItems });
    };

    // Add this function inside the Home component, just before the return statement
    const NewsletterModal = () => {

        const [email, setEmail] = useState<string>("");

        const [emailError, setEmailError] = useState<boolean>(false);
        const [emailErrorText, setEmailErrorText] = useState<string>("");

        const handleSubscribe = () => {
            if (email === "") {
                setEmailError(true);
                setEmailErrorText("Please enter your email");
            } else {
                setEmailError(false);
                setEmailErrorText("");
                alert("Subscribed");
                // toggleModal();
                // console.log(email);
                // console.log("Subscribed");
                // console.log("Subscribed");
            }
        }

        return (
            <Modal
                open={openModal}
                onClose={toggleModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        border: 'none !important',
                        // Remove the outline
                        outline: 'none !important',
                    }}
                >
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={toggleModal}
                        aria-label="close"
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <img
                            src="https://media.istockphoto.com/id/1135541613/photo/project-management-with-icons-about-planning-tasks-and-milestones-on-schedule-cost-management.jpg?s=612x612&w=0&k=20&c=rUpLxP2ceuqUpBQ-uYzhxm538-5ey3Nh01UChIh1Zxs="
                            alt="Project Management"
                            style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '4px' }}
                        />
                    </Box>
                    <Typography id="modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Subscribe to our Newsletter
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 1, mb: 2 }}>
                        Stay informed about our latest updates and upcoming features. This is
                        currently a beta version, and we&apos;ll be launching the full-fledged
                        version soon.
                    </Typography>
                    <TextField
                        fullWidth
                        label="Email Address"
                        placeholder="Enter your email address"
                        sx={{ mt: 1, mb: 2 }}
                        value={email}
                        onChange={(e) => {
                            if (emailError) {
                                setEmailError(false);
                                setEmailErrorText("");
                            }
                            setEmail(e.target.value)
                        }}
                        error={emailError}
                        helperText={emailErrorText}

                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1, mb: 2 }}
                        onClick={handleSubscribe}
                    >
                        Subscribe
                    </Button>
                </Box>
            </Modal>
        )
    }

    // To display the modal after 3 seconds of the component mounting
    // useEffect(() => {
    //     // Delay opening the modal for 3 seconds after the component mounts
    //     const timer = setTimeout(() => {
    //         setOpenModal(true);
    //     }, 3000);

    //     // Clean up the timer when the component is unmounted
    //     return () => clearTimeout(timer);
    // }, []);

    return (
        <div>
            {/* Home Page */}
            {Loading ? (
                <CustomLoader />
            ) : (
                <section className={styles.mainSectionContainer}>
                    <NewsletterModal />
                    <br />
                    {/* <h3 style={{
                        marginLeft: "0px", marginTop: 5,
                        //  color: "#1E1F21",
                        color: "white",
                        fontWeight: "normal", fontSize: "20px"
                    }}>Home</h3> */}
                    {/* <Button 
                    className={styles.customizeButton}
                    >
                        Customize
                    </Button> */}
                    <Button
                        variant="contained"
                        endIcon={<EditIcon />}
                        className={styles.customizeButton}
                        onClick={() => setIsModalOpenCustomized(true)}
                    >
                        Customize ...
                    </Button>
                    <br />
                    <div className='text-center text-white'>
                        {d.getDate()} {monthNames[d.getMonth()]} {d.getFullYear()}
                    </div>
                    <div className="text-white">
                        {/* Audio Player */}
                        {/* {currentAudio} */}
                        {/* Audio Player */}

                        {new Date().getHours() < 12 ? (
                            <h1 className={`${styles.welcomeHeading}`} style={{ fontWeight: "lighter" }}>
                                Good morning, {
                                    signedInUserData.displayName === "Anonymous" ? signedInUserData.displayName : ((signedInUserData.displayName.match(/\b(\S+)\b/gi)[0] === "Muhammad") ? (signedInUserData.displayName.match(/\b(\S+)\b/gi)[1]) : (signedInUserData.displayName.match(/\b(\S+)\b/gi)[0]))
                                }
                            </h1>
                        ) : new Date().getHours() < 18 ? (
                            <h1 className={`${styles.welcomeHeading}`} style={{ fontWeight: "lighter" }}>
                                Good afternoon, {
                                    signedInUserData.displayName === "Anonymous" ? signedInUserData.displayName : ((signedInUserData.displayName.match(/\b(\S+)\b/gi)[0] === "Muhammad") ? (signedInUserData.displayName.match(/\b(\S+)\b/gi)[1]) : (signedInUserData.displayName.match(/\b(\S+)\b/gi)[0]))
                                }
                            </h1>
                        ) : (
                            <h1 className={`${styles.welcomeHeading}`} style={{ fontWeight: "lighter" }}>
                                Good evening, {
                                    signedInUserData.displayName === "Anonymous" ? signedInUserData.displayName : ((signedInUserData.displayName.match(/\b(\S+)\b/gi)[0] === "Muhammad") ? (signedInUserData.displayName.match(/\b(\S+)\b/gi)[1]) : (signedInUserData.displayName.match(/\b(\S+)\b/gi)[0]))
                                }
                            </h1>
                        )}
                    </div>
                    <section className='d-flex justify-content-center'>
                        <div className={styles.statsContainer}>
                            <div className={styles.stats1}>
                                {/* Months */}
                                <div className="btn-group" style={{ fontSize: 12, height: 28, boxShadow: "none" }}>
                                    <button type="button" className={`btn btn-btnDrop text-white ${styles.btn_dropdown}`} data-mdb-toggle="dropdown" aria-expanded="false">
                                        My month <IoIosArrowDropdown style={{ marginTop: -2 }} />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">My Week</a></li>
                                        <li><a className="dropdown-item" href="#">My Month</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.stats2}>
                                <span style={{ fontSize: 20, fontWeight: "400" }}>
                                    <AiOutlineCheck style={{ marginTop: -5 }} />
                                    {totalCompletedTasks}
                                </span>
                                <span style={{ marginTop: 3 }}>
                                    &nbsp;
                                    tasks completed
                                </span>
                            </div>
                            <div className={styles.stats3}>
                                <span style={{ fontSize: 20, fontWeight: "400" }}>
                                    <BsPeople style={{ marginTop: -5 }} />
                                    &nbsp;
                                    {projectMembers.length}
                                </span>
                                <span style={{ marginTop: 3 }}>
                                    &nbsp;
                                    collaborators
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* ++++++++++++++++++++++++++++++++++++ Widgets Container ++++++++++++++++++++++++++++++++++++ */}
                    <section className={styles.widgetsContainer}>
                        {widgetsList &&
                            widgetsList.widgets.map((item: any, index: number) => (
                                <div
                                    className={`${((item.id == currentFullLengthItem) ? (styles.fullWidthWidget) : (null))} ${((pointerDown && item.id == currentFullLengthItem) ? (styles.pointerDown) : (styles.pointerOut))}`}
                                    onDragStart={e => dragStart(e, index)}
                                    onDragEnter={e => dragEnter(e, index)}
                                    onDragEnd={drop}
                                    onDragOver={() => {
                                        setPointerDown(true)
                                    }}
                                    // onMouseOver={() => {
                                    //     setCurrentAudio(
                                    //         <audio id='hoverSoundClip'>
                                    //             <source src={`audio/${item.id}.mp3`} />
                                    //             {/* Your browser is not invited for super fun audio time. */}
                                    //         </audio>
                                    //     );
                                    //     //alert(currentAudio);
                                    //     console.log(<audio id='hoverSoundClip'>
                                    //         <source src={`audio/${item.id}.mp3`} />
                                    //         {/* Your browser is not invited for super fun audio time. */}
                                    //     </audio>);
                                    //     let audio = document.getElementById("hoverSoundClip") as HTMLAudioElement;
                                    //     audio.play();
                                    // }}
                                    // onMouseOut={() => {
                                    //     let audio = document.getElementById("hoverSoundClip") as HTMLAudioElement;
                                    //     //setCurrentAudio("");
                                    //     audio.pause();
                                    //     // audio.currentTime = 0;
                                    // }}
                                    onMouseUp={() => setPointerDown(false)}
                                    onDoubleClick={() => {
                                        console.log("Double Clicked");
                                        if (item.id === currentFullLengthItem) {
                                            setCurrentFullLengthItem(0);
                                        }
                                        else {
                                            setCurrentFullLengthItem(item.id);
                                        }
                                    }}
                                    key={index}
                                    draggable
                                >
                                    {(item.id === 1 && item.isVisible) &&
                                        <div className={styles.widget}>
                                            <Widget1
                                                email={signedInUserData.email}
                                                item={item.id}
                                                currentFullLengthItem={currentFullLengthItem}
                                                setCurrentFullLengthItem={setCurrentFullLengthItem}
                                            />
                                        </div>
                                    }
                                    {(item.id === 2 && item.isVisible) &&
                                        <div className={styles.widget}>
                                            <Widget2
                                                email={signedInUserData.email}
                                                item={item.id}
                                                currentFullLengthItem={currentFullLengthItem}
                                                setCurrentFullLengthItem={setCurrentFullLengthItem}
                                                signedInUserData={signedInUserData}
                                            />
                                        </div>
                                    }
                                    {(item.id === 3 && item.isVisible) &&
                                        <div className={styles.widget}>
                                            <Widget3
                                                email={signedInUserData.email}
                                                item={item.id}
                                                currentFullLengthItem={currentFullLengthItem}
                                                setCurrentFullLengthItem={setCurrentFullLengthItem}

                                                // Project Members
                                                projectMembers={projectMembers}
                                            />
                                        </div>
                                    }
                                    {(item.id === 4 && item.isVisible) &&
                                        <div className={styles.widget}>
                                            <Widget4
                                                email={signedInUserData.email}
                                                item={item.id}
                                                currentFullLengthItem={currentFullLengthItem}
                                                setCurrentFullLengthItem={setCurrentFullLengthItem}
                                            />
                                        </div>
                                    }
                                    {(item.id === 5 && item.isVisible) &&
                                        <div className={styles.widget}>
                                            <Widget5
                                                email={signedInUserData.email}
                                                item={item.id}
                                                currentFullLengthItem={currentFullLengthItem}
                                                setCurrentFullLengthItem={setCurrentFullLengthItem}
                                            />
                                        </div>
                                    }
                                    {(item.id === 6 && item.isVisible) &&
                                        <div className={styles.widget}>
                                            <Widget6
                                                email={signedInUserData.email}
                                                item={item.id}
                                                currentFullLengthItem={currentFullLengthItem}
                                                setCurrentFullLengthItem={setCurrentFullLengthItem}
                                            />
                                        </div>
                                    }
                                </div>
                            ))}
                    </section>
                    {/* ++++++++++++++++++++++++++++++++++++ Widgets Container ++++++++++++++++++++++++++++++++++++ */}
                    <br />
                    <br />
                    <br />
                    <br />
                </section>
            )}

        </div>
    );
}
export default Home;