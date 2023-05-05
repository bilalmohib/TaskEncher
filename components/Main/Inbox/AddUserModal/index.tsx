import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    Modal,
    TextField,
    Button,
    Autocomplete
} from '@mui/material';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

// Importing Add Data Function
import addData from '../../../../utilities/components/Inbox/addData';

interface AddUserModalProps {
    setIsOpen: any,
    isOpen: boolean,
    projectMembersState: any,
    isSignedIn: boolean,
    signedInUserData: any,
    usersListSingleChat: any,
}

const AddUserModal: React.FC<AddUserModalProps> = ({
    setIsOpen,
    isOpen,
    projectMembersState,
    isSignedIn,
    signedInUserData,
    usersListSingleChat
}) => {
    const { enqueueSnackbar } = useSnackbar();

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

    const [value, setValue] = React.useState<any>(null);

    useEffect(() => {
        if (value) {
            console.log("The selected email : ", value.title);
        }
    }, [value])

    const handleStartNewChat = () => {
        console.log("Start New Chat");
        if (value !== null) {
            // alert("value" + " " + value?.title);
            setIsOpen(false);

            // Extract user name from email
            let name = value?.title.split("@")[0];

            const chatUser = {
                uid: value.title,
                email: value.title,
                name: name,
                lastMessage: 'Hi',
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
                    enqueueSnackbar
                );
            }
        } else {
            alert("Please select a user");
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
export default AddUserModal;