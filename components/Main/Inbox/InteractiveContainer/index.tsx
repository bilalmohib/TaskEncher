import React, { useState, FC, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons';
import { storage } from '@app/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import addData from '../../../../utilities/components/Inbox/addData';
import { IoAddCircleOutline } from 'react-icons/io5';
import { TbClearFormatting } from 'react-icons/tb';
import { CgFormatBold, CgFormatText } from 'react-icons/cg';
import { MdAttachFile, MdOutlineFormatTextdirectionLToR } from 'react-icons/md';
import { BsRecord, BsRecord2, BsRecord2Fill, BsStarFill } from 'react-icons/bs';
import { BsSkipStartCircle } from 'react-icons/bs';
import { CiStar } from 'react-icons/ci';
//Creating a bottom toolbar
interface ToolbarProps {
  onBoldClick: () => void;
  onItalicClick: () => void;
  onUnderlineClick: () => void;
  onButtonClick: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onBoldClick,
  onItalicClick,
  onUnderlineClick,
  onButtonClick,
}) => (
  <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
    <div style={{ display: 'flex' }}>
      <FontAwesomeIcon icon={faBold} onClick={onBoldClick} style={{ marginRight: '10px', cursor: 'pointer' }} />
      <FontAwesomeIcon icon={faItalic} onClick={onItalicClick} style={{ marginRight: '10px', cursor: 'pointer' }} />
      <FontAwesomeIcon icon={faUnderline} onClick={onUnderlineClick} style={{ marginRight: '10px', cursor: 'pointer' }} />
    </div>
    <button onClick={onButtonClick} style={{ marginLeft: 'auto' }}>
      Submit
    </button>
  </div>
);
interface InteractiveContainerProps {
  currentSelectedChatUser: string;
  signedInUserData: any;
  isSignedIn: boolean;
  chatType: "Single" | "Project"
}

const InteractiveContainer: React.FC<InteractiveContainerProps> = ({
  signedInUserData,
  currentSelectedChatUser,
  isSignedIn,
  chatType
}) => {
  const [message, setMessage] = useState('');

  const handleChange = (event: any) => {
    setMessage(event.target.value);
  };
  // const [text, setText] = useState('');
  // const handleSubmit = () => {
  //     console.log(text); // or send the text to a server
  //   };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    // userIDSender: this.userIDSender,
    // userNameSender: this.userNameSender,
    // userIDReceiver: this.userIDReceiver,
    // userNameReceiver: this.userNameReceiver,
    // message:this.message,
    // timeSent:this.timeSent,
    // isUserOnline:this.isUserOnline

    if (message !== '' && currentSelectedChatUser !== "" && signedInUserData !== null) {
      if (chatType === "Single") {
        // Get Current User's Display Name from email
        let displayNameReceiver = currentSelectedChatUser.split("@")[0];
        let receiverId = currentSelectedChatUser;

        let senderId = signedInUserData.email;
        let displayNameSender = senderId.split("@")[0];

        const messageObject = {
          // userIDSender: signedInUserData.uid,
          // userNameSender: signedInUserData.displayName,
          userIDSender: senderId,
          userNameSender: displayNameSender,
          userIDReceiver: receiverId,
          userNameReceiver: displayNameReceiver,
          message: message,
          timeSent: new Date().toLocaleString(),
          isUserOnline: true
        }

        console.log("Message Object: ", messageObject);

        // Adding chat to firestore
        addData(
          messageObject,
          "singleChat",
          isSignedIn,
          signedInUserData
        );
      } else {
        // Get Current User's Display Name from email
        let displayNameReceiver = currentSelectedChatUser.split("@")[0];
        let receiverId = currentSelectedChatUser;

        let senderId = signedInUserData.email;
        let displayNameSender = senderId.split("@")[0];

        const messageObject = {
          // userIDSender: signedInUserData.uid,
          // userNameSender: signedInUserData.displayName,
          userIDSender: senderId,
          userNameSender: displayNameSender,
          // userIDReceiver: receiverId,
          // userNameReceiver: displayNameReceiver,
          userIDReceiver: receiverId,
          message: message,
          timeSent: new Date().toLocaleString(),
          isUserOnline: true
        }

        console.log("Project Chat Message Object: ", messageObject);

        // Adding chat to firestore
        addData(
          messageObject,
          "ProjectChat",
          isSignedIn,
          signedInUserData
        );
      }

      // // Clearing the message field
      // setMessage('');
    } else {
      alert('Please enter a message to send it');
    }
  }
  const [file, setFile] = useState<File>();
  const inputFile = useRef(null) 
  // progress
  const [percent, setPercent] = useState(0);

  // Handle file upload event and update state
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
    const storageRef = ref(storage, `/files/${file!.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file!);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          if (url !== '' && currentSelectedChatUser !== "" && signedInUserData !== null) {
            if (chatType === "Single") {
              // Get Current User's Display Name from email
              let displayNameReceiver = currentSelectedChatUser.split("@")[0];
              let receiverId = currentSelectedChatUser;

              let senderId = signedInUserData.email;
              let displayNameSender = senderId.split("@")[0];

              const messageObject = {
                // userIDSender: signedInUserData.uid,
                // userNameSender: signedInUserData.displayName,
                userIDSender: senderId,
                userNameSender: displayNameSender,
                userIDReceiver: receiverId,
                userNameReceiver: displayNameReceiver,
                message: url,
                timeSent: new Date().toLocaleString(),
                isUserOnline: true
              }

              console.log("Message Object: ", messageObject);

              // Adding chat to firestore
              addData(
                messageObject,
                "singleChat",
                isSignedIn,
                signedInUserData
              );
            } else {
              // Get Current User's Display Name from email
              let displayNameReceiver = currentSelectedChatUser.split("@")[0];
              let receiverId = currentSelectedChatUser;

              let senderId = signedInUserData.email;
              let displayNameSender = senderId.split("@")[0];

              const messageObject = {
                // userIDSender: signedInUserData.uid,
                // userNameSender: signedInUserData.displayName,
                userIDSender: senderId,
                userNameSender: displayNameSender,
                // userIDReceiver: receiverId,
                // userNameReceiver: displayNameReceiver,
                userIDReceiver: receiverId,
                message: url,
                timeSent: new Date().toLocaleString(),
                isUserOnline: true
              }

              console.log("Project Chat Message Object: ", messageObject);

              // Adding chat to firestore
              addData(
                messageObject,
                "ProjectChat",
                isSignedIn,
                signedInUserData
              );
            }

            // // Clearing the message field
            // setMessage('');
          } else {
            alert('Please upload an image to send it');
          }
        });
      }
    );
  };

  const handleUpload = () => {
    if (!file) {
      // ref.fileUploader.click();
      // alert("Please upload an image first!");
    }

    // const storageRef = ref(storage, `/files/${file!.name}`);

    // // progress can be paused and resumed. It also exposes progress updates.
    // // Receives the storage reference and the file to upload.
    // const uploadTask = uploadBytesResumable(storageRef, file!);

    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const percent = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );

    //     // update progress
    //     setPercent(percent);
    //   },
    //   (err) => console.log(err),
    //   () => {
    //     // download url
    //     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //       console.log(url);
    //       if (url !== '' && currentSelectedChatUser !== "" && signedInUserData !== null) {
    //         if (chatType === "Single") {
    //           // Get Current User's Display Name from email
    //           let displayNameReceiver = currentSelectedChatUser.split("@")[0];
    //           let receiverId = currentSelectedChatUser;

    //           let senderId = signedInUserData.email;
    //           let displayNameSender = senderId.split("@")[0];

    //           const messageObject = {
    //             // userIDSender: signedInUserData.uid,
    //             // userNameSender: signedInUserData.displayName,
    //             userIDSender: senderId,
    //             userNameSender: displayNameSender,
    //             userIDReceiver: receiverId,
    //             userNameReceiver: displayNameReceiver,
    //             message: url,
    //             timeSent: new Date().toLocaleString(),
    //             isUserOnline: true
    //           }

    //           console.log("Message Object: ", messageObject);

    //           // Adding chat to firestore
    //           addData(
    //             messageObject,
    //             "singleChat",
    //             isSignedIn,
    //             signedInUserData
    //           );
    //         } else {
    //           // Get Current User's Display Name from email
    //           let displayNameReceiver = currentSelectedChatUser.split("@")[0];
    //           let receiverId = currentSelectedChatUser;

    //           let senderId = signedInUserData.email;
    //           let displayNameSender = senderId.split("@")[0];

    //           const messageObject = {
    //             // userIDSender: signedInUserData.uid,
    //             // userNameSender: signedInUserData.displayName,
    //             userIDSender: senderId,
    //             userNameSender: displayNameSender,
    //             // userIDReceiver: receiverId,
    //             // userNameReceiver: displayNameReceiver,
    //             userIDReceiver: receiverId,
    //             message: url,
    //             timeSent: new Date().toLocaleString(),
    //             isUserOnline: true
    //           }

    //           console.log("Project Chat Message Object: ", messageObject);

    //           // Adding chat to firestore
    //           addData(
    //             messageObject,
    //             "ProjectChat",
    //             isSignedIn,
    //             signedInUserData
    //           );
    //         }

    //         // // Clearing the message field
    //         // setMessage('');
    //       } else {
    //         alert('Please upload an image to send it');
    //       }
    //     });
    //   }
    // );
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <textarea
        value={message}
        onChange={handleChange}
        style={{
          width: '95%',
          height: '140px',
          padding: '10px',
          boxSizing: 'border-box',
          // border: 'none',
          borderRadius: '10px',
          resize: 'none',
          outline: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '65px',
          left: '20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton style={{ marginRight: '10px' }}><IoAddCircleOutline /></IconButton>
        <IconButton style={{ marginRight: '10px' }}><MdOutlineFormatTextdirectionLToR /></IconButton>
        <IconButton style={{ marginRight: '10px' }}><BsRecord2 /></IconButton>
        <IconButton style={{ marginRight: '10px', width: '35px', height: '35px' }}>@</IconButton>
        <IconButton style={{ marginRight: '10px' }}><CiStar /></IconButton>
        <IconButton style={{ marginRight: '10px' }} >
        <label htmlFor="fileUpload">
          <input
          id="fileUpload"
            type="file"
            
            // hidden
            // style={{display: 'none'}}
            style={{
              width: '0px',
              height: '0px',
              display: 'none'
              // visibility: 'hidden'
              // position: "absolute",
              // left: "-9999px",
              // visibility: "hidden"
            }}
            onChange={handleFileChange}            
          />
          <MdAttachFile />
        {/* <div>
          <h3>Open</h3>
          <p>Other stuff in here</p>
        </div> */}
      </label>
      {/* <input hidden id="fileUpload" type="file" accept="video/*" /> */}
        </IconButton>
        {/* <input type="file" title=""
          value="" /> */}
      </div>
      {/* {/* <input type="file" onChange={handleChange} accept="/image/*" />
      <button onClick={handleUpload}>Upload to Firebase</button>
      <p>{percent} "% done"</p> */}

      <Button
        onClick={handleSubmit}
        style={{
          position: 'absolute',
          bottom: '70px',
          boxShadow: 'none',
          right: '40px',
        }} variant="contained">Comment</Button>
    </div>
  );
};

export default InteractiveContainer;