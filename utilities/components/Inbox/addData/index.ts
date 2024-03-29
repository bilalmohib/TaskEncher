import React, { useState, useRef, useEffect } from 'react';

import {
    doc,
    collection,
    onSnapshot,
    addDoc,
    query,
    orderBy,
    deleteDoc,
    setDoc,
    where
} from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';

// Importing firebase
import { db, auth } from "../../../../firebase";

// Global function to add data to firestore
const addData = (
    dataObject: any,
    type: string,
    isSignedIn: boolean,
    signedInUserData: any,
    enqueueSnackbar: any
) => {

    if (signedInUserData) {
        console.log("DATA OBJECT ===> ", dataObject)
        if (type == "singleUser") {

            const senderUserData = {
                uid: signedInUserData.uid,
                email: signedInUserData.email,
                name: signedInUserData.displayName,
                lastMessage: '',
                lastMessageTime: new Date().toLocaleTimeString(),
                profilePic: signedInUserData.photoURL,
                isOnline: true,
                type: dataObject.type
            }

            addDoc(collection(db, `Data/Chat/Single/Users/${dataObject.email}`), senderUserData)
                .then(() => {
                    console.log("Data sent");
                    let message: string = `User Receiver Added Successfully.`;
                    console.log(message);
                    alert(message);
                    // enqueueSnackbar(
                    //     message,
                    //     {
                    //         variant: 'success',
                    //         anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                    //     },
                    // )
                })
                .catch(err => {
                    console.warn(err);
                    // alert(`Error creating Job: ${err.message}`);
                    let message: string = `Error sending message to ${dataObject.name}`;
                    console.log(message);
                    // enqueueSnackbar(
                    //     message,
                    //     {
                    //         variant: 'error',
                    //         anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                    //     },
                    // )
                });

            addDoc(collection(db, `Data/Chat/Single/Users/${signedInUserData.email}`), dataObject)
                .then(() => {
                    console.log("Data sent");
                    // setMessage("");
                    // alert("User Added Successfully.");
                    let message: string = "User Added Successfully.";
                    console.log(message);
                    alert(message);
                    // enqueueSnackbar(
                    //     message,
                    //     {
                    //         variant: 'success',
                    //         anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                    //     },
                    // )
                })
                .catch(err => {
                    console.warn(err);
                    alert(`Error creating Job: ${err.message}`);
                });

        } else if (type === "singleChat") {
            addDoc(collection(db, `Chat/Single/Chat`), dataObject)
                .then(() => {
                    console.log("Data sent");
                    // alert("Chat Added Successfully.");
                    let message: string = `Message sent to ${dataObject.name}`;
                    console.log(message);
                    // enqueueSnackbar(
                    //     message,
                    //     {
                    //         variant: 'success',
                    //         anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                    //     },
                    // )
                })
                .catch(err => {
                    console.warn(err);
                    alert(`Error creating Job: ${err.message}`);
                });
        } else if (type === "ProjectChat") {
            // alert("Project Chat Added Successfully");
            addDoc(collection(db, `Chat/Project/Chat`), dataObject)
                .then(() => {
                    console.log("Project Chat Data sent");
                    // alert("Project Chat Added Successfully.");
                    let message: string = `Message sent to ${dataObject.name}`;
                    // enqueueSnackbar(
                    //     message,
                    //     {
                    //         variant: 'success',
                    //         anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                    //     },
                    // )
                })
                .catch(err => {
                    console.warn(err);
                    alert(`Error Sending Project Chat: ${err.message}`);
                });
        }
    }
    else {
        alert("Please sign in to save project to cloud.")
    }
}
export default addData;