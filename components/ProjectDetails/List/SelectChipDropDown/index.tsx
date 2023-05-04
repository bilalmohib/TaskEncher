import * as React from 'react';
import { FC } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { enqueueSnackbar } from 'notistack';

import {
    doc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: string, selectedUsers: readonly string[], theme: Theme) {
    return {
        fontWeight:
            selectedUsers.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

interface SelectChipDropDownProps {
    placeholder: string;
    options: string[];
    selectedArrayList: string[];
    projects: any;
    styles?: any;
    dropDownStyles?: any;
    projectID: string;
    email: string;
    taskId: number;
    type: string;
}

const SelectChipDropDown: FC<SelectChipDropDownProps> = ({
    placeholder,
    options,
    selectedArrayList,
    projects,
    styles,
    dropDownStyles,
    projectID,
    email,
    taskId,
    type
}) => {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof selectedArrayList>) => {
        const {
            target: { value },
        } = event;

        if (type === "taskPriority") {
            const newTaskPriorityList = (typeof value === 'string' ? value.split(',') : value);
            updateTaskAssigneeList(taskId, newTaskPriorityList);

            console.log("newTaskPriorityList: ", newTaskPriorityList);
        }
        if (type === "taskSection") {
            const newTaskSectionList = (typeof value === 'string' ? value.split(',') : value);
            updateTaskSectionList(taskId, newTaskSectionList);

            console.log("newTaskSectionList: ", newTaskSectionList);
        }
    };

    const updateTaskAssigneeList = async (taskId: number, newTaskPriority: string[]) => {
        const db = getFirestore();
        const projectRef = doc(db, "Projects", projectID);

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === projectID.toString()) {
                projects[i].ProjectTasks[taskId].taskPriority = newTaskPriority[0];
                const updatedProject = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);
                    let message: string = "Task Priority has been updated successfully";
                    console.log(message);
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'success',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                } catch (error: any) {
                    console.error("Error updating task priority:", error?.message);
                }
                break;
            }
        }
    };

    const updateTaskSectionList = async (taskId: number, newTaskSection: string[]) => {
        const db = getFirestore();
        const projectRef = doc(db, "Projects", projectID);

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === projectID.toString()) {
                projects[i].ProjectTasks[taskId].taskSection = newTaskSection[0];
                const updatedProject = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);
                    let message: string = `Task Section has been updated to ${newTaskSection[0]} successfully`
                    console.log(message);
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'success',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                } catch (error: any) {
                    console.error("Error updating task section:", error?.message);
                }
                break;
            }
        }
    };

    return (
        <div>
            <FormControl
                role="button"
                sx={styles}>
                <Select
                    displayEmpty
                    value={selectedArrayList}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <span style={{ fontWeight: "light", color: "#A1A1A1" }}>{placeholder}</span>;
                        }
                        return (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value: any) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )
                    }}
                    sx={(dropDownStyles) ? (
                        dropDownStyles
                    ) : ({
                        paddingLeft: '3px',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#E5E5E5',
                            borderWidth: '0px',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#E5E5E5',
                            borderWidth: '0px',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            // Give the default border color of material ui input
                            borderWidth: '0px',
                        },
                        cursor: 'pointer',
                        // border:"1px solid red"
                        // '& .MuiOutlinedInput-notchedOutline': {
                        //     border: 'none',
                        //   },
                        //   '&:hover .MuiOutlinedInput-notchedOutline': {
                        //     border: 'none',
                        //   },
                        //   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        //     // Give the default border color of material ui input
                        //     borderWidth: '1px',
                        //   }
                    }
                    )}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem disabled value="">
                        <span style={{ fontWeight: "light", color: "#A1A1A1" }}>{placeholder}</span>
                    </MenuItem>
                    {options.map((option: string) => (
                        <MenuItem
                            key={option}
                            value={option}
                            style={getStyles(option, selectedArrayList, theme)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div >
    );
}
export default SelectChipDropDown;