import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CgMenu } from 'react-icons/cg';
import styles from './style.module.css';
import Image from 'next/image';

import {
    Box,
    Typography,
    Link,
    Button
} from "@mui/material";
import { styled } from '@mui/system';

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

const GradientButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(90deg, #ff5e62 0%, #ff9966 100%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 35,
    padding: '0 20px',
    '&:hover': {
        background: 'linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)',
    },
}));

interface NavProps {
    setIsOpen: any,
    isOpen: Boolean
}

const Navbar: React.FC<NavProps> = ({
    setIsOpen,
    isOpen
}) => {

    const router = useRouter();

    useEffect(() => {
        document.querySelectorAll('.ripple').forEach((ripple) => {
            ripple.addEventListener('mousedown', function (e: any) {
                const x = e.clientX - e.target.getBoundingClientRect().left;
                const y = e.clientY - e.target.getBoundingClientRect().top;

                e.target.style.setProperty('--x', `${x}px`);
                e.target.style.setProperty('--y', `${y}px`);
            });
        });
    }, []);

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
                // User is Not signed in
                console.log("User is Not Signed In");
                setSignedInUserData(null);
                setloading(false);
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
                // navigate("/");
                // reload page 
                window.location.reload();
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
                    <span className={`${styles.navbarHamburger} ripple`} onClick={() => setIsOpen(!isOpen)}>
                        <CgMenu
                            style={{
                                marginTop: '-3px',
                            }}
                            size={28}
                        />
                    </span>
                    &nbsp; &nbsp;
                    <div className={styles.navbarLogo}>
                        <Image
                            src="/logocopy.png"
                            width={42}
                            height={42}
                            alt="Logo"
                            loading="lazy"
                        />
                    </div>
                    <span className={styles.navbarCaption}>
                        TaskEncher
                    </span>
                    <Typography
                        variant="subtitle2"
                        component="span"
                        style={{
                            color: '#FF0000',
                            fontWeight: 'bold',
                            marginLeft: '5px',
                        }}
                    >
                        BETA
                    </Typography>
                    <div style={{ fontSize: 10, position: 'relative', bottom: '-10px', right: '-5px' }}>
                        Rev Up Tasks & Efficiency
                    </div>
                </a>

                <div>
                    {(!Loading && signedInUserData) ? (
                        <div className={`${styles.navItems} navbar-nav`}>
                            <a className="nav-link active" aria-current="page" href="#">
                                {/* 5 days left in trial */}
                                5 credits left
                            </a>
                            <a className="nav-link" href="#">
                                <GradientButton variant="contained" size="small">
                                    Add billing info
                                </GradientButton>
                            </a>

                            {/* Avatar */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                                    <Image
                                        src={signedInUserData.photoURL}
                                        className="rounded-circle"
                                        width={32}
                                        height={32}
                                        alt={signedInUserData.displayName}
                                        loading="lazy"
                                    />
                                </a>
                                <ul className={`dropdown-menu ${styles.dropdown_nav}`} aria-labelledby="navbarDropdownMenuLink">
                                    <li
                                        onClick={() => {
                                            router.push(`/profile/${signedInUserData.uid}`);
                                        }}
                                    >
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