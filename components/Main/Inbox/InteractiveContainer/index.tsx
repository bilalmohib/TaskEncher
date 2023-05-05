import React, { useState, FC, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons';
import { storage } from '@app/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton
} from '@mui/material';

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';

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
    chatType: "Single" | "Project",
    onSendMessage: () => void,
    message: string,
    setMessage: any
}

const InteractiveContainer: React.FC<InteractiveContainerProps> = ({
    signedInUserData,
    currentSelectedChatUser,
    isSignedIn,
    chatType,
    onSendMessage,
    message,
    setMessage
}) => {
    const { enqueueSnackbar } = useSnackbar();

    // const messagesEndRef = useRef<HTMLDivElement>(null);

    // const scrollToBottom = () => {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    // };
    // For messages

    const handleChange = (event: any) => {
        setMessage(event.target.value);
    };

    const handleSubmit = async () => {
        if (message !== '' && currentSelectedChatUser !== "" && signedInUserData !== null) {

            // Call onSendMessage to scroll to the bottom
            onSendMessage();

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
                    isUserOnline: true,
                    type: "text"
                }

                console.log("Message Object: ", messageObject);

                // Adding chat to firestore
                addData(
                    messageObject,
                    "singleChat",
                    isSignedIn,
                    signedInUserData,
                    enqueueSnackbar
                );
            } else {
                // Get Current User's Display Name from email
                let displayNameReceiver = currentSelectedChatUser.split("@")[0];
                let receiverId = currentSelectedChatUser;

                let senderId = signedInUserData.email;
                let displayNameSender = senderId.split("@")[0];

                const messageObject = {
                    userIDSender: senderId,
                    userNameSender: displayNameSender,
                    userNameReceiver: displayNameReceiver,
                    userIDReceiver: receiverId,
                    message: message,
                    timeSent: new Date().toLocaleString(),
                    isUserOnline: true,
                    type: "text"
                }

                console.log("Project Chat Message Object: ", messageObject);

                // Adding chat to firestore
                addData(
                    messageObject,
                    "ProjectChat",
                    isSignedIn,
                    signedInUserData,
                    enqueueSnackbar
                );
            }
        } else {
            alert('Please enter a message to send it');
        }
    }
    const [file, setFile] = useState<any>(null);
    const inputFile = useRef(null)
    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
        // @ts-ignore
        const storageRef = ref(storage, `/files/${file?.name}`);

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
                    let message: string = "File Uploaded Successfully";
                    console.log(message);
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'success',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                    if (url !== '' && currentSelectedChatUser !== "" && signedInUserData !== null) {
                        if (chatType === "Single") {
                            // Get Current User's Display Name from email
                            let displayNameReceiver = currentSelectedChatUser.split("@")[0];
                            let receiverId = currentSelectedChatUser;

                            let senderId = signedInUserData.email;
                            let displayNameSender = senderId.split("@")[0];

                            const messageObject = {
                                userIDSender: senderId,
                                userNameSender: displayNameSender,
                                userIDReceiver: receiverId,
                                userNameReceiver: displayNameReceiver,
                                message: url,
                                timeSent: new Date().toLocaleString(),
                                isUserOnline: true,
                                type: "file"
                            }

                            console.log("Message Object: ", messageObject);

                            // Adding chat to firestore
                            addData(
                                messageObject,
                                "singleChat",
                                isSignedIn,
                                signedInUserData,
                                enqueueSnackbar
                            );
                        } else {
                            // Get Current User's Display Name from email
                            let displayNameReceiver = currentSelectedChatUser.split("@")[0];
                            let receiverId = currentSelectedChatUser;

                            let senderId = signedInUserData.email;
                            let displayNameSender = senderId.split("@")[0];

                            const messageObject = {
                                userIDSender: senderId,
                                userNameSender: displayNameSender,
                                userNameReceiver: displayNameReceiver,
                                userIDReceiver: receiverId,
                                message: url,
                                timeSent: new Date().toLocaleString(),
                                isUserOnline: true,
                                type: "file"
                            }

                            console.log("Project Chat Message Object: ", messageObject);

                            // Adding chat to firestore
                            addData(
                                messageObject,
                                "ProjectChat",
                                isSignedIn,
                                signedInUserData,
                                enqueueSnackbar
                            );
                        }
                    } else {
                        alert('Please upload an image to send it');
                    }
                });
            }
        );
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            if (message !== '' && currentSelectedChatUser !== "" && signedInUserData !== null) {
                handleSubmit();
            } else {
                alert('Please type a message to send it');
            }
            // Clearing the message field
            setMessage('');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <textarea
                value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                style={{
                    width: '100%',
                    marginRight: '10px',
                    height: '140px',
                    padding: '10px',
                    boxSizing: 'border-box',
                    borderRadius: '10px',
                    resize: 'none',
                    outline: 'none',
                    border: '1px solid #ccc', // Add a default border color
                    transition: 'border-color 0.3s', // Add a transition for smooth border color change
                }}
                className="form-control"
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '65px',
                    left: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}
            >
                <IconButton style={{ marginRight: '10px', marginLeft: "0px" }}><IoAddCircleOutline /></IconButton>
                <IconButton style={{ marginRight: '10px' }}><MdOutlineFormatTextdirectionLToR /></IconButton>
                <IconButton style={{ marginRight: '10px' }}><BsRecord2 /></IconButton>
                <IconButton style={{ marginRight: '10px', width: '35px', height: '35px' }}>@</IconButton>
                <IconButton style={{ marginRight: '10px' }}><CiStar /></IconButton>

                {(percent > 0 && percent < 100) ? (
                    <CircularProgressWithLabel value={percent} />
                ) : (
                    <IconButton style={{ marginRight: '10px' }}>
                        <label htmlFor="fileUpload">
                            <input
                                id="fileUpload"
                                type="file"
                                style={{
                                    width: '0px',
                                    height: '0px',
                                    display: 'none'
                                }}
                                onChange={handleFileChange}
                            />
                            <MdAttachFile />
                        </label>
                    </IconButton>
                )}
            </div>

            <Button
                onClick={handleSubmit}
                style={{
                    position: 'absolute',
                    bottom: '70px',
                    boxShadow: 'none',
                    right: '30px',
                }}
                variant="contained"
            >
                Comment
            </Button>
        </div>
    );
};

export default InteractiveContainer;