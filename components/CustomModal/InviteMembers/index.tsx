import React, { useEffect } from 'react'
import {
    Box,
    Button,
    Typography
} from '@mui/material';
import MultiSelectDropDown from '@app/components/MultiSelectDropDown';
import CustomPopOver from '@app/components/CustomPopOver';
import MultiSelectChipDropDown from '@app/components/ProjectDetails/List/MultiSelectChipDropDown';
import MultiSelectCustomAutoComplete from '@app/components/MultiSelectCustomAutoComplete';
import { title } from 'process';

// const InviteMembers = () => {
interface InviteMembersProps {
    projects: any;
    projectMembers: string[];
}

const InviteMembers: React.FC<InviteMembersProps> = (
    {
        projects,
        projectMembers
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

    const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);

    const [selectedProjects, setSelectedProjects] = React.useState<string[]>([]);

    // For popover
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);


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
        sendInvite('John Doe', 'john@example.com')
            .then((response) => {
                console.log(response.message);
                alert(response.message);
            })
            .catch((error) => {
                console.error(error.message)
                alert(error.message);
            });
    }

    return (
        <Box>
            <Typography sx={styles.label} variant="h6" component="h2">
                Email addresses
            </Typography>
            <Box sx={{ mt: "8px" }}>
                {/* <MultiSelectChipDropDown
                    placeholder="name@company.com , name@company.com"
                    options={projectMembers}
                    selectedArrayList={selectedMembers}
                    setSelectedArrayList={setSelectedMembers}
                    styles={styles.input}
                    dropDownStyles={styles.dropDownStyles}
                /> */}

                <MultiSelectCustomAutoComplete
                    placeholder="name@company.com , name@company.com"
                    options={modifiedProjectMembers}
                    selectedArrayList={selectedMembers}
                    setSelectedArrayList={setSelectedMembers}
                    styles={styles.input}
                    dropDownStyles={styles.dropDownStyles}
                    type="members"
                />
            </Box>
            <Typography sx={styles.inputInfo} variant="h6" component="h2">
                Your teammates will get an email that gives them access to your team.
            </Typography>

            <br />

            <Typography sx={styles.label} variant="h6" component="h2">
                Add to projects &nbsp;
                <CustomPopOver
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
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
export default InviteMembers