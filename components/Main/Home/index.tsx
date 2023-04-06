import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
//////////////////////////////////////////////////
import styles from '../../../styles/Home.module.css';
// Importing Components
import Navbar from '../../Navbar';
// Importing Icons
import { IoIosArrowDropdown } from 'react-icons/io';
import { AiOutlineCheck } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
// Importing Widgets
import Widget1 from '../../Widgets/Widget1';
import Widget2 from '../../Widgets/Widget2';
import Widget3 from '../../Widgets/Widget3';
import Widget4 from '../../Widgets/Widget4';
import Widget5 from '../../Widgets/Widget5';
import Widget6 from '../../Widgets/Widget6';
//////////////////////////////////////////////////

// Importing firebase
import { auth } from "../../../firebase";
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import CustomLoader from '../../CustomLoader';

//Importing Containers CSS Files

const Home = () => {

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

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [list, setList] = useState([
        {
            id: 1,
            src: <audio id='hoverSoundClip'>
                <source src="audio/1.mp3" />
                Your browser is not invited for super fun audio time.
            </audio>,
            name: "Projects",
        },
        {
            id: 2,
            src: <audio id='hoverSoundClip'>
                <source src="audio/2.mp3" />
                Your browser is not invited for super fun audio time.
            </audio>,
            name: "My Priorities",
        },
        {
            id: 3,
            src: <audio id='hoverSoundClip'>
                <source src="audio/3.mp3" />
                Your browser is not invited for super fun audio time.
            </audio>,
            name: "People",
        },
        {
            id: 4,
            src: <audio id='hoverSoundClip'>
                <source src="audio/4.mp3" />
                Your browser is not invited for super fun audio time.
            </audio>,
            name: "Tasks I've Assigned",
        },
        {
            id: 5,
            src: <audio id='hoverSoundClip'>
                <source src="audio/5.mp3" />
                Your browser is not invited for super fun audio time.
            </audio>,
            name: "My goals",
        },
        {
            id: 6,
            src: <audio id='hoverSoundClip'>
                <source src="audio/6.mp3" />
                Your browser is not invited for super fun audio time.
            </audio>,
            name: "Manager Tasks",
        }
    ]);

    // ________________________ For Login ________________________ //
    const router = useRouter();

    // signed in user data
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [Loading, setloading] = useState(true);

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
        const copyListItems = [...list];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setList(copyListItems);
    };

    return (
        <div>
            {/* Home Page */}
            {Loading ? (
                <CustomLoader />
            ) : (
                <section>
                    <br />
                    <h3 style={{ marginLeft: 30, marginTop: 5, color: "black", fontWeight: "lighter" }}>Home</h3>
                    <br />
                    <div className='text-center'>
                        {d.getDate()} {monthNames[d.getMonth()]} {d.getFullYear()}
                    </div>
                    <div>
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
                                    signedInUserData.displayName.match(/\S+/gi)[1] // to get first letter of each word (initials
                                }
                            </h1>
                        ) : (
                            <h1 className={`${styles.welcomeHeading}`} style={{ fontWeight: "lighter" }}>
                                Good evening, {
                                    signedInUserData.displayName.match(/\S+/gi)[1]
                                }
                            </h1>
                        )}
                    </div>
                    <section className='d-flex justify-content-center'>
                        <div className={styles.statsContainer}>
                            <div className={styles.stats1}>
                                {/* Months */}
                                <div className="btn-group" style={{ fontSize: 12, height: 28, boxShadow: "none" }}>
                                    <button type="button" className={`btn btn-btnDrop ${styles.btn_dropdown}`} data-mdb-toggle="dropdown" aria-expanded="false">
                                        My month <IoIosArrowDropdown style={{ marginTop: -2 }} />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="#">My Week</a></li>
                                        <li><a className="dropdown-item" href="#">My Month</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.stats2}>
                                <span style={{ fontSize: 20, fontWeight: "400" }}> <AiOutlineCheck style={{ marginTop: -5 }} /> 7</span> <span style={{ marginTop: 3 }}>&nbsp; tasks completed</span>
                            </div>
                            <div className={styles.stats3}>
                                <span style={{ fontSize: 20, fontWeight: "400" }}> <BsPeople style={{ marginTop: -5 }} />&nbsp;2</span> <span style={{ marginTop: 3 }}>&nbsp; collaborators</span>
                            </div>
                        </div>
                    </section>

                    {/* ++++++++++++++++++++++++++++++++++++ Widgets Container ++++++++++++++++++++++++++++++++++++ */}
                    <section className={styles.widgetsContainer}>
                        {list &&
                            list.map((item, index) => (
                                <div
                                    className={`${styles.widget} ${((item.id == currentFullLengthItem) ? (styles.fullWidthWidget) : (null))} ${((pointerDown && item.id == currentFullLengthItem) ? (styles.pointerDown) : (styles.pointerOut))}`}
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
                                    {item.id === 1 && <Widget1 email={signedInUserData.email} item={item.id} currentFullLengthItem={currentFullLengthItem} setCurrentFullLengthItem={setCurrentFullLengthItem} />}
                                    {item.id === 2 && <Widget2 email={signedInUserData.email} item={item.id} currentFullLengthItem={currentFullLengthItem} setCurrentFullLengthItem={setCurrentFullLengthItem} />}
                                    {item.id === 3 && <Widget3 email={signedInUserData.email} item={item.id} currentFullLengthItem={currentFullLengthItem} setCurrentFullLengthItem={setCurrentFullLengthItem} />}
                                    {item.id === 4 && <Widget4 email={signedInUserData.email} item={item.id} currentFullLengthItem={currentFullLengthItem} setCurrentFullLengthItem={setCurrentFullLengthItem} />}
                                    {item.id === 5 && <Widget5 email={signedInUserData.email} item={item.id} currentFullLengthItem={currentFullLengthItem} setCurrentFullLengthItem={setCurrentFullLengthItem} />}
                                    {/* {item.id === 6 && <Widget6 email={signedInUserData.email} item={item.id} currentFullLengthItem={currentFullLengthItem} setCurrentFullLengthItem={setCurrentFullLengthItem} />} */}
                                </div>
                            ))}
                    </section>
                    {/* ++++++++++++++++++++++++++++++++++++ Widgets Container ++++++++++++++++++++++++++++++++++++ */}

                </section>
            )}

        </div>
    );
}
export default Home;