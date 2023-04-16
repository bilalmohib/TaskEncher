import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
// importing icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { VscGithub } from "react-icons/vsc";

// importing components
import LoginButton from "../components/LoginButton";
import CustomLoader from "../components/CustomLoader";

import {
    Box,
    Typography,
    TextField,
    Button
} from "@mui/material";

// importing styles
import styles from "../styles/ContainerCss/Login.module.css";

// importing firebase
// Importing firebase
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    signInAnonymously,
    GithubAuthProvider,
    updateProfile,
    getAuth
} from "firebase/auth";

import { auth } from "../firebase/index";

import { db } from "../firebase/index";
import {
    doc,
    collection,
    onSnapshot,
    addDoc,
    query,
    orderBy,
    deleteDoc,
    setDoc,
    Timestamp
} from "firebase/firestore";

const Signup: NextPage = () => {
    const router = useRouter();

    const [loading, setLoading] = useState<Boolean>(true);

    // For Email Authentication
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // States for status of login users
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // If user is signed in Navigate to Home Page
                // navigate('/');
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // When the user state is known, we set the state isSignedIn to true
                if (signedInUserData === null) {
                    // window.location.href = "/";
                    if (user.isAnonymous === true) {
                        let tempUser = {
                            displayName: "Anonymous Guest",
                            email: "anonymous@guest.com",
                            photoURL: user.photoURL,
                        }
                        console.log(tempUser);
                        setSignedInUserData(tempUser);
                    } else {
                        console.log(user);
                        setSignedInUserData(user);
                    }
                    alert(`Welcome ${user.email}! You are successfully logged in`);
                    router.push(`/createProject`);
                    console.log("Signed In User Data ==> ", user);
                    // setIsSignedIn(true);
                }
            } else {
                // User is signed out
                console.log("User is Not Signed In Yet");
                // When the user state is known, we set the state isSignedIn to false
                // setIsSignedIn(false);
                // ...
            }
            // When the user state is known, we set the loading state to false
            setLoading(false);
        });
    }, [router, router.pathname, signedInUserData]);

    const handleSignUpWithEmail = (e: React.SyntheticEvent) => {
        e.preventDefault();

        // if (password.length < 6) {
        //   alert("Password must be at least 6 characters long");
        //   return;
        // }

        if (email === "" || password === "") {
            alert("Please fill all the fields");
            return;
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    let user = userCredential.user;
                    let email = user.email;
                    // Extract the users name from the email
                    let name = email?.split("@")[0];
                    const auth = getAuth();
                    // @ts-ignore
                    updateProfile(auth.currentUser, {
                        displayName: name,
                        photoURL: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                    }).then(() => {
                        // Profile updated!
                        // ...
                    }).catch((error) => {
                        // An error occurred
                        // ...
                    });

                    console.log("user is: ", user);
                    // alert("Signed Up Successfully");
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("error is: ", errorCode, errorMessage);
                    alert(`Error Signing Up : ${errorMessage}`);
                    // ..
                });
        }
    };

    // Login with Google 
    const handleLoginWithGoogle = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential?.accessToken;
                // The signed-in user info.
                // const user = result.user;
                // alert(`Congratulations! ${user.displayName} you are successfully registered`);
                // Navigate to Home Page
                // navigate('/');
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error is: ", errorCode, errorMessage);
                alert(`Error Signing Up: ${errorMessage}`);
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const handleLoginWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        provider.addScope('user_birthday');

        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                // const credential = FacebookAuthProvider.credentialFromResult(result);
                // const accessToken = credential.accessToken;

                // console.log("Access Token is equal to : ", accessToken);

                alert(`Congratulations! ${user.displayName} you are successfully registered`);
                // Navigate to Home Page
                // navigate('/');
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                alert("Error Signing Up: " + errorMessage);
                // ...
            });
    }

    const handleLoginWithTwitter = () => {
        const provider = new TwitterAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                // You can use these server side with your app's credentials to access the Twitter API.
                const credential = TwitterAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // const secret = credential.secret;

                // The signed-in user info.
                const user = result.user;

                alert(`Congratulations! ${user.displayName} you are successfully registered`);
                // Navigate to Home Page
                // navigate('/');
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // On Error show the error message.
                console.log("error is: ", errorCode, errorMessage);
                alert(`Error Signing Up: ${errorMessage}`);
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = TwitterAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const handleLoginWithGithub = () => {
        const provider = new GithubAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                alert(`Congratulations! ${user.displayName} you are successfully registered`);
                // Navigate to Home Page
                // navigate('/');
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error is: ", errorCode, errorMessage);
                alert(`Error Signing Up: ${errorMessage}`);
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    // Anonymous Login
    const signInAnonymous = () => {
        signInAnonymously(auth)
            .then(() => {
                // Signed in..
                alert("Anonymous Sign Up Successful");
                // Navigate to Home Page
                // navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error Signing Up Anonymously : ", errorCode, errorMessage);
                alert(`Error Signing Up Anonymously : ${errorMessage}`);
                // ...
            });
    }

    useEffect(() => {
        // console.clear();
        // console.log('routeChangeStart', router.pathname);
        if (router.pathname === "/login") {
            // 
        }
        setTimeout(() => {
            setLoading(false);
        }, 4000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.pathname]);

    return (
        <Box className={styles.container}>
            <Head>
                <title>SignUp TaskEncher - Rev Up Tasks and Efficiency</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {(!loading) ? (
                <Box>
                    <Box className={styles.main}>
                        <Box className={styles.login_box}>
                            <Typography
                                variant="h3"
                                style={{
                                    fontWeight: 600,
                                    background: 'linear-gradient(90deg, #5e8cff 0%, #66ffeb 100%)',
                                    WebkitBackgroundClip: 'text',
                                    MozBackgroundClip: 'text',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontFamily: 'Poppins',
                                    letterSpacing: 2,
                                }}
                            >
                                TaskEncher
                            </Typography>
                            <p style={{ fontSize: 18, color: 'red' }}>BETA</p>
                            <Typography variant="h4" className={styles.login_title}>
                                Sign Up
                            </Typography>
                            {/* Icons Section */}
                            <Box>
                                <LoginButton
                                    Text="Continue With Google"
                                    Icon={<FcGoogle size={25} />}
                                    onClick={handleLoginWithGoogle}
                                />
                                <LoginButton
                                    Text="Continue With Facebook"
                                    Icon={<FaFacebookF color="#3b5998" size={25} />}
                                    onClick={handleLoginWithFacebook}
                                />
                                <LoginButton
                                    Text="Continue With Twitter"
                                    Icon={<FaTwitter color="#00acee" size={25} />}
                                    onClick={handleLoginWithTwitter}
                                />
                                <LoginButton
                                    Text="Continue With Github"
                                    Icon={<VscGithub size={25} />}
                                    onClick={handleLoginWithGithub}
                                />
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className={styles.form_group}>
                                        <Typography variant="h6" align="left" style={{ marginTop: '30px' }}>
                                            Email
                                        </Typography>
                                        <TextField
                                            type="email"
                                            name="email"
                                            sx={{ marginTop: '10px' }}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={styles.form_control}
                                            placeholder="Enter your email"
                                            fullWidth
                                        />
                                    </div>
                                    <div className={styles.form_group}>
                                        <Typography variant="h6" align="left" style={{ marginTop: '20px' }}>
                                            Password
                                        </Typography>
                                        <TextField
                                            type="password"
                                            name="password"
                                            sx={{ marginTop: '10px' }}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={styles.form_control}
                                            placeholder="Enter your password"
                                            fullWidth
                                        />
                                    </div>
                                    <br />
                                    <div className={styles.form_group}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            size="large"
                                            className={styles.btn_login_email}
                                            onClick={handleSignUpWithEmail}
                                        >
                                            Sign Up
                                        </Button>
                                    </div>
                                    <div>
                                        <Typography variant="subtitle1" align="center" style={{ marginTop: '25px' }}>
                                            Already have an account{' '}
                                            <Link href="/login">
                                                <a href="#" style={{ color: '#0079bf' }}>
                                                    Log In
                                                </a>
                                                {/* Just Sign Up Using Any of the Above Methods */}
                                            </Link>
                                            {' '} Now
                                        </Typography>
                                    </div>
                                </form>
                            </Box>
                            {/* Icons Section */}
                        </Box>

                    </Box>

                    <footer className={styles.footer}></footer>
                </Box>
            ) : (
                <Box>
                    <CustomLoader />
                </Box>
            )}
        </Box>
    );
};
export default Signup;
