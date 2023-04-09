import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
//////////////////////////////////////////////////
import { makeStyles } from '@mui/styles';
import { useLayoutEffect } from 'react';

import styles from './Inbox.module.css';

import Router from 'next/router';

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
import { db, auth } from "../../../firebase";
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import CustomLoader from '../../CustomLoader';

import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import MessageIcon from '@mui/icons-material/Message';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CallIcon from '@mui/icons-material/Call';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import MailIcon from '@mui/icons-material/Mail';
import Fingerprint from '@mui/icons-material/Fingerprint';
import AttachmentIcon from '@mui/icons-material/Attachment';
import LinkIcon from '@mui/icons-material/Link';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import CollectionsIcon from '@mui/icons-material/Collections';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SendIcon from '@mui/icons-material/Send';
import AddBoxIcon from '@mui/icons-material/AddBox';

import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Avatar,
    Typography,
    ButtonBase,
    Checkbox,
    Stack,
    IconButton,
    Autocomplete,
    Tooltip,
    Modal
} from '@mui/material';
import { handleClientScriptLoad } from 'next/script';
import Image from 'next/image';

//Importing Containers CSS Files

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        // padding: 2,
        backgroundColor: '#f2f2f2',
        borderTop: '1px solid #ccc',
        // position: 'fixed',
        bottom: 0,
        // width: '100%',
        height: '200px',
    },
    input: {
        marginRight: 2,
        flexGrow: 1,
        height: '200px',
        color: '#000',
        // borderColor: '#fff',
        '& .MuiOutlinedInput-root': {
            height: '200px',
            '& fieldset': {
                // borderRadius: '0px',
                borderColor: '#fff',
                height: '200px',
                // backgroundColor: '#f2f2f2',
            },
            '&:hover fieldset': {
                borderColor: 'blue',
                height: '200px',
                // backgroundColor: '#f2f2f2',
            }

        },
        '& .MuiOutlinedInput-input': {
            padding: '10px 14px',
            // backgroundColor: '#fff',
            height: '200px',
            backgroundColor: '#f2f2f2',
            // borderColor: '#fff',
        }
    },
    sendButton: {
        color: "blue",
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: "blue",
            color: '#fff',
        },
    },
}));

interface AddUserModalProps {
    setIsOpen: any,
    isOpen: boolean,
    projectMembersState: any,
    isSignedIn: boolean,
    signedInUserData: any,
    usersListSingleChat: any,
}

// Global function to add data to firestore
const addData = (
    dataObject: any,
    type: string,
    isSignedIn: boolean,
    signedInUserData: any
) => {

    if (signedInUserData) {
        if (type == "singleUser") {
            addDoc(collection(db, `Data/Chat/Single/Users/${signedInUserData.email}`), dataObject)
                .then(() => {
                    console.log("Data sent");
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
                    alert("Chat Added Successfully.");
                })
                .catch(err => {
                    console.warn(err);
                    alert(`Error creating Job: ${err.message}`);
                });
        }
    }
    else {
        alert("Please sign in to save project to cloud.")
    }
}

interface MessageContainerProps {
    editedMessageId: number,
    userName: string,
    timeSent: string,
    message: string,
    id: string
}

const MessageContainer: React.FC<MessageContainerProps> = ({
    editedMessageId,
    userName,
    timeSent,
    message,
    id
}) => {
    return (
        <Box
            sx={{
                marginLeft: '5px',
            }}
        >
            <Box className="d-flex justify-content-start">
                <h3
                    className={styles.MiddleheaderTitle}
                    style={{
                        fontWeight: 'bold',
                    }}>
                    {userName}
                </h3>
                <p
                    className={styles.MiddleheaderTitle}
                    style={{
                        fontSize: '12px',
                    }}>
                    {timeSent} - {
                        (editedMessageId.toString() === id) ? (
                            <span style={{
                                color: '#000',
                                fontWeight: 'lighter',
                            }}>
                                Edited
                            </span>
                        ) : (
                            <></>
                        )
                    }
                </p>
            </Box>
            <p className={styles.Middlemessage}>
                {message}
            </p>
        </Box>
    )
}

const AddUserModal: React.FC<AddUserModalProps> = ({
    setIsOpen,
    isOpen,
    projectMembersState,
    isSignedIn,
    signedInUserData,
    usersListSingleChat
}) => {

    interface ProjectMemberOptionType {
        title: string;
    }

    let projectMembers: ProjectMemberOptionType[] = [];

    for (let i = 0; i < projectMembersState.length; i++) {
        const memberEmail = projectMembersState[i];

        // Check if the email is already in the projectMembers array
        const existingMember = projectMembers.find(member => member.title === memberEmail);

        // If the email is not already in the array, add it
        if (!existingMember) {
            projectMembers.push({ title: memberEmail });
        }
    }

    const defaultProps = {
        options: projectMembers,
        getOptionLabel: (option: ProjectMemberOptionType) => option.title,
    };

    const [value, setValue] = React.useState<ProjectMemberOptionType | null>(null);

    useEffect(() => {
        if (value) {
            console.log("The selected email : ", value.title);
        }
    }, [value])

    const handleStartNewChat = () => {
        console.log("Start New Chat");
        // alert("value" + " " + value?.title);
        setIsOpen(false);

        // Extract user name from email
        let name = value?.title.split("@")[0];

        const chatUser = {
            uid: value?.title,
            email: value?.title,
            name: name,
            lastMessage: '',
            lastMessageTime: new Date().toLocaleTimeString(),
            profilePic: "/static/images/avatar/1.jpg",
            isOnline: true
        }

        console.log("UsersListSingleChat ===> ", usersListSingleChat);

        // Check if user already exists in the database by checking the value in the 
        // projectMembersState array
        let userExists = false;
        for (let i = 0; i < usersListSingleChat.length; i++) {
            if (usersListSingleChat[i]?.email == value?.title) {
                userExists = true;
                break;
            }
        }

        if (userExists) {
            // Show the alert that user already exists
            alert("User already exists");
            return;
        } else {
            // Add user to the chat list
            addData(
                chatUser,
                "singleUser",
                isSignedIn,
                signedInUserData,
            );
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: "50%",
                bgcolor: 'background.paper',
                // border: '2px solid #000',
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                p: 4,
                borderRadius: '10px',
            }}>
                <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h4"
                >
                    Start New Chat
                </Typography>
                <Typography id="modal-modal-title-start-chat" variant="h6" component="h6" sx={{ fontSize: "14px", fontWeight: "lighter" }}>
                    Please select the email address of the person you want to chat with.
                </Typography>
                <Autocomplete
                    {...defaultProps}
                    id="SelectUserToChat"
                    value={value}
                    autoHighlight
                    onChange={(event: any, newValue: ProjectMemberOptionType | null) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Email Id" placeholder='Select the user from the list to chat with them' variant="standard" />
                    )}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Button variant="outlined" color="error" fullWidth onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="info" fullWidth sx={{ ml: 2 }} onClick={handleStartNewChat}>Start Chat</Button>
                </Box>
            </Box>
        </Modal>
    )
}

interface InteractiveContainerProps {
    currentSelectedChatUser: string;
    signedInUserData: any;
    isSignedIn: boolean;
}

const InteractiveContainer: React.FC<InteractiveContainerProps> = ({
    signedInUserData,
    currentSelectedChatUser,
    isSignedIn
}) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');

    const handleChange = (event: any) => {
        setMessage(event.target.value);
    };

    // const handleSubmit = () => {
    //     if(message === ""){
    //         alert("Please enter a message to send");
    //         return;
    //     }

    //     // Perform action to send message
    //     console.log('Message:', message);
    //     alert('Message sent!' + message);

    //     console.log("Send Message");

    //     // const chatMessage = {
    //     //     id: 1,
    //     //     name: 'Talha Pervaiz',
    //     //     message: 'Hello, how are you?',
    //     //     time: '2 Feb 2021',
    //     //     image: '/static/images/avatar/1.jpg'
    //     // }
    //     // // setMessage('');

    //     // console.log("Start New Chat");
    //     // alert("value" + " " + value?.title);
    //     // setIsOpen(false);

    //     // const chatMessage = {
    //     //     id: signedInUserData.uid,
    //     //     email: value?.title,
    //     //     name: name,
    //     //     lastMessage: '',
    //     //     lastMessageTime: new Date().toLocaleTimeString(),
    //     //     profilePic: "/static/images/avatar/1.jpg",
    //     //     isOnline: true
    //     // }

    //     // addData(chatMessage, "singleChat");
    // };
    const handleSubmit = async () => {
        // userIDSender: this.userIDSender,
        // userNameSender: this.userNameSender,
        // userIDReceiver: this.userIDReceiver,
        // userNameReceiver: this.userNameReceiver,
        // message:this.message,
        // timeSent:this.timeSent,
        // isUserOnline:this.isUserOnline

        if (message !== '' && currentSelectedChatUser !== "" && signedInUserData !== null) {
            // const response = await fetch('http://localhost:8000/chat', {
            //     method: "POST",
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         userIDSender: JSON.parse(localStorage.getItem('loggedInUserData')).id,
            //         userNameSender: JSON.parse(localStorage.getItem('loggedInUserData')).name,
            //         userIDReceiver: currentSelectedUser.id,
            //         userNameReceiver: currentSelectedUser.name,
            //         message: message,
            //         timeSent: new Date().toLocaleString(),
            //         isUserOnline: true
            //     })
            // }).catch((error) => {
            //     alert("Error Sending the message : " + error);
            //     console.log("Error Sending the message: ", error);
            // })

            // // Fetch the one list data from the API after the POST request
            // const messaging = await response.json();

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
                signedInUserData,
            );

        } else {
            alert('Please enter a message to send it');
        }
    }

    return (
        <Box className={classes.container}>
            <TextField
                className={classes.input}
                label="Type your message here..."
                value={message}
                onChange={handleChange}
                variant="outlined"
                multiline
                fullWidth
                rows={7}
            />
            <IconButton
                className={classes.sendButton}
                onClick={handleSubmit}
            >
                <SendIcon />
            </IconButton>
        </Box>
    );
};

interface InboxProps {
    email: string;
}

const Inbox: React.FC<InboxProps> = ({
    email
}) => {

    const [showSearch, setShowSearch] = useState<boolean>(false);

    // Profile Section
    const [showProfileSearch, setShowProfileSearch] = useState<boolean>(false);
    // Profile Tab
    const [currentProfileTab, setCurrentProfileTab] = useState<number>(0);

    // For Middle Container
    const [middleShowSearch, setMiddleShowSearch] = useState<boolean>(false);

    // For Tabs
    const [currentTab, setCurrentTab] = useState<number>(0);

    // For Profile Info Show Hide
    const [showProfileInfo, setShowProfileInfo] = useState<boolean>(false);

    // For Modal
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // ________________________ For Login ________________________ //
    const router = useRouter();

    // Current Selected Chat 
    const [currentSelectedChatUser, setCurrentSelectedChatUser] = useState<string>("");

    // signed in user data
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    // States for status of login users
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [Loading, setloading] = useState(true);

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const [editedMessageId, setEditedMessageId] = useState<number>(0);

    const goToLastMessage = () => {
        // console.log("signedInUserData ==>", signedInUserData);
        // Get the message container element
        // alert("goToLastMessage");
        const messageContainer = document.getElementById("messageContainer");

        // Scroll to bottom of the message container
        if (messageContainer) {
            // Get the last message element
            const lastMessage = messageContainer.lastElementChild;

            // Scroll to the last message
            // @ts-ignore
            lastMessage.scrollIntoView({ behavior: 'smooth' });
        }
    }

    useLayoutEffect(() => {
        if (!Loading) {
            goToLastMessage();
        }
    }, []);

    useEffect(() => {
        // console.log("Current Path : ", window.location.pathname);
        // console.log("activeJobs ==>", activeJobs);
        // goToLastMessage();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                if (signedInUserData === null) {
                    if (user.isAnonymous === true) {
                        let tempUser = {
                            displayName: "Anonymous",
                            email: `anonymous${user.uid}@guest.com`,
                            photoURL: user.photoURL,
                        }
                        console.log(tempUser);
                        setSignedInUserData(tempUser);
                        setIsSignedIn(true);
                    } else {
                        console.log(user);
                        setSignedInUserData(user);
                        setIsSignedIn(true);
                    }
                    // ...
                    setloading(false);
                }
                // if (!Loading) {
                //}
            } else {
                // User is signed out
                console.log("User is signed out");
                // alert("Please sign in to continue");
                // navigate("/login");
                // ...
            }
        });
    }, [signedInUserData, Loading]);

    const formatDate = (date: any) => {
        const today: any = new Date();
        const messageDate: any = new Date(date);
        const diffInDays = Math.floor((today - messageDate) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) {
            return 'Today';
        } else if (diffInDays === 1) {
            return 'Yesterday';
        } else {
            return messageDate.toLocaleDateString();
        }
    };

    let lastMessageDate: any = null;

    ////////////////////////////////////// FOR GETTING PROJECTS DATA //////////////////////////////////////
    // console.log("Email ==> ", email.toString());
    // "Jobs", `${uid}`, "data")
    // const e = email;
    const e = email;

    // FOR GETTING PROJECTS
    let q = query(collection(db, "Data", "Projects", `${e}`));

    const [snapshot, loading, error] = useCollection(
        q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    // For getting the UsersListSingleChat
    const [usersListSingleChat, setUsersListSingleChat] = useState<any>([]);

    // Data/Chat/Single/Users${dataObject.email}

    let q1 = query(collection(db, "Data", "Chat", "Single", "Users", e));

    const [snapshot1, loading1, error1] = useCollection(
        q1,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    //For getting the chatListSingleChat
    const [chatListSingleChat, setChatListSingleChat] = useState<any>([]);

    let q2 = query(collection(db, "Chat", "Single", "Chat"));

    const [snapshot2, loading2, error2] = useCollection(
        q2,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    // GETTINGS Active Jobs
    const [projects, setProjects] = useState<any>([]);
    const [projectMembersState, setProjectMembersState] = useState<any>([]);
    // const [loading, setLoading] = useState(true); 

    // FOR GETTING PROJECTS
    useEffect(() => {

        if (!loading) {
            let projectMembers = [];
            let tempProjectsObj: any = snapshot?.docs.map((doc, i) => ({ ...doc.data(), id: doc.id }));

            setProjects(tempProjectsObj);

            // Create a new array containing projectmembers of each project object
            if (tempProjectsObj !== undefined) {
                for (let i = 0; i < tempProjectsObj.length; i++) {
                    projectMembers.push(tempProjectsObj[i].ProjectMembers);
                    //console.log("Project Members ==> ", tempProjectsObj[i].ProjectMembers);
                }
            }

            // Set the projectMembersState
            setProjectMembersState(projectMembers.flat(1));

            // setLoading(false);
            // console.clear();
            console.log("Project Members ==> ", projectMembersState);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, snapshot]);
    // FOR GETTING PROJECTS

    // FOR GETTING USERSLISTSINGLECHAT
    useEffect(() => {

        if (!loading1) {
            let usersListSingle: any = snapshot1?.docs.map((doc, i) => ({ ...doc.data(), id: doc.id }));

            // Set the UsersListSingleChat
            setUsersListSingleChat(usersListSingle);

            console.log("Users List Single Chat ==> ", usersListSingle);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading1, snapshot1]);
    // FOR GETTING USERSLISTSINGLECHAT

    // FOR GETTING CHATLISTSINGLECHAT
    useEffect(() => {
        if (!loading2) {
            let chatListSingle: any = snapshot2?.docs.map((doc, i) => ({ ...doc.data(), id: doc.id }));

            // Set the UsersListSingleChat
            setChatListSingleChat(chatListSingle);

            console.log("Chat List Single Chat ==> ", chatListSingle);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading2, snapshot2]);
    // FOR GETTING CHATLISTSINGLECHAT
    ////////////////////////////////////// FOR GETTING PROJECTS DATA //////////////////////////////////////

    return (
        <div>
            {/* Home Page */}
            {Loading ? (
                <CustomLoader />
            ) : (
                <section className={styles.container}>
                    <AddUserModal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        projectMembersState={projectMembersState}
                        isSignedIn={isSignedIn}
                        signedInUserData={signedInUserData}
                        usersListSingleChat={usersListSingleChat}
                    />
                    <Box className={styles.leftContainer}>
                        <Box className={styles.HeaderContainer}>
                            <Box
                                className='d-flex justify-content-between'
                                sx={{
                                    padding: '18px',
                                }}
                            >
                                <Box
                                    className="d-flex justify-content-between"
                                    sx={{
                                        // border: "1px solid red",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: '80%',
                                    }}
                                >
                                    {(!showSearch) && (
                                        <Tooltip title="Start New Chat">
                                            <IconButton color="inherit"
                                                onClick={() => setIsOpen(true)}
                                            >
                                                <AddBoxIcon
                                                    sx={{
                                                        fontSize: '30px',
                                                    }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    <Box
                                        className="d-flex justify-content-between"
                                        sx={{
                                            // padding: '18px',
                                            width: '100%',
                                        }}
                                    >
                                        {(showSearch) ? (
                                            <Box
                                                title="search"
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    id="standard-basic"
                                                    label="Search"
                                                    variant="standard"
                                                    placeholder='Search Contacts'
                                                />
                                            </Box>
                                        ) : (
                                            <Box
                                                title="search"
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'left',
                                                    justifyContent: 'left',
                                                    paddingTop: '5px',
                                                    paddingLeft: '10px',
                                                }}
                                            >
                                                <h3 className={styles.headerTitle}>General Inbox</h3>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                                <Box
                                    role={"button"}
                                    title="search"
                                    sx={{
                                        paddingTop: (!showSearch) ? '5px' : '10px',
                                    }}
                                >
                                    {(showSearch) ? (
                                        <SearchOffIcon
                                            onClick={() => setShowSearch(!showSearch)}
                                            sx={{
                                                color: '#000',
                                                fontSize: '30px',
                                            }}
                                        />
                                    ) : (
                                        <SearchIcon
                                            onClick={() => setShowSearch(true)}
                                            sx={{
                                                color: '#000',
                                                fontSize: '30px',
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>
                            <Box className='d-flex justify-content-between'
                                sx={{
                                    borderBottom: '1px solid #000',
                                    borderTop: '1px solid #000',
                                    ml: '0px',
                                }}
                            >
                                {/* Display Three tabs here */}
                                <Button variant='contained'
                                    className={styles.tabButton}
                                    sx={{
                                        border: "none",
                                        borderBottom: (currentTab === 0) ? '1px solid #000' : '1px solid #fff',
                                        boxShadow: 'none',
                                        backgroundColor: (currentTab === 0) ? '#000' : '#fff',
                                        color: (currentTab === 0) ? '#fff' : '#000',
                                        '&:hover': {
                                            backgroundColor: (currentTab === 0) ? '#000' : '#fff',
                                            color: (currentTab === 0) ? '#fff' : '#000',
                                        }
                                    }}
                                    onClick={() => setCurrentTab(0)}
                                    startIcon={<MessageIcon />}
                                >
                                    1-1 Messages
                                </Button>
                                <Button variant='contained'
                                    className={styles.tabButton}
                                    sx={{
                                        border: "none",
                                        borderBottom: (currentTab === 1) ? '1px solid #000' : '1px solid #fff',
                                        boxShadow: 'none',
                                        backgroundColor: (currentTab === 1) ? '#000' : '#fff',
                                        color: (currentTab === 1) ? '#fff' : '#000',
                                        '&:hover': {
                                            backgroundColor: (currentTab === 1) ? '#000' : '#fff',
                                            color: (currentTab === 1) ? '#fff' : '#000',
                                        }
                                    }}
                                    onClick={() => setCurrentTab(1)}
                                    startIcon={<TaskAltIcon />}
                                >
                                    Tasks
                                </Button>
                            </Box>
                        </Box>
                        <Box>
                            {(
                                currentTab === 0
                            )
                                ? (
                                    <Box
                                        sx={{
                                            // paddingTop: '20px',
                                            // border: "1px solid red",
                                            height: '80.7vh',
                                            overflowY: 'scroll',
                                            backgroundColor: '#fff',
                                        }}
                                    >
                                        {
                                            (usersListSingleChat.length === 0) ? (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        height: '80vh',
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: '20px',
                                                            fontWeight: '600',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        No Messages
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                usersListSingleChat.map((item: any, index: number) => {
                                                    return (
                                                        <ButtonBase
                                                            key={index}
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                padding: '10px 20px',
                                                                backgroundColor: '#fff',
                                                                cursor: 'pointer',
                                                                borderRadius: '0px',
                                                                width: '100%',
                                                                height: '100px',
                                                                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                                                                '&:hover': {
                                                                    backgroundColor: '#000',
                                                                    color: '#fff',
                                                                    borderTop: "1px solid #fff"
                                                                },
                                                            }}
                                                            onClick={() => {
                                                                setCurrentSelectedChatUser(
                                                                    item.email
                                                                );
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        position: 'relative',
                                                                    }}
                                                                >
                                                                    <Avatar
                                                                        sx={{
                                                                            width: '50px',
                                                                            height: '50px',
                                                                        }}
                                                                        alt="Remy Sharp"
                                                                        src={item.profilePic}
                                                                    />
                                                                    {item.onlineStatus === 'online' && (
                                                                        <Box
                                                                            sx={{
                                                                                position: 'absolute',
                                                                                bottom: 2,
                                                                                right: 2,
                                                                                width: '10px',
                                                                                height: '10px',
                                                                                borderRadius: '50%',
                                                                                backgroundColor: 'green',
                                                                            }}
                                                                        />
                                                                    )}
                                                                    {item.onlineStatus === 'offline' && (
                                                                        <Box
                                                                            sx={{
                                                                                position: 'absolute',
                                                                                bottom: 2,
                                                                                right: 2,
                                                                                width: '10px',
                                                                                height: '10px',
                                                                                borderRadius: '50%',
                                                                                backgroundColor: 'gray',
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Box>
                                                                <Box
                                                                    sx={{
                                                                        marginLeft: '10px',
                                                                        alignItems: 'left',
                                                                        display: 'flex',
                                                                        flexDirection: 'column',
                                                                        justifyContent: 'flex-start',
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: '16px',
                                                                            fontWeight: '600',
                                                                            textAlign: 'left',
                                                                        }}
                                                                    >
                                                                        {item.name}
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: '14px',
                                                                            fontWeight: '400',
                                                                            // Stop the over flow of text
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                            whiteSpace: 'nowrap',
                                                                            textAlign: 'left',
                                                                            width: '250px',
                                                                            // border:"2px solid red"
                                                                        }}
                                                                    >
                                                                        {item.lastMessage}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '14px',
                                                                        fontWeight: '400',
                                                                    }}
                                                                >
                                                                    {item.lastMessageTime}
                                                                </Typography>
                                                            </Box>
                                                        </ButtonBase>

                                                    )
                                                })
                                            )
                                        }
                                    </Box>
                                )
                                : (
                                    <Box
                                        sx={{
                                            padding: '20px',
                                            height: '80.7vh',
                                            // border:"20px solid red",
                                            overflowY: 'auto',
                                        }}
                                    >
                                        {
                                            [
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                                {
                                                    taskName: 'Task 1',
                                                    taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                                                    taskStatus: 'In Progress',
                                                    taskStatusColor: '#FFC107',
                                                    taskDueDate: '10/10/2021',
                                                    taskDueTime: '10:00 AM',
                                                    taskPriority: 'High',
                                                    taskPriorityColor: '#FF5722',
                                                },
                                            ].map((item, index) => {
                                                return (
                                                    <ButtonBase
                                                        key={index}
                                                        sx={{
                                                            display: 'flex',
                                                            width: '100%',
                                                            // border: "1px solid red",
                                                            borderRadius: '5px',
                                                            padding: '5px',
                                                            marginBottom: '10px',
                                                            '&:hover': {
                                                                backgroundColor: '#F5F5F5',
                                                            }
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                // border: "1px solid blue"
                                                            }}
                                                        >
                                                            <Box>
                                                                <Checkbox
                                                                    checked={checked}
                                                                    onChange={handleChange}
                                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                                />
                                                            </Box>
                                                            <Box
                                                                sx={{
                                                                    marginLeft: '0px',
                                                                    display: 'flex',
                                                                }}
                                                            >
                                                                <Avatar
                                                                    sx={{
                                                                        width: '40px',
                                                                        height: '40px',
                                                                    }}
                                                                    alt="Remy Sharp"
                                                                    src="/static/images/avatar/1.jpg"
                                                                />
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: '16px',
                                                                        fontWeight: '400',
                                                                        // border: "1px solid red",
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        marginLeft: "10px"
                                                                    }}
                                                                >
                                                                    Manage Tasks
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                marginLeft: 'auto',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontSize: '15px',
                                                                    fontWeight: '400',
                                                                    // border: "1px solid red"
                                                                }}
                                                            >
                                                                {
                                                                    // Displaying the date in the format of 10th of January, 2021
                                                                    new Date().toLocaleDateString('en-US', {
                                                                        day: 'numeric',
                                                                        month: 'long',
                                                                        year: 'numeric'
                                                                    })
                                                                }
                                                            </Typography>

                                                            <Box
                                                                sx={{
                                                                    marginLeft: '10px',
                                                                }}
                                                            >
                                                                <CalendarMonthIcon
                                                                    sx={{
                                                                        color: '#000',
                                                                        fontSize: '30px',
                                                                    }}
                                                                />
                                                            </Box>
                                                        </Box>
                                                    </ButtonBase>
                                                )
                                            })
                                        }
                                    </Box>
                                )
                            }
                        </Box>
                    </Box>
                    {/* {(currentSelectedChatUser !== "") ? ( */}
                    {/* // <Box sx={{ display: "flex", flexDirection: "row",width:"100%",border:"10px solid blue" }}> */}
                    {(currentSelectedChatUser !== "") ?
                        (
                            <Box
                                className={styles.middleContainer}
                                sx={{
                                    width: (showProfileInfo) ? '40%' : '70%',
                                    // border: "5px solid red",
                                    transition: '0.3s linear',
                                }}
                            >
                                <Box className={styles.MiddleHeaderContainer}>
                                    <Box
                                        className='d-flex justify-content-between'
                                        sx={{
                                            padding: '20px',
                                        }}
                                    >
                                        {(middleShowSearch) ? (
                                            <Box
                                                title="search"
                                                sx={{
                                                    width: '70%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: '20px',
                                                }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    id="standard-basic"
                                                    label="Search"
                                                    variant="standard"
                                                    placeholder='Search Messages'
                                                />
                                            </Box>
                                        ) : (
                                            <Box
                                                title="search"
                                                sx={{
                                                    width: '100%',
                                                    display: 'flex',
                                                    alignItems: 'left',
                                                    justifyContent: 'left',
                                                }}
                                            >
                                                <div className={styles.middleHeaderInsideContainer}>
                                                    <div className={styles.leftmhic}>
                                                        <Avatar
                                                            sx={{
                                                                width: '35px',
                                                                height: '35px',
                                                            }}
                                                            alt="Remy Sharp"
                                                            src="/static/images/avatar/1.jpg"
                                                        />
                                                        <h3 className={styles.MiddleheaderTitle}>Conversation with <b style={{ fontWeight: "bold" }}>{currentSelectedChatUser}</b></h3>
                                                    </div>
                                                    <div className={styles.rightmhic}>

                                                    </div>
                                                </div>
                                            </Box>
                                        )}
                                        <Box
                                            role={"button"}
                                            title="search"
                                            sx={{
                                                width: '30%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                // border: '1px solid #000',
                                            }}
                                        >
                                            {(middleShowSearch) ? (
                                                <SearchOffIcon
                                                    onClick={() => setMiddleShowSearch(!middleShowSearch)}
                                                    sx={{
                                                        color: '#000',
                                                        fontSize: '30px',
                                                    }}
                                                />
                                            ) : (
                                                <SearchIcon
                                                    onClick={() => setMiddleShowSearch(true)}
                                                    sx={{
                                                        color: '#000',
                                                        fontSize: '30px',
                                                    }}
                                                />
                                            )}
                                            <ButtonBase
                                                sx={{
                                                    marginLeft: '10px'
                                                }}
                                            >
                                                <CallIcon
                                                    sx={{
                                                        color: '#4275f6',
                                                        fontSize: '30px'
                                                    }}
                                                />
                                            </ButtonBase>
                                            <ButtonBase
                                                sx={{
                                                    marginLeft: '10px',
                                                    borderRadius: "50%"
                                                }}
                                                onClick={() => setShowProfileInfo(!showProfileInfo)}
                                            >
                                                <InfoIcon
                                                    sx={{
                                                        color: '#000',
                                                        fontSize: '30px'
                                                    }}
                                                />
                                            </ButtonBase>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box
                                    id="messageContainer"
                                    // onMouseOver={() => goToLastMessage()}
                                    className={styles.MiddleBodyContainer}
                                >
                                    {
                                        chatListSingleChat.map((item: any, index: number) => {
                                            const messageDate = formatDate(item.timeSent);
                                            const showDate = messageDate !== lastMessageDate;
                                            lastMessageDate = messageDate;

                                            return (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        width: '100%'
                                                    }}
                                                >
                                                    {showDate && (
                                                        <Box sx={{
                                                            display: "flex",
                                                            width: "100%",
                                                            // border:"5px solid blue"
                                                            marginBottom: '30px',
                                                            // border: "5px solid green"
                                                        }}>
                                                            <Box sx={{
                                                                borderBottom: "1px solid black",
                                                                width: "45%",
                                                            }}>
                                                            </Box>
                                                            <Typography sx={{
                                                                width: "10%",
                                                                textAlign: "center",
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                            }}
                                                            >
                                                                {/* Categorize by date */}
                                                                {/* For example if the message is delivered today say today otherwise say the date, if day before say yesterday */}
                                                                {/* Also please dont repeat the date if the message is from the same day */}

                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    width: '100px',
                                                                    height: '50px',
                                                                    backgroundColor: '#000',
                                                                    color: '#fff',
                                                                    borderRadius: '10px',
                                                                    marginTop: '10px',
                                                                    marginBottom: '-25px',
                                                                    padding: '10px',
                                                                }}
                                                                >
                                                                    {messageDate}
                                                                </Box>

                                                            </Typography>
                                                            <Box
                                                                sx={{
                                                                    borderBottom: "1px solid black",
                                                                    width: "45%"
                                                                }}>
                                                            </Box>
                                                        </Box>
                                                    )}
                                                    <Box
                                                        className={styles.middleBodyInsideContainer}
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            padding: '10px',
                                                            paddingLeft: '20px',
                                                            width: '60%',
                                                            // border: '10px solid #000',
                                                        }}
                                                    >
                                                        <Box>
                                                            {(
                                                                // item.userIDSender === signedInUserData.uid
                                                                item.userIDSender === signedInUserData.email
                                                                &&
                                                                item.userIDReceiver === currentSelectedChatUser
                                                            ) && (
                                                                    <Box
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'left',
                                                                            justifyContent: 'flex-start',
                                                                            width: '100%',
                                                                            // border: '1px solid #000',
                                                                            marginTop: '0px',
                                                                            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                                                                        }}
                                                                    >
                                                                        <MessageContainer
                                                                            editedMessageId={editedMessageId}
                                                                            userName={item.userNameSender}
                                                                            timeSent={item.timeSent}
                                                                            message={item.message}
                                                                            id={item.id}
                                                                        />
                                                                    </Box>
                                                                )}

                                                            {(
                                                                // item.userIDReceiver === signedInUserData.uid
                                                                item.userIDReceiver === signedInUserData.email
                                                                &&
                                                                item.userIDSender === currentSelectedChatUser
                                                            ) && (
                                                                    <Box
                                                                        sx={{
                                                                            display: 'flex',
                                                                            alignItems: 'left',
                                                                            justifyContent: 'flex-end',
                                                                            width: '100%',
                                                                            // border: '1px solid red',
                                                                            marginTop: '20px',
                                                                            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                                                            padding: "10px"
                                                                        }}
                                                                    >
                                                                        <MessageContainer
                                                                            editedMessageId={editedMessageId}
                                                                            userName={item.userNameSender}
                                                                            timeSent={item.timeSent}
                                                                            message={item.message}
                                                                            id={item.id}
                                                                        />
                                                                    </Box>
                                                                )}
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            )
                                        })}
                                </Box>
                                <Box className={styles.MiddleFooterContainer}
                                    sx={{
                                        width: (showProfileInfo) ? '34.3%' : '60%',
                                    }}
                                >
                                    <InteractiveContainer
                                        signedInUserData={signedInUserData}
                                        currentSelectedChatUser={currentSelectedChatUser}
                                        isSignedIn={isSignedIn}
                                    />
                                </Box>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    justifyContent: 'center', border: '1px solid #000',
                                    backgroundColor: '#fff',
                                    color: '#000000',
                                    cursor: 'revert',
                                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                                    width: '100%',
                                    transition: '0.1s linear',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        textAlign: 'center'
                                    }}
                                >
                                    <Image
                                        src="/images/chat.png"
                                        alt="Picture of the author"
                                        width={80}
                                        height={80}
                                    />
                                </Box>
                                <br />
                                <Typography
                                    sx={{
                                        fontSize: '20px',
                                    }}
                                >
                                    Please Select any User to start chat
                                </Typography>
                            </Box>
                        )
                    }

                    <Box className={styles.rightContainer}
                        sx={{
                            display: (showProfileInfo) ? 'block' : 'none',
                            transition: '0.3s linear',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                width: '100%',
                            }}
                        >
                            <ButtonBase
                                sx={{
                                    borderRadius: '50%'
                                }}
                                onClick={() => setShowProfileInfo(!showProfileInfo)}
                            >
                                <CancelIcon
                                    sx={{
                                        color: '#000',
                                        fontSize: '30px',
                                    }}
                                />
                            </ButtonBase>
                        </Box>
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: '80px',
                                        height: '80px',
                                    }}
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                />
                                <Typography
                                    sx={{
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        marginTop: '10px',
                                    }}
                                >
                                    Talha Pervaiz
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        marginTop: '5px',
                                    }}
                                >
                                    (809) 836 312 73
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    width: '100%',
                                    height: '100%',
                                    // border: "1px solid red",
                                    marginTop: '20px',
                                }}
                            >
                                <ButtonBase
                                    sx={{
                                        height: 'fit-content',
                                    }}
                                >
                                    <MailIcon
                                        sx={{
                                            color: 'red',
                                            fontSize: '30px'
                                        }}
                                    />
                                </ButtonBase>
                                <ButtonBase
                                // sx={{
                                //     borderRadius: '50%',
                                // }}
                                >
                                    <CallIcon
                                        sx={{
                                            color: '#4275f6',
                                            fontSize: '30px'
                                        }}
                                    />
                                </ButtonBase>
                                <ButtonBase
                                    sx={{
                                        borderRadius: '50%',
                                    }}
                                >
                                    <TaskAltIcon
                                        sx={{
                                            color: '#000',
                                            fontSize: '30px'
                                        }}
                                    />
                                </ButtonBase>
                                <ButtonBase
                                    sx={{
                                        borderRadius: '50%',
                                    }}
                                >
                                    <VideoCallIcon
                                        sx={{
                                            color: '#000',
                                            fontSize: '30px'
                                        }}
                                    />
                                </ButtonBase>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                // border: "1px solid red",
                                height: "50px",
                                width: "100%",
                                marginTop: "20px",
                                display: "flex",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <IconButton
                                title="File Attachements"
                                sx={{
                                    width: "50px",
                                    height: "50px",
                                    // border: "1px solid #000",
                                    backgroundColor: (currentProfileTab === 0) ? "#000" : "#fff",
                                    color: (currentProfileTab === 0) ? "#fff" : "#000",
                                    borderRadius: "3px",
                                    '&:hover': {
                                        backgroundColor: "#000",
                                        color: "#fff",
                                    },
                                }}
                                aria-label="File Attachements"
                                onClick={() => setCurrentProfileTab(0)}
                            >
                                <FilePresentIcon />
                            </IconButton>
                            <IconButton
                                title="Links"
                                aria-label="Links"
                                sx={{
                                    borderRadius: "3px",
                                    width: "50px",
                                    height: "50px",
                                    // border: "1px solid #000",
                                    backgroundColor: (currentProfileTab === 1) ? "#000" : "#fff",
                                    color: (currentProfileTab === 1) ? "#fff" : "#000",
                                    '&:hover': {
                                        backgroundColor: "#000",
                                        color: "#fff",
                                    },
                                }}
                                onClick={() => setCurrentProfileTab(1)}
                            >
                                <LinkIcon />
                            </IconButton>
                            <IconButton
                                title="Tasks"
                                aria-label="fingerprint"
                                sx={{
                                    borderRadius: "3px",
                                    width: "50px",
                                    height: "50px",
                                    // border: "1px solid #000",
                                    backgroundColor: (currentProfileTab === 2) ? "#000" : "#fff",
                                    color: (currentProfileTab === 2) ? "#fff" : "#000",
                                    '&:hover': {
                                        backgroundColor: "#000",
                                        color: "#fff",
                                    },
                                }}
                                onClick={() => setCurrentProfileTab(2)}
                            >
                                <TaskAltIcon />
                            </IconButton>
                            <IconButton
                                title="Images List"
                                aria-label="Images List"
                                sx={{
                                    borderRadius: "3px",
                                    width: "50px",
                                    height: "50px",
                                    // border: "1px solid #000",
                                    backgroundColor: (currentProfileTab === 3) ? "#000" : "#fff",
                                    color: (currentProfileTab === 3) ? "#fff" : "#000",
                                    '&:hover': {
                                        backgroundColor: "#000",
                                        color: "#fff",
                                    },
                                }}
                                onClick={() => setCurrentProfileTab(3)}
                            >
                                <CollectionsIcon />
                            </IconButton>
                            <IconButton
                                title="Video Library"
                                aria-label="Video Library"
                                sx={{
                                    borderRadius: "3px",
                                    width: "50px",
                                    height: "50px",
                                    // border: "1px solid #000",
                                    backgroundColor: (currentProfileTab === 4) ? "#000" : "#fff",
                                    color: (currentProfileTab === 4) ? "#fff" : "#000",
                                    '&:hover': {
                                        backgroundColor: "#000",
                                        color: "#fff",
                                    },
                                }}
                                onClick={() => setCurrentProfileTab(4)}
                            >
                                <VideoLibraryIcon />
                            </IconButton>
                        </Box>
                        <Box
                            className='d-flex justify-content-between'
                            sx={{
                                padding: '20px',
                                marginTop: '20px',
                                // border: "1px solid red",
                            }}
                        >
                            {(showProfileSearch) ? (
                                <Box
                                    title="search"
                                    sx={{
                                        width: '80%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        id="standard-basic"
                                        label="Search"
                                        variant="standard"
                                        placeholder={(
                                            (currentProfileTab === 0) ?
                                                'Search File Attachements' :
                                                (currentProfileTab === 1) ?
                                                    'Search Links' :
                                                    (currentProfileTab === 2) ?
                                                        'Search Tasks' :
                                                        (currentProfileTab === 3) ?
                                                            'Search Images List' :
                                                            (currentProfileTab === 4) ?
                                                                'Search Video Library' :
                                                                ''
                                        )}
                                    />
                                </Box>
                            ) : (
                                <Box
                                    title="search"
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'left',
                                        justifyContent: 'left',
                                    }}
                                >
                                    <h3 className={styles.headerTitle}>
                                        {(currentProfileTab === 0) ?
                                            'File Attachements' :
                                            (currentProfileTab === 1) ?
                                                'Links' :
                                                (currentProfileTab === 2) ?
                                                    'Tasks' :
                                                    (currentProfileTab === 3) ?
                                                        'Images List' :
                                                        (currentProfileTab === 4) ?
                                                            'Video Library' :
                                                            ''
                                        }
                                    </h3>
                                </Box>
                            )}
                            <Box
                                role={"button"}
                                title="search"
                                sx={{
                                    paddingTop: (!showProfileSearch) ? '0px' : '10px',
                                }}
                            >
                                {(showProfileSearch) ? (
                                    <SearchOffIcon
                                        onClick={() => setShowProfileSearch(!showProfileSearch)}
                                        sx={{
                                            color: '#000',
                                            fontSize: '30px',
                                        }}
                                    />
                                ) : (
                                    <SearchIcon
                                        onClick={() => setShowProfileSearch(true)}
                                        sx={{
                                            color: '#000',
                                            fontSize: '30px',
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                padding: '20px',
                                marginTop: '20px',
                                // border: "1px solid orange",
                            }}
                        >
                            <Autocomplete
                                disablePortal
                                id="profileItemSearch"
                                options={top100Films}
                                autoHighlight
                                fullWidth
                                // sx={{ width: "100%" }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    label={
                                        (currentProfileTab === 0) ?
                                            'File Attachements' :
                                            (currentProfileTab === 1) ?
                                                'Links' :
                                                (currentProfileTab === 2) ?
                                                    'Tasks' :
                                                    (currentProfileTab === 3) ?
                                                        'Images List' :
                                                        (currentProfileTab === 4) ?
                                                            'Video Library' :
                                                            ''
                                    }
                                    variant="outlined"
                                    placeholder={
                                        (currentProfileTab === 0) ?
                                            'Search File Attachements' :
                                            (currentProfileTab === 1) ?
                                                'Search Links' :
                                                (currentProfileTab === 2) ?
                                                    'Search Tasks' :
                                                    (currentProfileTab === 3) ?
                                                        'Search Images List' :
                                                        (currentProfileTab === 4) ?
                                                            'Search Video Library' :
                                                            ''
                                    }
                                />
                                }
                            />
                        </Box>
                        <Box
                            sx={{
                                // paddingTop: '20px',
                                // marginTop: '20px',
                                // border: "1px solid red",
                                height: '40vh',
                                overflowY: 'scroll',
                                backgroundColor: '#fff',
                            }}
                        >
                            {[
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                                {
                                    name: 'Docx1.pdf',
                                    isOnline: true,
                                    lastMessage: '12.25.10',
                                    lastMessageTime: '10:00 AM',
                                    profilePic: '/static/images/avatar/1.jpg',
                                },
                            ].map((item, index) => {
                                return (
                                    <ButtonBase
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            // alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '10px 20px',
                                            // border: '1px solid #000',
                                            backgroundColor: '#fff',
                                            cursor: 'pointer',
                                            // marginBottom: '10px',
                                            borderRadius: '0px',
                                            width: '100%',
                                            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                                            '&:hover': {
                                                backgroundColor: '#000',
                                                color: '#fff',
                                                border: '1px solid #fff',
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <PictureAsPdfIcon
                                                sx={{
                                                    fontSize: '40px',
                                                    // color: '#000',
                                                    marginRight: '10px',
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    marginLeft: '10px',
                                                    alignItems: 'left',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-start'
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: '16px',
                                                        fontWeight: '600',
                                                        textAlign: 'left'
                                                    }}
                                                >
                                                    {item.name}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        textAlign: 'left',
                                                        // border: '1px solid #000'
                                                    }}
                                                >
                                                    {item.lastMessage}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <CloudDownloadIcon
                                                sx={{
                                                    fontSize: '30px',
                                                    // color: '#000',
                                                    marginRight: '10px',
                                                }}
                                            />
                                        </Box>
                                    </ButtonBase>
                                )
                            })
                            }
                        </Box>
                    </Box>
                    {/* //      </Box> */}

                    {/* //      ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center', border: '1px solid #000',
                                backgroundColor: '#000',
                                color: '#fff',
                                cursor: 'revert',
                                width: '100%',
                                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '20px',
                                }}
                            >
                                Please Select any User to start chat
                            </Typography>
                        </Box>
                    // )}  */}
                </section>
            )}
        </div>
    );
}
export default Inbox;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
        label: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        label: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
        label: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
        label: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
        label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
        label: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
        label: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
];