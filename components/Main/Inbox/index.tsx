import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import MessageIcon from "@mui/icons-material/Message";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import CallIcon from "@mui/icons-material/Call";
import InfoIcon from "@mui/icons-material/Info";
import CancelIcon from "@mui/icons-material/Cancel";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import MailIcon from "@mui/icons-material/Mail";
import Fingerprint from "@mui/icons-material/Fingerprint";
import AttachmentIcon from "@mui/icons-material/Attachment";
import LinkIcon from "@mui/icons-material/Link";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import CollectionsIcon from "@mui/icons-material/Collections";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import SendIcon from "@mui/icons-material/Send";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Popover from '@mui/material/Popover';

import {
    doc,
    collection,
    onSnapshot,
    addDoc,
    query,
    orderBy,
    deleteDoc,
    setDoc,
    where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

// Importing firebase
import { db, auth } from "../../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

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
    Modal,
} from "@mui/material";

import CustomLoader from "../../CustomLoader";
import DateCategorizationChat from "./DateCategorizationChat";
import InteractiveContainer from "./InteractiveContainer";
import MessageContainer from "./MessageContainer";
import AddUserModal from "./AddUserModal";

import Image from "next/image";

//Importing Containers CSS Files
import styles from "./Inbox.module.css";


interface InboxProps {
    email: string;
}

const Inbox: React.FC<InboxProps> = ({ email }) => {

    const router = useRouter();

    ////////////////////////////////////// FOR GETTING PROJECTS DATA //////////////////////////////////////
    // console.log("Email ==> ", email.toString());
    // "Jobs", `${uid}`, "data")
    // const e = email;
    const e = email;

    // FOR GETTING PROJECTS
    let q = query(collection(db, "Projects"));

    const [snapshot, loading, error] = useCollection(q, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    // For getting the UsersListSingleChat
    const [usersListSingleChat, setUsersListSingleChat] = useState<any>([]);

    // Data/Chat/Single/Users${dataObject.email}

    let q1 = query(collection(db, "Data", "Chat", "Single", "Users", e));

    const [snapshot1, loading1, error1] = useCollection(q1, {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    //For getting the chatListSingleChat
    const [chatListSingleChat, setChatListSingleChat] = useState<any>([]);

    // let q2 = query(collection(db, "Chat", "Single", "Chat"));

    // const [snapshot2, loading2, error2] = useCollection(q2, {
    //     snapshotListenOptions: { includeMetadataChanges: true },
    // });

    //For getting the chatListProjectChat
    const [chatListProjectChat, setChatListProjectChat] = useState<any>([]);

    // let q3 = query(collection(db, "Chat", "Project", "Chat"));

    // const [snapshot3, loading3, error3] = useCollection(q3, {
    //     snapshotListenOptions: { includeMetadataChanges: true },
    // });

    // GETTINGS Active Jobs
    const [projects, setProjects] = useState<any>([]);
    const [projectMembersState, setProjectMembersState] = useState<any>([]);
    // const [loading, setLoading] = useState(true);

    // FOR GETTING PROJECTS
    useEffect(() => {
        if (!loading) {
            let projectMembers = [];

            let localObj: any;

            let arrProjects = snapshot?.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            localObj = arrProjects;

            // Now only i need projects that are created by me means email is equal to signedInUserData.email
            // or that are shared with me means project members array contains signedInUserData.email

            // Filter the projects array and extract only those projects that are created by me
            // localObj = localObj.filter((project: any) => );

            // Filter the projects array and extract only those projects that are shared with me
            localObj = localObj.filter((project: any) => project?.ProjectMembers?.includes(email) || project?.createdBy === email);

            let tempProjectsObj: any = localObj;

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
    }, [loading, snapshot, router.query]);
    // FOR GETTING PROJECTS

    // FOR GETTING USERSLISTSINGLECHAT
    useEffect(() => {
        if (!loading1) {
            let usersListSingle: any = snapshot1?.docs.map((doc, i) => ({
                ...doc.data(),
                id: doc.id,
            }));

            // Set the UsersListSingleChat
            setUsersListSingleChat(usersListSingle);

            console.log("Users List Single Chat ==> ", usersListSingle);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading1, snapshot1, router.query]);
    // FOR GETTING USERSLISTSINGLECHAT

    // FOR GETTING CHATLISTSINGLECHAT
    useEffect(() => {
        const messagesRef = collection(db, "Chat", "Single", "Chat");
        const sortedMessagesQuery = query(messagesRef, orderBy('timeSent', 'asc'));

        const unsubscribe = onSnapshot(sortedMessagesQuery, (snapshot) => {
            let chatListSingle = snapshot.docs.map((doc, i) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setChatListSingleChat(chatListSingle);
            console.log("Chat List Single Chat ==> ", chatListSingle);
        });

        return () => {
            unsubscribe();
        };
    }, [router.query]);
    // FOR GETTING CHATLISTSINGLECHAT

    // FOR GETTING CHATLISTPROJECTCHAT
    useEffect(() => {
        const projectChatRef = collection(db, "Chat", "Project", "Chat");
        const sortedProjectChatQuery = query(projectChatRef, orderBy('timeSent', 'asc'));

        const unsubscribe = onSnapshot(sortedProjectChatQuery, (snapshot) => {
            let chatListProject = snapshot.docs.map((doc, i) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setChatListProjectChat(chatListProject);
            console.log("Chat List Project Chat ==> ", chatListProject);
        });

        return () => {
            unsubscribe();
        };
    }, [router.query]);
    // FOR GETTING CHATLISTPROJECTCHAT
    ////////////////////////////////////// FOR GETTING PROJECTS DATA //////////////////////////////////////

    // For messages
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatListSingleChat, chatListProjectChat]);

    const convertDate = (date: string) => {
        const d = new Date(date);
        // const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
        // const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
        // const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
        // return `${da} ${mo} ${ye}`;
        console.log("Check Date ==> ", d)
        return d.toLocaleDateString();
    };

    let dateCoverted = convertDate(new Date().toString());

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number>(0);
    const open: any = Boolean(anchorEl);

    const handleClick = (event: any, index: number) => {
        setAnchorEl(event.currentTarget);
        setHoveredIndex(index);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setHoveredIndex(0);
    };

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

    // Current Selected Chat
    const [currentSelectedChatUser, setCurrentSelectedChatUser] =
        useState<string>("");

    // Current Selected Project Chat
    const [currentSelectedProjectChatUser, setCurrentSelectedProjectChatUser] =
        useState<string>("");

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
            lastMessage.scrollIntoView({ behavior: "smooth" });
        }
    };

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
                        };
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
    }, [signedInUserData, Loading, router.query]);

    const formatDate = (date: any) => {
        const today: any = new Date();
        const messageDate: any = new Date(date);
        const diffInDays = Math.floor(
            (today - messageDate) / (1000 * 60 * 60 * 24)
        );

        if (diffInDays === 0) {
            return "Today";
        } else if (diffInDays === 1) {
            return "Yesterday";
        } else {
            return messageDate.toLocaleDateString();
        }
    };

    let lastMessageDate: any = null;

    function extractFirstLetters(projectName: string) {
        // return projectName.split(' ').map(word => word.charAt(0)).join('');
        return projectName.charAt(0);
    }

    const computeDisplayStyle = (item: any) => {
        if (
            (item.userIDSender === signedInUserData.email &&
                item.userIDReceiver === currentSelectedChatUser) ||
            (item.userIDReceiver === signedInUserData.email &&
                item.userIDSender === currentSelectedChatUser) ||
            (currentTab === 1 && item.userIDReceiver === currentSelectedProjectChatUser)
        ) {
            return "block";
        } else {
            return "none";
        }
    };

    interface Message {
        timeSent: string;
        userIDSender: string;
        userIDReceiver: string;
        userNameSender: string;
        message: string;
        id: string;
    }

    const groupMessagesByDate = (messages: Message[]): Record<string, Message[]> => {
        const grouped: Record<string, Message[]> = {};

        messages.forEach((message: Message) => {
            const messageDate = formatDate(message.timeSent);

            if (grouped[messageDate]) {
                grouped[messageDate].push(message);
            } else {
                grouped[messageDate] = [message];
            }
        });

        return grouped;
    };

    const groupedChatList: Record<string, Message[]> =
        currentTab === 0
            ? groupMessagesByDate(chatListSingleChat)
            : currentTab === 1
                ? groupMessagesByDate(chatListProjectChat)
                : {};

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
                                className="d-flex justify-content-between"
                                sx={{
                                    padding: "18px",
                                }}
                            >
                                <Box
                                    className="d-flex justify-content-between"
                                    sx={{
                                        // border: "1px solid red",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "80%",
                                    }}
                                >
                                    {!showSearch && (
                                        <Tooltip title="Start New Chat">
                                            <IconButton
                                                color="inherit"
                                                onClick={() => setIsOpen(true)}
                                            >
                                                <AddBoxIcon
                                                    sx={{
                                                        color: '#5088c0',
                                                        fontSize: "30px",
                                                    }}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    <Box
                                        className="d-flex justify-content-between"
                                        sx={{
                                            // padding: '18px',
                                            width: "100%",
                                        }}
                                    >
                                        {showSearch ? (
                                            <Box
                                                title="search"
                                                sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    id="standard-basic"
                                                    label="Search"
                                                    variant="standard"
                                                    placeholder="Search Contacts"
                                                />
                                            </Box>
                                        ) : (
                                            <Box
                                                title="search"
                                                sx={{
                                                    width: "100%",
                                                    display: "flex",
                                                    alignItems: "left",
                                                    justifyContent: "left",
                                                    paddingTop: "5px",
                                                    paddingLeft: "25px",
                                                }}
                                            >
                                                <h3
                                                    className={styles.headerTitle}
                                                    style={{
                                                        color: '#5088c0'
                                                    }}
                                                >
                                                    General Inbox
                                                </h3>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                                <Box
                                    role={"button"}
                                    title="search"
                                    sx={{
                                        paddingTop: !showSearch ? "5px" : "10px",
                                    }}
                                >
                                    {showSearch ? (
                                        <SearchOffIcon
                                            onClick={() => setShowSearch(!showSearch)}
                                            sx={{
                                                color: "#5088c0",
                                                fontSize: "30px",
                                            }}
                                        />
                                    ) : (
                                        <SearchIcon
                                            onClick={() => setShowSearch(true)}
                                            sx={{
                                                color: "#5088c0",
                                                fontSize: "30px",
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>
                            <Box
                                className="d-flex justify-content-between"
                                sx={{
                                    borderBottom: "1px solid #5088c0",
                                    borderTop: "1px solid #5088c0",
                                    ml: "0px",
                                }}
                            >
                                {/* Display Three tabs here */}
                                <Button
                                    variant="contained"
                                    className={styles.tabButton}
                                    sx={{
                                        border: "none",
                                        borderBottom:
                                            currentTab === 0 ? "1px solid #000" : "1px solid #fff",
                                        boxShadow: "none",
                                        backgroundColor: currentTab === 0 ? "#5088c0" : "#fff",
                                        color: currentTab === 0 ? "#fff" : "#000",
                                        "&:hover": {
                                            backgroundColor: currentTab === 0 ? "#5088c0" : "#fff",
                                            color: currentTab === 0 ? "#fff" : "#000",
                                        },
                                    }}
                                    onClick={() => {
                                        setCurrentTab(0);
                                        setCurrentSelectedChatUser("");
                                        setCurrentSelectedProjectChatUser("");
                                    }}
                                    startIcon={<MessageIcon />}
                                >
                                    Messages
                                </Button>
                                <Button
                                    variant="contained"
                                    className={styles.tabButton}
                                    sx={{
                                        border: "none",
                                        borderBottom:
                                            currentTab === 1 ? "1px solid blue" : "1px solid #fff",
                                        boxShadow: "none",
                                        backgroundColor: currentTab === 1 ? "#5088c0" : "#fff",
                                        color: currentTab === 1 ? "#fff" : "#000",
                                        "&:hover": {
                                            backgroundColor: currentTab === 1 ? "#5088c0" : "#fff",
                                            color: currentTab === 1 ? "#fff" : "#000",
                                        },
                                    }}
                                    onClick={() => {
                                        setCurrentTab(1);
                                        setCurrentSelectedChatUser("");
                                        setCurrentSelectedProjectChatUser("");
                                    }}
                                    startIcon={<ListAltIcon />}
                                >
                                    Projects
                                </Button>
                            </Box>
                        </Box>
                        <Box>
                            {currentTab === 0 ? (
                                <Box
                                    sx={{
                                        width: "100%",
                                        // border: "1px solid red",
                                        height: "80.7vh",
                                        overflowY: "scroll",
                                        backgroundColor: "#fff",
                                    }}
                                >
                                    {usersListSingleChat.length === 0 ? (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                height: "80vh",
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: "20px",
                                                    fontWeight: "600",
                                                    textAlign: "center",
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
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        padding: "10px 20px",
                                                        backgroundColor: "#fff",
                                                        cursor: "pointer",
                                                        borderRadius: "0px",
                                                        width: "100%",
                                                        height: "80px",
                                                        fontWeight: 400,
                                                        boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                                                        "&:hover": {
                                                            backgroundColor: "#F5F5F5",
                                                            // color: "#fff",
                                                            borderTop: "1px solid #fff",
                                                        },
                                                    }}
                                                    onClick={() => {
                                                        setCurrentSelectedChatUser(item.email);
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                position: "relative",
                                                            }}
                                                        >
                                                            <Avatar
                                                                sx={{
                                                                    width: "50px",
                                                                    height: "50px",
                                                                }}
                                                                alt={item.name}
                                                                title={item.name}
                                                                src={item.profilePic}
                                                            />
                                                            {item.onlineStatus === "online" && (
                                                                <Box
                                                                    sx={{
                                                                        position: "absolute",
                                                                        bottom: 2,
                                                                        right: 2,
                                                                        width: "10px",
                                                                        height: "10px",
                                                                        borderRadius: "50%",
                                                                        backgroundColor: "green",
                                                                    }}
                                                                />
                                                            )}
                                                            {item.onlineStatus === "offline" && (
                                                                <Box
                                                                    sx={{
                                                                        position: "absolute",
                                                                        bottom: 2,
                                                                        right: 2,
                                                                        width: "10px",
                                                                        height: "10px",
                                                                        borderRadius: "50%",
                                                                        backgroundColor: "gray",
                                                                    }}
                                                                />
                                                            )}
                                                        </Box>
                                                        <Box
                                                            sx={{
                                                                marginLeft: "10px",
                                                                alignItems: "left",
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                justifyContent: "flex-start",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "16px",
                                                                    fontWeight: "400",
                                                                    textAlign: "left",
                                                                }}
                                                            >
                                                                {item.name}
                                                            </Typography>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "14px",
                                                                    fontWeight: "400",
                                                                    // Stop the over flow of text
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",
                                                                    whiteSpace: "nowrap",
                                                                    textAlign: "left",
                                                                    width: "250px",
                                                                    // border:"2px solid red"
                                                                }}
                                                            >
                                                                {item.lastMessage}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Typography
                                                            sx={{
                                                                fontSize: "14px",
                                                                fontWeight: "400",
                                                            }}
                                                        >
                                                            {item.lastMessageTime}
                                                        </Typography>
                                                    </Box>
                                                </ButtonBase>
                                            );
                                        })
                                    )}
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        padding: "0px",
                                        height: "80.7vh",
                                        // border:"20px solid red",
                                        overflowY: "auto",
                                    }}
                                >
                                    {projects.map((item: any, index: number) => {
                                        return (
                                            <ButtonBase
                                                key={index}
                                                sx={{
                                                    display: "flex",
                                                    width: "100%",
                                                    // border: "1px solid red",
                                                    borderRadius: "0px",
                                                    height: "80px",
                                                    padding: "15px",
                                                    marginBottom: "0px",
                                                    "&:hover": {
                                                        backgroundColor: "#F5F5F5",
                                                    },
                                                }}
                                                onClick={() => {
                                                    setCurrentSelectedProjectChatUser(item.ProjectName);
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        // border: "1px solid blue"
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            marginLeft: "15px",
                                                            display: "flex",
                                                        }}
                                                    >
                                                        {/* {item.ProjectMembers.map((member: any, index: number) => ( */}
                                                        <Box
                                                            // key={index}
                                                            onMouseEnter={(event) => handleClick(event, index)}
                                                            onMouseLeave={handlePopoverClose}
                                                            sx={{
                                                                width: '40px',
                                                                height: '40px',
                                                                borderRadius: '50%',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                color: 'white',
                                                                marginLeft: '-15px',
                                                                // backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                                                                backgroundColor: item.color_code,
                                                            }}
                                                        >
                                                            {/* {extractFirstLetters(member)} */}

                                                            {
                                                                // Extract the first and last letter of the project name
                                                                item.ProjectName.substring(0, 3)
                                                            }..
                                                            <Popover
                                                                id={index.toString()}
                                                                sx={{
                                                                    pointerEvents: 'none',
                                                                }}
                                                                open={open && hoveredIndex === index}
                                                                anchorEl={anchorEl}
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'left',
                                                                }}
                                                                transformOrigin={{
                                                                    vertical: 'top',
                                                                    horizontal: 'left',
                                                                }}
                                                                onClose={handlePopoverClose}
                                                                disableRestoreFocus
                                                            >
                                                                <Typography
                                                                    sx={{
                                                                        pl: 2,
                                                                        pr: 2,
                                                                        pt: 1,
                                                                        pb: 1,
                                                                        backgroundColor: '#363639',
                                                                        color: 'white',
                                                                        width: '200px',
                                                                        borderRadius: '5px',
                                                                        fontSize: '12px',
                                                                        fontWeight: 400,
                                                                        height: 'auto',
                                                                    }}
                                                                >
                                                                    {/* {member} */}
                                                                    Click this to start chatting with the team as a whole team for Project: {(item.ProjectName)}
                                                                </Typography>
                                                            </Popover>
                                                        </Box>
                                                        {/* ))} */}
                                                        <Typography
                                                            sx={{
                                                                fontSize: "16px",
                                                                fontWeight: "400",
                                                                // border: "1px solid red",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                marginLeft: "10px",
                                                            }}
                                                        >
                                                            {item.ProjectName}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        marginLeft: "auto",
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "400",
                                                            // border: "1px solid red"
                                                        }}
                                                    >
                                                        {
                                                            // Displaying the date in the format of 10th of January, 2021
                                                            // new Date(item.createAt).toLocaleDateString('en-US', {
                                                            //     day: 'numeric',
                                                            //     month: 'long',
                                                            //     year: 'numeric'
                                                            // })
                                                            convertDate(item.createAt.toString())
                                                            // dateCoverted
                                                            //    item.createAt
                                                        }
                                                    </Typography>
                                                </Box>
                                            </ButtonBase>
                                        );
                                    })}
                                </Box>
                            )}
                        </Box>
                    </Box>

                    {currentSelectedChatUser !== "" ||
                        currentSelectedProjectChatUser !== "" ? (
                        <Box
                            className={styles.middleContainer}
                            sx={{
                                width: showProfileInfo ? "40%" : "70%",
                                // border: "5px solid red",
                                transition: "0.3s linear",
                            }}
                        >
                            <Box className={styles.MiddleHeaderContainer}>
                                <Box
                                    className="d-flex justify-content-between"
                                    sx={{
                                        padding: "20px",
                                    }}
                                >
                                    {middleShowSearch ? (
                                        <Box
                                            title="search"
                                            sx={{
                                                width: "70%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginRight: "20px",
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                id="standard-basic"
                                                label="Search"
                                                variant="standard"
                                                placeholder="Search Messages"
                                            />
                                        </Box>
                                    ) : (
                                        <Box
                                            title="search"
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                alignItems: "left",
                                                justifyContent: "left",
                                            }}
                                        >
                                            <div className={styles.middleHeaderInsideContainer}>
                                                <div className={styles.leftmhic}>
                                                    <Avatar
                                                        sx={{
                                                            width: "35px",
                                                            height: "35px",
                                                        }}
                                                        alt="Remy Sharp"
                                                        src="/static/images/avatar/1.jpg"
                                                    />
                                                    <h3 className={styles.MiddleheaderTitle}>
                                                        Conversation
                                                        {currentTab === 0 ? " with " : " about "}
                                                        <b style={{ fontWeight: "bold" }}>
                                                            {currentTab === 0
                                                                ? currentSelectedChatUser
                                                                : currentSelectedProjectChatUser}
                                                        </b>
                                                    </h3>
                                                </div>
                                                <div className={styles.rightmhic}></div>
                                            </div>
                                        </Box>
                                    )}
                                    <Box
                                        role={"button"}
                                        title="search"
                                        sx={{
                                            width: "30%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            // border: 
                                            // border: '1px solid #000',
                                        }}
                                    >
                                        {middleShowSearch ? (
                                            <SearchOffIcon
                                                onClick={() => setMiddleShowSearch(!middleShowSearch)}
                                                sx={{
                                                    color: "#000",
                                                    fontSize: "30px",
                                                }}
                                            />
                                        ) : (
                                            <SearchIcon
                                                onClick={() => setMiddleShowSearch(true)}
                                                sx={{
                                                    color: "#000",
                                                    fontSize: "30px",
                                                }}
                                            />
                                        )}
                                        <ButtonBase
                                            sx={{
                                                marginLeft: "10px",
                                            }}
                                        >
                                            <CallIcon
                                                sx={{
                                                    color: "#4275f6",
                                                    fontSize: "30px",
                                                }}
                                            />
                                        </ButtonBase>
                                        <ButtonBase
                                            sx={{
                                                marginLeft: "10px",
                                                borderRadius: "50%",
                                            }}
                                            onClick={() => setShowProfileInfo(!showProfileInfo)}
                                        >
                                            <InfoIcon
                                                sx={{
                                                    color: "#000",
                                                    fontSize: "30px",
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
                                {Object.entries(groupedChatList).map(([date, messages]: [string, any[]], index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            width: "100%",
                                        }}
                                    >
                                        <section>
                                            {messages.map((item: any, index: number) => (
                                                <>
                                                    {((currentTab === 0 &&
                                                        ((item.userIDSender === signedInUserData.email &&
                                                            item.userIDReceiver === currentSelectedChatUser) ||
                                                            (item.userIDReceiver === signedInUserData.email &&
                                                                item.userIDSender === currentSelectedChatUser))) ||
                                                        (currentTab === 1 && item.userIDReceiver === currentSelectedProjectChatUser)) ? (
                                                        <Box
                                                            sx={{
                                                                display: computeDisplayStyle(item)
                                                            }}
                                                        >
                                                            {/* <DateCategorizationChat
                                                                messageDate={date}
                                                                showDate={true}
                                                            /> */}
                                                            <MessageContainer
                                                                userPic={item.userpic}
                                                                editedMessageId={editedMessageId}
                                                                userName={item.userNameSender}
                                                                timeSent={new Date(item.timeSent).toLocaleString('en-US', {
                                                                    hour: 'numeric',
                                                                    hour12: true,
                                                                    minute: 'numeric',
                                                                    day: 'numeric',
                                                                    month: "short",
                                                                    year: "numeric"
                                                                })}
                                                                message={item.message}
                                                                id={item.id}
                                                                type={
                                                                    (item.userIDSender === signedInUserData.email) ?
                                                                        ("sent") :
                                                                        (
                                                                            "received"
                                                                        )
                                                                }
                                                            // ref={messagesEndRef}
                                                            />
                                                        </Box>
                                                    ) : null}

                                                </>
                                            ))}

                                        </section>
                                    </Box>
                                ))}
                                <div ref={messagesEndRef}></div>
                            </Box>

                            <Box
                                className={styles.MiddleFooterContainer}
                                sx={{
                                    // height: '100px',
                                    width: showProfileInfo ? "39.8%" : "69.5%",
                                }}
                            >
                                <InteractiveContainer
                                    signedInUserData={signedInUserData}
                                    currentSelectedChatUser={
                                        currentTab === 0
                                            ? currentSelectedChatUser
                                            : currentSelectedProjectChatUser
                                    }
                                    isSignedIn={isSignedIn}
                                    chatType={currentTab === 0 ? "Single" : "Project"}
                                    onSendMessage={scrollToBottom}
                                    // Message
                                    message={message}
                                    setMessage={setMessage}
                                />
                            </Box>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                justifyContent: "center",
                                border: "1px solid #000",
                                backgroundColor: "#fff",
                                color: "#000000",
                                cursor: "revert",
                                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                                width: showProfileInfo ? "40%" : "70%",
                                // border: "5px solid red",
                                transition: "0.3s linear"
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    textAlign: "center",
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
                                    fontSize: "20px",
                                }}
                            >
                                Please Select any User to start chat
                            </Typography>
                        </Box>
                    )
                    }

                    <Box
                        className={styles.rightContainer}
                        sx={{
                            display: showProfileInfo ? "block" : "none",
                            transition: "0.3s linear",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "flex-end",
                                width: "100%",
                            }}
                        >
                            <ButtonBase
                                sx={{
                                    borderRadius: "50%",
                                }}
                                onClick={() => setShowProfileInfo(!showProfileInfo)}
                            >
                                <CancelIcon
                                    sx={{
                                        color: "#000",
                                        fontSize: "30px",
                                    }}
                                />
                            </ButtonBase>
                        </Box>
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: "80px",
                                        height: "80px",
                                    }}
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/1.jpg"
                                />
                                <Typography
                                    sx={{
                                        fontSize: "20px",
                                        fontWeight: "600",
                                        marginTop: "10px",
                                    }}
                                >
                                    Talha Pervaiz
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        marginTop: "5px",
                                    }}
                                >
                                    (809) 836 312 73
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    flexDirection: "row",
                                    width: "100%",
                                    height: "100%",
                                    // border: "1px solid red",
                                    marginTop: "20px",
                                }}
                            >
                                <ButtonBase
                                    sx={{
                                        height: "fit-content",
                                    }}
                                >
                                    <MailIcon
                                        sx={{
                                            color: "red",
                                            fontSize: "30px",
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
                                            color: "#4275f6",
                                            fontSize: "30px",
                                        }}
                                    />
                                </ButtonBase>
                                <ButtonBase
                                    sx={{
                                        borderRadius: "50%",
                                    }}
                                >
                                    <TaskAltIcon
                                        sx={{
                                            color: "#000",
                                            fontSize: "30px",
                                        }}
                                    />
                                </ButtonBase>
                                <ButtonBase
                                    sx={{
                                        borderRadius: "50%",
                                    }}
                                >
                                    <VideoCallIcon
                                        sx={{
                                            color: "#000",
                                            fontSize: "30px",
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
                                    backgroundColor: currentProfileTab === 0 ? "#000" : "#fff",
                                    color: currentProfileTab === 0 ? "#fff" : "#000",
                                    borderRadius: "3px",
                                    "&:hover": {
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
                                    backgroundColor: currentProfileTab === 1 ? "#000" : "#fff",
                                    color: currentProfileTab === 1 ? "#fff" : "#000",
                                    "&:hover": {
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
                                    backgroundColor: currentProfileTab === 2 ? "#000" : "#fff",
                                    color: currentProfileTab === 2 ? "#fff" : "#000",
                                    "&:hover": {
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
                                    backgroundColor: currentProfileTab === 3 ? "#000" : "#fff",
                                    color: currentProfileTab === 3 ? "#fff" : "#000",
                                    "&:hover": {
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
                                    backgroundColor: currentProfileTab === 4 ? "#000" : "#fff",
                                    color: currentProfileTab === 4 ? "#fff" : "#000",
                                    "&:hover": {
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
                            className="d-flex justify-content-between"
                            sx={{
                                padding: "20px",
                                marginTop: "20px",
                                // border: "1px solid red",
                            }}
                        >
                            {showProfileSearch ? (
                                <Box
                                    title="search"
                                    sx={{
                                        width: "80%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <TextField
                                        fullWidth
                                        id="standard-basic"
                                        label="Search"
                                        variant="standard"
                                        placeholder={
                                            currentProfileTab === 0
                                                ? "Search File Attachements"
                                                : currentProfileTab === 1
                                                    ? "Search Links"
                                                    : currentProfileTab === 2
                                                        ? "Search Tasks"
                                                        : currentProfileTab === 3
                                                            ? "Search Images List"
                                                            : currentProfileTab === 4
                                                                ? "Search Video Library"
                                                                : ""
                                        }
                                    />
                                </Box>
                            ) : (
                                <Box
                                    title="search"
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "left",
                                        justifyContent: "left",
                                    }}
                                >
                                    <h3 className={styles.headerTitle}>
                                        {currentProfileTab === 0
                                            ? "File Attachements"
                                            : currentProfileTab === 1
                                                ? "Links"
                                                : currentProfileTab === 2
                                                    ? "Tasks"
                                                    : currentProfileTab === 3
                                                        ? "Images List"
                                                        : currentProfileTab === 4
                                                            ? "Video Library"
                                                            : ""}
                                    </h3>
                                </Box>
                            )}
                            <Box
                                role={"button"}
                                title="search"
                                sx={{
                                    paddingTop: !showProfileSearch ? "0px" : "10px",
                                }}
                            >
                                {showProfileSearch ? (
                                    <SearchOffIcon
                                        onClick={() => setShowProfileSearch(!showProfileSearch)}
                                        sx={{
                                            color: "#000",
                                            fontSize: "30px",
                                        }}
                                    />
                                ) : (
                                    <SearchIcon
                                        onClick={() => setShowProfileSearch(true)}
                                        sx={{
                                            color: "#000",
                                            fontSize: "30px",
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                padding: "20px",
                                marginTop: "20px",
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
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={
                                            currentProfileTab === 0
                                                ? "File Attachements"
                                                : currentProfileTab === 1
                                                    ? "Links"
                                                    : currentProfileTab === 2
                                                        ? "Tasks"
                                                        : currentProfileTab === 3
                                                            ? "Images List"
                                                            : currentProfileTab === 4
                                                                ? "Video Library"
                                                                : ""
                                        }
                                        variant="outlined"
                                        placeholder={
                                            currentProfileTab === 0
                                                ? "Search File Attachements"
                                                : currentProfileTab === 1
                                                    ? "Search Links"
                                                    : currentProfileTab === 2
                                                        ? "Search Tasks"
                                                        : currentProfileTab === 3
                                                            ? "Search Images List"
                                                            : currentProfileTab === 4
                                                                ? "Search Video Library"
                                                                : ""
                                        }
                                    />
                                )}
                            />
                        </Box>
                        <Box
                            sx={{
                                // paddingTop: '20px',
                                // marginTop: '20px',
                                // border: "1px solid red",
                                height: "40vh",
                                overflowY: "scroll",
                                backgroundColor: "#fff",
                            }}
                        >
                            {[
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                                {
                                    name: "Docx1.pdf",
                                    isOnline: true,
                                    lastMessage: "12.25.10",
                                    lastMessageTime: "10:00 AM",
                                    profilePic: "/static/images/avatar/1.jpg",
                                },
                            ].map((item, index) => {
                                return (
                                    <ButtonBase
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            // alignItems: 'center',
                                            justifyContent: "space-between",
                                            padding: "10px 20px",
                                            // border: '1px solid #000',
                                            backgroundColor: "#fff",
                                            cursor: "pointer",
                                            // marginBottom: '10px',
                                            borderRadius: "0px",
                                            width: "100%",
                                            boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                                            "&:hover": {
                                                backgroundColor: "#000",
                                                color: "#fff",
                                                border: "1px solid #fff",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <PictureAsPdfIcon
                                                sx={{
                                                    fontSize: "40px",
                                                    // color: '#000',
                                                    marginRight: "10px",
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    marginLeft: "10px",
                                                    alignItems: "left",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "flex-start",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "16px",
                                                        fontWeight: "600",
                                                        textAlign: "left",
                                                    }}
                                                >
                                                    {item.name}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontSize: "14px",
                                                        fontWeight: "400",
                                                        textAlign: "left",
                                                        // border: '1px solid #000'
                                                    }}
                                                >
                                                    {item.lastMessage}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <CloudDownloadIcon
                                                sx={{
                                                    fontSize: "30px",
                                                    // color: '#000',
                                                    marginRight: "10px",
                                                }}
                                            />
                                        </Box>
                                    </ButtonBase>
                                );
                            })}
                        </Box>
                    </Box>
                </section >
            )}
        </div >
    );
};
export default Inbox;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
        label: "The Lord of the Rings: The Return of the King",
        year: 2003,
    },
    { label: "The Good, the Bad and the Ugly", year: 1966 },
    { label: "Fight Club", year: 1999 },
    {
        label: "The Lord of the Rings: The Fellowship of the Ring",
        year: 2001,
    },
    {
        label: "Star Wars: Episode V - The Empire Strikes Back",
        year: 1980,
    },
    { label: "Forrest Gump", year: 1994 },
    { label: "Inception", year: 2010 },
    {
        label: "The Lord of the Rings: The Two Towers",
        year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: "Goodfellas", year: 1990 },
    { label: "The Matrix", year: 1999 },
    { label: "Seven Samurai", year: 1954 },
    {
        label: "Star Wars: Episode IV - A New Hope",
        year: 1977,
    },
    { label: "City of God", year: 2002 },
    { label: "Se7en", year: 1995 },
    { label: "The Silence of the Lambs", year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: "Life Is Beautiful", year: 1997 },
    { label: "The Usual Suspects", year: 1995 },
    { label: "Léon: The Professional", year: 1994 },
    { label: "Spirited Away", year: 2001 },
    { label: "Saving Private Ryan", year: 1998 },
    { label: "Once Upon a Time in the West", year: 1968 },
    { label: "American History X", year: 1998 },
    { label: "Interstellar", year: 2014 },
    { label: "Casablanca", year: 1942 },
    { label: "City Lights", year: 1931 },
    { label: "Psycho", year: 1960 },
    { label: "The Green Mile", year: 1999 },
    { label: "The Intouchables", year: 2011 },
    { label: "Modern Times", year: 1936 },
    { label: "Raiders of the Lost Ark", year: 1981 },
    { label: "Rear Window", year: 1954 },
    { label: "The Pianist", year: 2002 },
    { label: "The Departed", year: 2006 },
    { label: "Terminator 2: Judgment Day", year: 1991 },
    { label: "Back to the Future", year: 1985 },
    { label: "Whiplash", year: 2014 },
    { label: "Gladiator", year: 2000 },
    { label: "Memento", year: 2000 },
    { label: "The Prestige", year: 2006 },
    { label: "The Lion King", year: 1994 },
    { label: "Apocalypse Now", year: 1979 },
    { label: "Alien", year: 1979 },
    { label: "Sunset Boulevard", year: 1950 },
    {
        label:
            "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
        year: 1964,
    },
    { label: "The Great Dictator", year: 1940 },
    { label: "Cinema Paradiso", year: 1988 },
    { label: "The Lives of Others", year: 2006 },
    { label: "Grave of the Fireflies", year: 1988 },
    { label: "Paths of Glory", year: 1957 },
    { label: "Django Unchained", year: 2012 },
    { label: "The Shining", year: 1980 },
    { label: "WALL·E", year: 2008 },
    { label: "American Beauty", year: 1999 },
    { label: "The Dark Knight Rises", year: 2012 },
    { label: "Princess Mononoke", year: 1997 },
    { label: "Aliens", year: 1986 },
    { label: "Oldboy", year: 2003 },
    { label: "Once Upon a Time in America", year: 1984 },
    { label: "Witness for the Prosecution", year: 1957 },
    { label: "Das Boot", year: 1981 },
    { label: "Citizen Kane", year: 1941 },
    { label: "North by Northwest", year: 1959 },
    { label: "Vertigo", year: 1958 },
    {
        label: "Star Wars: Episode VI - Return of the Jedi",
        year: 1983,
    },
    { label: "Reservoir Dogs", year: 1992 },
    { label: "Braveheart", year: 1995 },
    { label: "M", year: 1931 },
    { label: "Requiem for a Dream", year: 2000 },
    { label: "Amélie", year: 2001 },
    { label: "A Clockwork Orange", year: 1971 },
    { label: "Like Stars on Earth", year: 2007 },
    { label: "Taxi Driver", year: 1976 },
    { label: "Lawrence of Arabia", year: 1962 },
    { label: "Double Indemnity", year: 1944 },
    {
        label: "Eternal Sunshine of the Spotless Mind",
        year: 2004,
    },
    { label: "Amadeus", year: 1984 },
    { label: "To Kill a Mockingbird", year: 1962 },
    { label: "Toy Story 3", year: 2010 },
    { label: "Logan", year: 2017 },
    { label: "Full Metal Jacket", year: 1987 },
    { label: "Dangal", year: 2016 },
    { label: "The Sting", year: 1973 },
    { label: "2001: A Space Odyssey", year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: "Toy Story", year: 1995 },
    { label: "Bicycle Thieves", year: 1948 },
    { label: "The Kid", year: 1921 },
    { label: "Inglourious Basterds", year: 2009 },
    { label: "Snatch", year: 2000 },
    { label: "3 Idiots", year: 2009 },
    { label: "Monty Python and the Holy Grail", year: 1975 },
];