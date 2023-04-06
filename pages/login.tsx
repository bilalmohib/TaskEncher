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
    CircularProgress,
    Box,
    Typography,
} from "@mui/material";

// importing styles
import styles from "../styles/ContainerCss/Login.module.css";

// importing firebase
// Importing firebase
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    signInAnonymously,
    GithubAuthProvider
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

const Login: NextPage = () => {
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
                    router.push("/");
                    setSignedInUserData(user);
                    console.log("Signed In User Data ==> ", user);
                    setIsSignedIn(true);
                }
            } else {
                // User is signed out
                console.log("User is Not Signed In Yet");
                // When the user state is known, we set the state isSignedIn to false
                setIsSignedIn(false);
                // ...
            }
            // When the user state is known, we set the loading state to false
            setLoading(false);
        });
    });

    const handleLoginWithEmail = (e: React.SyntheticEvent) => {
        e.preventDefault();

        // if (password.length < 6) {
        //   alert("Password must be at least 6 characters long");
        //   return;
        // }

        if (email === "" || password === "") {
            alert("Please fill all the fields");
            return;
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    console.log("user is: ", user);
                    alert("Signed In Successfully");
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log("error is: ", errorCode, errorMessage);
                    alert(`Error logging In : ${errorMessage}`);
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
                alert("Anonymous Sign In Successful");
                // Navigate to Home Page
                // navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error Signing In Anonymously : ", errorCode, errorMessage);
                alert(`Error Signing In Anonymously : ${errorMessage}`);
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
                <title>Login TaskEncher - Rev Up Tasks and Efficiency</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {(!loading) ? (
                <Box>
                    <Box className={styles.main}>
                        <Box className={styles.login_box}>
                            <span style={{ fontSize: 25, fontWeight: "400" }}>TaskEncher</span>
                            <h2 className={styles.login_title}>Log in</h2>
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
                                <form action="javascript:void(null);">
                                    <div className={styles.form_group}>
                                        <div style={{ textAlign: "left" }}>
                                            <label htmlFor="email" style={{ fontSize: "20px", marginTop: "30px" }}>Email</label>
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            id="email"
                                            className={`form-control form-control-lg ${styles.form_control}`}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className={styles.form_group}>
                                        <div style={{ textAlign: "left", marginTop: "20px" }}>
                                            <label htmlFor="password" style={{ fontSize: "20px" }}>Password</label>
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={`form-control form-control-lg ${styles.form_control}`}
                                            id="password"
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <div className={styles.form_group}>
                                        <button
                                            className={`btn btn-primary btn-lg btn-block ${styles.btn_login_email}`}
                                            onClick={handleLoginWithEmail}
                                        >
                                            Log In
                                        </button>
                                    </div>
                                    <div>
                                        <p style={{ textAlign: "center", marginTop: "25px", fontSize: 20 }}>
                                            Don&rsquo;t have an account?{" "}
                                            <Link href="/signup">
                                                <a href="#" style={{ color: "#0079bf" }}>
                                                    Sign up
                                                </a>
                                            </Link>
                                        </p>
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
export default Login;
