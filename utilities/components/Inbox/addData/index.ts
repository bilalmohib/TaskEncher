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
    // setMessage?: any,
) => {

    if (signedInUserData) {
        if (type == "singleUser") {
            addDoc(collection(db, `Data/Chat/Single/Users/${signedInUserData.email}`), dataObject)
                .then(() => {
                    console.log("Data sent");
                    // setMessage("");
                    // alert("User Added Successfully.");
                })
                .catch(err => {
                    console.warn(err);
                    alert(`Error creating Job: ${err.message}`);
                });

            const senderUserData = {
                uid: signedInUserData.uid,
                email: signedInUserData.email,
                name: signedInUserData.displayName,
                lastMessage: '',
                lastMessageTime: new Date().toLocaleTimeString(),
                profilePic: signedInUserData.photoURL,
                isOnline: true
            }

            addDoc(collection(db, `Data/Chat/Single/Users/${dataObject.email}`), senderUserData)
                .then(() => {
                    console.log("Data sent");
                    // alert("User Added Successfully.");
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
                    alert("Project Chat Added Successfully.");
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