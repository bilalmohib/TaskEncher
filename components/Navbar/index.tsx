import React, { useState, useEffect } from 'react';
import { CgMenu } from 'react-icons/cg';
import styles from './style.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
    CircularProgress,
    Box,
    Typography,
    Link,
} from "@mui/material";

// Importing Firebase Hooks
import { db } from "../../firebase";
import { doc, collection, onSnapshot, addDoc, query, orderBy, deleteDoc, setDoc, where } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';

// Importing firebase
import { auth } from "../../firebase";
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";

interface IProps {
    setIsOpen: any,
    isOpen: Boolean
}

const Navbar: React.FC<IProps> = ({
    setIsOpen,
    isOpen
}) => {

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
                            displayName: "Anonymous Guest",
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

    return (
        <nav className={`navbar navbar-expand-lg navbar-dark bg-dark ${styles.nav_bar}`}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    &nbsp;
                    <span className={styles.navbarHamburger} onClick={() => setIsOpen(!isOpen)}> <CgMenu size={25} /> </span>
                    &nbsp; &nbsp;
                    <Image src="/navlogo.svg" alt="Asana" width={100} height={18} />
                </a>
                <div>
                    {(!Loading && signedInUserData) ? (
                        <div className={`${styles.navItems} navbar-nav`}>
                            <a className="nav-link active" aria-current="page" href="#">5 days left in trial</a>
                            <a className="nav-link" href="#">
                                <button className="btn btn-warning btn-sm">Add billing info</button>
                            </a>

                            {/* Avatar */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                    <Image src={signedInUserData.photoURL} className="rounded-circle" width={22} height={22} alt={signedInUserData.displayName} loading="lazy" />
                                </a>
                                <ul className={`dropdown-menu ${styles.dropdown_nav}`} aria-labelledby="navbarDropdownMenuLink">
                                    <li>
                                        <a className="dropdown-item" href="#">My profile</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Settings</a>
                                    </li>
                                    <li onClick={logoutUser}>
                                        <a className="dropdown-item" href="#">Logout</a>
                                    </li>
                                </ul>
                            </li>
                            {/* Avatar */}
                        </div>
                    ) : (
                        <Box
                            sx={{
                                marginRight: { sm: "27px", xs: "10px" },
                            }}
                        >
                            <Link
                                sx={{
                                    fontSize: "20px",
                                    fontWeight: "500",
                                    letterSpacing: "0.1px",
                                    color: "#fff",
                                    margin: "0",
                                    marginBottom: "5px",
                                    textDecoration: "none",
                                    cursor: "pointer",
                                    "&:hover": {
                                        textDecoration: "underline",
                                        color: "#0091ff",
                                    },
                                }}
                                onClick={() => router.push("/login")}
                            >
                                Login
                            </Link>
                        </Box>
                    )}
                </div>
            </div>
        </nav >
    )
}
export default Navbar;