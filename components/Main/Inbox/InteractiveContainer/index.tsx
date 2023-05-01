import React, { useState, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons';
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

    return (
        // <Box
        //     className="w-full bg-white flex justify-center align-middle"
        //     // If text field is focused, then the border should be bluish otherwise greyish border
        //     sx={{
        //         border: "1px solid",
        //         borderColor: "grey.500",
        //         borderRadius: "0px 0px 0px 0px",
        //         '&:focus-within': {
        //             borderColor: "blue",
        //             borderRadius: "0px 0px 0px 0px",
        //         },
        //     }}
        // >
        //     <TextField
        //         sx={{
        //             backgroundColor: "white",
        //             border: "none",
        //             '& .MuiOutlinedInput-root': {
        //                 '& fieldset': {
        //                     border: "none",
        //                     borderRadius: "0px 0px 0px 0px",
        //                 },
        //                 '&:hover fieldset': {
        //                     border: "none",
        //                     borderRadius: "0px 0px 0px 0px",
        //                 },
        //                 '&.Mui-focused fieldset': {
        //                     border: "none",
        //                     borderRadius: "0px 0px 0px 0px",
        //                 },
        //             },
        //         }}
        //         label=""
        //         placeholder='Type your message here...'
        //         value={message}
        //         onChange={handleChange}
        //         variant="outlined"
        //         multiline
        //         fullWidth
        //         rows={7}
        //         // Trigger Send on Enter Press
        //         onKeyDown={(event: React.KeyboardEvent) => {
        //             if (event.key === 'Enter' && !event.shiftKey) {
        //                 event.preventDefault();
        //                 handleSubmit();
        //             }
        //         }}
        //     />
        //     <IconButton
        //         sx={{
        //             backgroundColor: "white",
        //             width: "50px",
        //             height: "200px",
        //             borderRadius: "0%",
        //             alignSelf: "center",
        //             transition: "0.2s linear",
        //             '&:hover': {
        //                 backgroundColor: "blue",
        //                 color: "white",
        //                 transition: "0.2s linear"
        //             },
        //             // '&:active': {
        //             //     backgroundColor: "white",
        //             // },

        //         }}
        //         onClick={handleSubmit}
        //     >
        //         <SendIcon />
        //     </IconButton>
        // </Box>
        <div style={{display: 'flex', alignItems:'center', justifyContent: 'center'}}>
             {/* <textarea value={text} onChange={handleTextChange} />
      <Toolbar
        onBoldClick={handleBoldClick}
        onItalicClick={handleItalicClick}
        onUnderlineClick={handleUnderlineClick}
        onButtonClick={handleSubmit}
      /> */}
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
        <IconButton style={{ marginRight: '10px' }}><MdAttachFile /></IconButton>
      </div>
      {/* <button
        style={{
          position: 'absolute',
          bottom: '100px',
          right: '10px',
        }}
      >
        Submit
      </button> */}
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