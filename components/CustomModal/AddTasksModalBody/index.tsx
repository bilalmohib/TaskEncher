import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
    Box,
    Button,
    Typography,
    TextField,
    Grid
} from '@mui/material';
import Image from 'next/image';
import dayjs from 'dayjs';

// Importing Components
import CustomPopOver from '@app/components/CustomPopOver';
import MultiSelectCustomAutoComplete from '@app/components/MultiSelectCustomAutoComplete';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import TaskPrioritySelectCustomAutoComplete from '@app/components/TaskPrioritySelectCustomAutoComplete';
import updateTask from '@app/lib/updateTask';
import addTask from '@app/lib/addTask';
import { formatDate } from '@app/lib/dateFormats';
const DatePickerCustom = dynamic(() => import('@app/components/DatePickerCustom'), {
    ssr: false,
});

interface AddTasksModalBodyProps {
    projects: any;
    projectMembers: string[];
    projectSections: string[];
    email: string;
    projectID: string;
    handleClose: () => void;
}

const AddTasksModalBody: React.FC<AddTasksModalBodyProps> = (
    {
        projects,
        projectMembers,
        projectSections,
        email,
        projectID,
        handleClose
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
            borderRadius: 2,
            '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px',
                borderRadius: 2,
                height: "60px"
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px',
                borderRadius: 2,
            },
            '& .MuiInputBase-input': {
                paddingTop: 2,
                paddingBottom: 0,
                lineHeight: "normal",
            },
        },
        inputMultiSelectAutoComplete: {
            width: "100%",
            height: "auto",
            borderRadius: 2,
            '& .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px !important',
                borderRadius: 2,
                height: "auto !important",
                maxHeight: "auto !important"
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderRadius: 2,
                borderWidth: '2px !important',
            },
            '& .MuiInputBase-input': {
                paddingTop: 1.5,
                // borderWidth: '1px !important',
                paddingBottom: 0,
                lineHeight: "normal",
                borderWidth: '2px !important',
            },
        },
        dropDownStyles: {
            '& .MuiOutlinedInput-notchedOutline': {
                // borderColor: '#E5E5E5',
                borderWidth: '2px',
                borderRadius: 2,
                // border:"1px solid red",
                marginBottom: "0px"
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                // borderColor: '#E5E5E5',
                borderWidth: '2px',
                borderRadius: 2
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                // Give the default border color of material ui input
                borderWidth: '2px',
                borderRadius: 2
            },
            '& .MuiInputBase-input': {
                paddingTop: 1.5,
                paddingBottom: 0,
                lineHeight: "normal",
            }
        },
        datePickerStyles: {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E5E5E5',
                borderWidth: '1px',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px',
                borderRadius: 2,
            }
        },
        error: {
            color: 'red',
            fontSize: '0.8rem',
            marginTop: '4px'
        }
    }

    // @1 Task Name 
    const [taskName, setTaskName] = React.useState<string>("");

    // Error for task name
    const [taskNameError, setTaskNameError] = React.useState<boolean>(false);
    // Handling Change
    const handleTaskNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (taskNameError) {
            setTaskNameError(false);
        }
        setTaskName(event.target.value);
    };

    // Selected Members
    const [selectedMembers, setSelectedMembers] = React.useState<string[]>([]);

    // Error for selected members
    const [selectedMembersError, setSelectedMembersError] = React.useState<boolean>(false);

    // Selected Priority
    const [selectedProjectPriority, setSelectedProjectPriority] = React.useState<any>(null);

    // Selected Section
    const [selectedProjectSection, setSelectedProjectSection] = React.useState<any>(null);

    let currentDateTime = dayjs();

    // Selected Due Date    
    const [taskDueDate, setTaskDueDate] = React.useState<any>(currentDateTime);
    // Error 
    const [taskDueDateError, setTaskDueDateError] = React.useState<boolean>(false);
    // Error Mesaage
    const [taskDueDateErrorMessage, setTaskDueDateErrorMessage] = React.useState<string>("");

    // Error for selected priority
    const [taskPriorityError, setTaskPriorityError] = React.useState<boolean>(false);

    // For popover
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [anchorEl1, setAnchorEl1] = React.useState<HTMLElement | null>(null);
    const [anchorEl2, setAnchorEl2] = React.useState<HTMLElement | null>(null);
    const [anchorEl3, setAnchorEl3] = React.useState<HTMLElement | null>(null);
    const [anchorEl4, setAnchorEl4] = React.useState<HTMLElement | null>(null);
    // For popover

    // To get the value of the selected member
    useEffect(() => {
        console.log("selectedMembers", selectedMembers);
    }, [selectedMembers]);

    const [modifiedProjectMembers, setModifiedProjectMembers] = React.useState<any>([]);

    const [modifiedProjectSections, setModifiedProjectSections] = React.useState<any>([]);

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

    const colorsArray = [
        '#FF5733',
        '#FFBD33',
        '#DBFF33',
        '#75FF33',
        '#33FF57',
        '#33FFBD',
        '#33DBFF',
        '#3375FF',
        '#5733FF',
        '#BD33FF',
        '#FF33DB',
        '#FF3375',
    ];

    function getRandomColor(colors: string[]) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    // Modify the projectSections array and make it an array of objects such that it contains the name
    // and the id of the section
    useEffect(() => {
        const localModifiedProjectSections = projectSections.map((section: string) => {
            return {
                id: Math.floor(Math.random() * 1000),
                name: section,
                color: getRandomColor(colorsArray)
            }
        });
        console.log("localModifiedProjectSections", localModifiedProjectSections);

        setModifiedProjectSections(localModifiedProjectSections);

    }, [projectSections]);

    interface ProjectPriority {
        id: number;
        name: string;
        color: string;
    }

    let projectPriority: ProjectPriority[] = [
        {
            id: 1,
            name: "High",
            color: "#FF0000"
        },
        {
            id: 2,
            name: "Medium",
            color: "#FFA500"
        },
        {
            id: 3,
            name: "Low",
            color: "#008000"
        }
    ];

    // Handle submit 
    const handleSubmit = () => {
        if (taskName === "") {
            setTaskNameError(true);
            return;
        }
        if (selectedProjectPriority === null) {
            setTaskPriorityError(true);
            return;
        }
        if (selectedMembers.length === 0) {
            setSelectedMembersError(true);
            return;
        }
        if (selectedProjectSection === null) {
            setSelectedProjectSection(true);
            return;
        }
        if (currentDateTime > taskDueDate) {
            setTaskDueDateError(true);
            setTaskDueDateErrorMessage("Due date cannot be in the past");
            return;
        }

        if (taskName !== "" &&
            selectedProjectPriority !== null &&
            selectedMembers.length !== 0 &&
            selectedProjectSection !== null &&
            currentDateTime <= taskDueDate
        ) {

            // Extract only emails from the selected members
            let selectedMemberEmailList: string[] = [];
            selectedMembers.forEach((member: any) => {
                selectedMemberEmailList.push(member.title);
            });

            let formattedDate = formatDate(taskDueDate?.toString());

            let taskOBJ = {
                "taskName": taskName,
                "taskPriority": selectedProjectPriority.name,
                "taskAssignee": selectedMemberEmailList,
                "taskSection": selectedProjectSection.name,
                "taskDue": formattedDate
            };

            addTask(
                taskOBJ,
                email,
                projectID,
                projects
            );

            setTaskName("");
            setSelectedProjectPriority(null);
            setSelectedMembers([]);
            setSelectedProjectSection(null);
            setTaskDueDate(currentDateTime);

            setTaskNameError(false);
            setTaskPriorityError(false);
            setSelectedMembersError(false);
            setTaskDueDateError(false);

            handleClose();
        }
    }

    return (
        <Box
            sx={{
                // border: "1px solid red",
                height: "550px",
                overflowY: "auto"
            }}
        >
            <Typography sx={styles.label} variant="h6" component="h2">
                Task Name &nbsp;
                <CustomPopOver
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    iconColor='red'
                    title="Task Name is Required"
                />
            </Typography>
            <Grid container spacing={2} sx={{ mt: "-5px", mb: "12px" }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        sx={styles.input}
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Enter the Task Name"
                        value={taskName}
                        onChange={handleTaskNameChange}
                        error={taskNameError}
                    />

                    {taskNameError && (
                        <Typography
                            sx={{
                                color: 'red',
                                fontSize: '0.8rem',
                                marginTop: '14px'
                            }}
                            variant="body2"
                            component="p"
                        >
                            Task Name is required
                        </Typography>
                    )}
                </Grid>
            </Grid>

            <br />

            <Typography sx={styles.label} variant="h6" component="h2">
                Task Assigned To: &nbsp;
                <CustomPopOver
                    anchorEl={anchorEl1}
                    setAnchorEl={setAnchorEl1}
                    iconColor='red'
                    title="Task Assigned To is required"
                />
            </Typography>

            <Grid container spacing={2} sx={{ mt: "0px" }}>
                <Grid item xs={12} sm={6}>
                    <MultiSelectCustomAutoComplete
                        placeholder="Enter the Task Assigned To : e.g. user@gmail.com ..."
                        options={modifiedProjectMembers}
                        selectedArrayList={selectedMembers}
                        setSelectedArrayList={setSelectedMembers}
                        styles={styles.inputMultiSelectAutoComplete}
                        dropDownStyles={styles.dropDownStyles}
                        type="members"
                        error={selectedMembersError}
                        setError={setSelectedMembersError}
                    />

                    {selectedMembersError && (
                        <Typography sx={styles.error} variant="body2" component="p">
                            Task Assigned To is required
                        </Typography>
                    )}
                </Grid>
            </Grid>

            <br />

            <Typography sx={styles.label} variant="h6" component="h2">
                Task Priority: &nbsp;
                <CustomPopOver
                    anchorEl={anchorEl2}
                    setAnchorEl={setAnchorEl2}
                    iconColor='red'
                    title="Task Priority is required. Three options are available: High, Medium, Low"
                />
            </Typography>

            <Grid container spacing={2} sx={{ mt: "0px" }}>
                <Grid item xs={12} sm={6}>
                    <TaskPrioritySelectCustomAutoComplete
                        placeholder="Enter the Task Priority : e.g. High, Medium, Low ..."
                        options={projectPriority}
                        selectedValue={selectedProjectPriority}
                        setSelectedValue={setSelectedProjectPriority}
                        styles={styles.inputMultiSelectAutoComplete}
                        dropDownStyles={styles.dropDownStyles}
                        error={taskPriorityError}
                        setError={setTaskPriorityError}
                    />
                </Grid>
            </Grid>

            <br />

            <Typography sx={styles.label} variant="h6" component="h2">
                Task Section: &nbsp;
                <CustomPopOver
                    anchorEl={anchorEl3}
                    setAnchorEl={setAnchorEl3}
                    iconColor='red'
                    title="Task Section is required. Choose A Task Section from the project task sections. Below is the list"
                />
            </Typography>

            <Grid container spacing={2} sx={{ mt: "0px" }}>
                <Grid item xs={12} sm={6}>
                    <TaskPrioritySelectCustomAutoComplete
                        placeholder="Enter the Task Section : e.g. Design, Development, Testing ..."
                        options={modifiedProjectSections}
                        selectedValue={selectedProjectSection}
                        setSelectedValue={setSelectedProjectSection}
                        styles={styles.inputMultiSelectAutoComplete}
                        dropDownStyles={styles.dropDownStyles}
                        error={taskPriorityError}
                        setError={setTaskPriorityError}
                    />
                </Grid>
            </Grid>

            <br />

            <Typography sx={styles.label} variant="h6" component="h2">
                Task Due Date: &nbsp;
                <CustomPopOver
                    anchorEl={anchorEl4}
                    setAnchorEl={setAnchorEl4}
                    iconColor='red'
                    title="Task Due Date is required. Choose a date from the date picker below"
                />
            </Typography>

            <Grid container spacing={2} sx={{ mt: "0px" }}>
                <Grid item xs={12} sm={6}>
                    <DatePickerCustom
                        value={taskDueDate}
                        setValue={setTaskDueDate}
                        // label='Task Due Date'
                        datePickerStyles={styles.datePickerStyles}
                        error={taskDueDateError}
                        setError={setTaskDueDateError}
                        errorMessage={taskDueDateErrorMessage}
                        setErrorMessage={setTaskDueDateErrorMessage}
                    />
                </Grid>
            </Grid>

            <Box
                sx={{
                    mt: "40px",
                    mb: "5px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "right"
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        width: "150px",
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
                    title={(taskName === "" || selectedProjectPriority === null || selectedMembers.length === 0 || selectedProjectSection === null || currentDateTime > taskDueDate) ? "Please fill all the required fields" : "Add Task"}
                    disabled={(taskName === "" || selectedProjectPriority === null || selectedMembers.length === 0 || selectedProjectSection === null || currentDateTime > taskDueDate)}
                    onClick={handleSubmit}
                >
                    Add Task
                </Button>

                {(
                    taskName === "" ||
                    selectedProjectPriority === null ||
                    selectedMembers.length === 0 ||
                    selectedProjectSection === null ||
                    currentDateTime > taskDueDate
                ) ? (
                    <Typography
                        sx={{
                            color: 'red',
                            fontSize: '0.8rem',
                            marginTop: '14px',
                            marginLeft: '10px'
                        }}
                        variant="body2"
                        component="p"
                    >
                        Please fill all the required fields to add a task
                    </Typography>
                ) : <Typography
                    sx={{
                        color: 'green',
                        fontSize: '0.8rem',
                        marginTop: '14px',
                        marginLeft: '10px'
                    }}
                    variant="body2"
                    component="p"
                >
                    All the required fields are filled
                </Typography>
                }
            </Box>
        </Box>
    )
}
export default AddTasksModalBody;