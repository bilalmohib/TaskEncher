import React from 'react'
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

    // const projectMembers = [
    //     "bialmohib7896@gmail.com",
    //     "mbilals9922@gmail.com",
    //     "2019cs682@gmail.com",
    //     "harisyounas@gmail.com"
    // ];

    const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);

    const [selectedProjects, setSelectedProjects] = React.useState<string[]>([]);

    // For popover
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    // const computerScienceProjects = [
    //     {
    //         title: "Daraz Shopping App",
    //         // Remove spaces from title and make it lowercase
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "darazshoppingapp"
    //     },
    //     {
    //         title: "Ecommerce Shopping App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "ecommerceshoppingapp"
    //     },
    //     {
    //         title: "Covid-19 Tracker App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "covid19trackerapp"
    //     },
    //     {
    //         title: "Social Media App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "socialmediaapp"
    //     },
    //     {
    //         title: "Food Delivery App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "fooddeliveryapp"
    //     },
    //     {
    //         title: "Uber Clone App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "ubercloneapp"
    //     },
    //     {
    //         title: "Netflix Clone App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "netflixcloneapp"
    //     },
    //     {
    //         title: "Tinder Clone App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "tindercloneapp"
    //     },
    //     {
    //         title: "Instagram Clone App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "instagramcloneapp"
    //     },
    //     {
    //         title: "Facebook Clone App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "facebookcloneapp"
    //     },
    //     {
    //         title: "Twitter Clone App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "twittercloneapp"
    //     },
    //     {
    //         title: "Whatsapp Clone App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "whatsappcloneapp"
    //     },
    //     {
    //         title: "Youtube Clone App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "youtubecloneapp"

    //     },
    //     {
    //         title: "Google Clone App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "googlecloneapp"
    //     },
    //     {
    //         title: "Amazon Clone App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "amazoncloneapp"
    //     },
    //     {
    //         title: "Computer Vision App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "computervisionapp"
    //     },
    //     {
    //         title: "Attendance Management App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "attendancemanagementapp"
    //     },
    //     {
    //         title: "Ball Tracking App",
    //         // value: title.replace(/\s+/g, '').toLowerCase()
    //         value: "balltrackingapp"
    //     }
    // ];

    return (
        <Box>
            <Typography sx={styles.label} variant="h6" component="h2">
                Email addresses
            </Typography>
            <Box sx={{ mt: "8px" }}>
                {/* <MultiSelectDropDown
                    placeholder="name@company.com , name@company.com"
                    options={projectMembers}
                    selectedArrayList={selectedMembers}
                    setSelectedArrayList={setSelectedMembers}
                    styles={styles.input}
                    dropDownStyles={styles.dropDownStyles}
                /> */}
                <MultiSelectChipDropDown
                    placeholder="name@company.com , name@company.com"
                    options={projectMembers}
                    selectedArrayList={selectedMembers}
                    setSelectedArrayList={setSelectedMembers}
                    styles={styles.input}
                    dropDownStyles={styles.dropDownStyles}
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
                {/* <MultiSelectChipDropDown
                    placeholder="Start typing to add projects"
                    options={projectMembers}
                    selectedArrayList={selectedMembers}
                    setSelectedArrayList={setSelectedMembers}
                    styles={styles.input}
                    dropDownStyles={styles.dropDownStyles}
                /> */}
                <MultiSelectCustomAutoComplete
                    placeholder="Start typing to add projects"
                    options={projects}
                    selectedArrayList={selectedProjects}
                    setSelectedArrayList={setSelectedProjects}
                    styles={styles.input}
                    dropDownStyles={styles.dropDownStyles}
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
                >
                    Send
                </Button>
            </Box>
        </Box>
    )
}
export default InviteMembers