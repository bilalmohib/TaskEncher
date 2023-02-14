import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
//////////////////////////////////////////////////
import { makeStyles } from '@mui/styles';

import styles from './Inbox.module.css';

// Importing firebase
import { auth } from "../../../firebase";
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
    Autocomplete
} from '@mui/material';

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
    },
    input: {
        marginRight: 2,
        flexGrow: 1,
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

const InteractiveContainer = () => {
    const classes = useStyles();
    const [message, setMessage] = useState('');

    const handleChange = (event: any) => {
        setMessage(event.target.value);
    };

    const handleSubmit = () => {
        // Perform action to send message
        console.log('Message:', message);
        setMessage('');
    };

    return (
        <Box className={classes.container}>
            <TextField
                className={classes.input}
                label="Type your message here..."
                value={message}
                onChange={handleChange}
                variant="outlined"
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

const Inbox = () => {

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

    // ________________________ For Login ________________________ //
    const router = useRouter();

    // signed in user data
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [Loading, setloading] = useState(true);

    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };


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
                            displayName: "Anonymous",
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

    return (
        <div>
            {/* Home Page */}
            {Loading ? (
                <CustomLoader />
            ) : (
                <section className={styles.container}>
                    <Box className={styles.leftContainer}>
                        <Box className={styles.HeaderContainer}>
                            <Box
                                className='d-flex justify-content-between'
                                sx={{
                                    padding: '20px',
                                }}
                            >
                                {(showSearch) ? (
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
                                        }}
                                    >
                                        <h3 className={styles.headerTitle}>General Inbox</h3>
                                    </Box>
                                )}
                                <Box
                                    role={"button"}
                                    title="search"
                                    sx={{
                                        paddingTop: (!showSearch) ? '0px' : '10px',
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
                                            border: "1px solid red",
                                            height: '80.7vh',
                                            overflowY: 'scroll',
                                            backgroundColor: '#fff',
                                        }}
                                    >
                                        {[
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'online',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'offline',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'online',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'online',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'online',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'offline',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'online',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'online',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'online',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'online',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'online',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'online',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'online',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'online',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'offline',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'offline',
                                            }, {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'offline',
                                            }
                                            , {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'offline',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'offline',
                                            }, {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'offline',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'offline',
                                            },
                                            {
                                                name: 'Remy Sharp',
                                                isOnline: true,
                                                lastMessage: 'Hello, How are you?',
                                                lastMessageTime: '10:00 AM',
                                                profilePic: '/static/images/avatar/1.jpg',
                                                onlineStatus: 'online',
                                            }
                                        ].map((item, index) => {
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
                                                        },
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
                                                            border: "1px solid red",
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
                                                                border: "1px solid blue"
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
                                                                        border: "1px solid red",
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
                                                                    border: "1px solid red"
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
                    <Box
                        className={styles.middleContainer}
                        sx={{
                            width: (showProfileInfo) ? '40%' : '70%',
                            border: "5px solid red",
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
                                                <h3 className={styles.MiddleheaderTitle}>Conversation with <b style={{ fontWeight: "bold" }}>Talha Pervaiz</b></h3>
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
                                        border: '1px solid #000',
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
                        <Box className={styles.MiddleBodyContainer}>
                            <h1>Middle Body Container</h1>
                            <Box>
                            </Box>
                        </Box>
                        <Box className={styles.MiddleFooterContainer}
                            sx={{
                                width: (showProfileInfo) ? '34.3%' : '60%',
                            }}
                        >
                            <InteractiveContainer />
                        </Box>
                    </Box>
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
                                    border: "1px solid red",
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
                                border: "1px solid red",
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
                                    border: "1px solid #000",
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
                                    border: "1px solid #000",
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
                                    border: "1px solid #000",
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
                                    border: "1px solid #000",
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
                                    border: "1px solid #000",
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
                                border: "1px solid red",
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
                                border: "1px solid orange",
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
                                border: "1px solid red",
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
                                                        textAlign: 'left'
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