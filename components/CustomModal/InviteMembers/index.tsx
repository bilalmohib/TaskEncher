import React, { useEffect } from 'react'
import {
    Box,
    Button,
    Typography
} from '@mui/material';
import Image from 'next/image';
import CustomPopOver from '@app/components/CustomPopOver';
import MultiSelectCustomAutoComplete from '@app/components/MultiSelectCustomAutoComplete';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import addProjectMembers from '@app/lib/addProjectMembers';

interface InviteMembersProps {
    projects: any;
    projectMembers: string[];
    projectID: string;
}

const InviteMembers: React.FC<InviteMembersProps> = (
    {
        projects,
        projectMembers,
        projectID
    }) => {

    const styles = {
        label: {
            fontSize: "16px",
            fontWeight: 400,
            color: "#6D6E6F"
        },
        inputInfo: {
            fontSize: "14px",
            fontWeight: 400,
            color: "#6D6E6F",
            mt: "8px"
        },
        input: {
            width: "100%",
            height: "auto",
            // border: "1px solid #E5E5E5",
            borderRadius: 2
        },
        dropDownStyles: {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E5E5E5',
                borderWidth: '1px',
                borderRadius: 2
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E5E5E5',
                borderWidth: '1px',
                borderRadius: 2
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                // Give the default border color of material ui input
                borderWidth: '1px',
                borderRadius: 2
            }
        }
    }

    // List of buttons
    const buttonsList = [
        {
            id: 0,
            name: "Google",
            icon: <FcGoogle title="Google" style={{ fontSize: 22 }} />,
        },
        {
            id: 1,
            name: "Slack",
            icon: <Image
                src="/images/Modal/InviteMember/slack.svg"
                alt="Slack"
                title='Slack'
                width={20}
                height={20}
            />,
        },
        {
            id: 2,
            name: "Microsoft",
            icon: <Image
                src="/images/Modal/InviteMember/microsoft.svg"
                alt="Slack"
                title='Slack'
                width={20}
                height={20}
            />,
        }
    ];

    const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);

    const [membersError, setMembersError] = React.useState<boolean>(false);

    const [selectedProjects, setSelectedProjects] = React.useState<string[]>([]);

    // For popover
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    // For popover
    const [anchorEl1, setAnchorEl1] = React.useState<HTMLElement | null>(null);

    // To get the value of the selected member
    useEffect(() => {
        console.log("selectedMembers", selectedMembers);
    }, [selectedMembers]);

    const [modifiedProjectMembers, setModifiedProjectMembers] = React.useState<any>([]);

    // Modify the projectMembers array and make it an array of objects such that it contains the name 
    // and the email of the member and extract first and last name first letter and make it the avatar
    useEffect(() => {
        const localModifiedProjectMembers = projectMembers.map((member: string) => {
            const name = member.split("@")[0];
            const email = member;
            const firstName = email.split(".")[0];
            const lastName = email.split(".")[1];
            // Extract first and last name first letter and make it the avatar
            const avatar = firstName.charAt(0) + lastName.charAt(0);
            return {
                id: member,
                name: member,
                email: email,
                avatar: avatar
            }
        });
        console.log("localModifiedProjectMembers", localModifiedProjectMembers);

        setModifiedProjectMembers(localModifiedProjectMembers);

    }, [projectMembers]);

    async function sendInvite(name: string, email: string) {
        // name, email, link, projectName, senderName
        const sendData = {
            "name": "BILAL",
            "email": "bilalmohib7896@gmail.com",
            "link": "https://www.google.com",
            "projectName": "FYP",
            "senderName": "M. Bilal"
        }
        const response = await fetch('/api/send-invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();
    }

    async function sendInvites() {
        let selectedMembersEmails: any = [];
        let selectedProjectsLocal: any = [];

        for (let i = 0; i < selectedMembers.length; i++) {
            // const firstName = email.split(".")[0];
            // const lastName = email.split(".")[1];
            // // Extract first and last name first letter and make it the avatar
            // const avatar = firstName.charAt(0) + lastName.charAt(0);

            // @ts-ignore
            selectedMembersEmails.push(selectedMembers[i]?.title);
        }

        for (let i = 0; i < selectedProjects.length; i++) {
            // @ts-ignore
            selectedProjectsLocal.push(selectedProjects[i]?.value);
        }

        console.log("Selected Members Email ==> ", selectedMembersEmails);
        console.log("Selected Projects ==> ", selectedProjectsLocal);

        // projectsToAdd: any,
        // projectID: string,
        // projects: any, // Add the projects array as an argument
        // projectMembers: [] | null | undefined

        addProjectMembers(
            selectedProjectsLocal,
            projectID,
            projects,
            selectedMembersEmails
        )

        // sendInvite('John Doe', 'john@example.com')
        //     .then((response) => {
        //         console.log(response.message);
        //         alert(response.message);
        //     })
        //     .catch((error) => {
        //         console.error(error.message)
        //         alert(error.message);
        //     });

    }

    return (
        <Box>
            <Typography sx={styles.label} variant="h6" component="h2">
                Email addresses &nbsp;
                <CustomPopOver
                    anchorEl={anchorEl1}
                    setAnchorEl={setAnchorEl1}
                    iconColor='#2196f3'
                    title="Enter the email addresses of the people you want to invite."
                />
            </Typography>
            <Box sx={{ mt: "8px" }}>
                <MultiSelectCustomAutoComplete
                    placeholder="name@company.com , name@company.com"
                    options={modifiedProjectMembers}
                    selectedArrayList={selectedMembers}
                    setSelectedArrayList={setSelectedMembers}
                    styles={styles.input}
                    dropDownStyles={styles.dropDownStyles}
                    type="members"
                    error={membersError}
                    setError={setMembersError}
                />
            </Box>
            <Typography sx={styles.inputInfo} variant="h6" component="h2">
                Your teammates will get an email that gives them access to your team.
            </Typography>

            <br />

            <Typography sx={styles.label} variant="h6" component="h2">
                or add from &nbsp;
                <CustomPopOver
                    anchorEl={anchorEl1}
                    setAnchorEl={setAnchorEl1}
                    iconColor='#2196f3'
                    title="Add Users From Google, Github, Slack, etc. See the list of supported services below."
                />
            </Typography>

            <Box sx={{ mt: "15px", display: "flex", justifyContent: "space-between" }}>
                {buttonsList.map((item: any, index: number) => {
                    return (
                        <Button
                            key={index}
                            variant="contained"
                            sx={{
                                width: "32%",
                                height: "auto",
                                border: "1px solid #eff0f2",
                                backgroundColor: "#fff",
                                color: "#3F51B5",
                                fontSize: "16px",
                                fontWeight: "lighter",
                                textTransform: "none",
                                '&:hover': {
                                    backgroundColor: "#fff",
                                    color: "#3F51B5",
                                }
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                {item.icon}
                                <Box sx={{ ml: "10px", color: "black" }}>{item.name}</Box>
                            </Box>
                        </Button>
                    )
                })}
            </Box>

            <br />

            <Typography sx={styles.label} variant="h6" component="h2">
                Add to projects &nbsp;
                <CustomPopOver
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    iconColor='#2196f3'
                    title="Help your team mates get started.This is the first project they will see"
                />
            </Typography>

            <Box sx={{ mt: "15px" }}>
                <MultiSelectCustomAutoComplete
                    placeholder="Start typing to add projects"
                    options={projects}
                    selectedArrayList={selectedProjects}
                    setSelectedArrayList={setSelectedProjects}
                    styles={styles.input}
                    dropDownStyles={styles.dropDownStyles}
                    type="projects"
                />
            </Box>

            <br /> <br />

            <Box
                sx={{
                    mt: "20px",
                    mb: "5px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "right"
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        width: "100px",
                        height: "auto",
                        backgroundColor: "#3F51B5",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "lighter",
                        textTransform: "none",
                        '&:hover': {
                            backgroundColor: "#3F51B5",
                            color: "#fff",
                        }
                    }}
                    onClick={sendInvites}
                >
                    Send
                </Button>
            </Box>
        </Box>
    )
}
export default InviteMembers;