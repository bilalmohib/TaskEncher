import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

interface TaskPrioritySelectCustomAutoCompleteProps {
    placeholder: string;
    options: any;
    selectedValue: any;
    setSelectedValue: any;
    styles?: any;
    dropDownStyles?: any;
    error?: boolean;
    setError: (value: boolean) => void;
}

const TaskPrioritySelectCustomAutoComplete: FC<TaskPrioritySelectCustomAutoCompleteProps> = ({
    placeholder,
    options,
    selectedValue,
    setSelectedValue,
    styles,
    dropDownStyles,
    error,
    setError
}) => {

    const defaultProps = {
        options: options,
        getOptionLabel: (option: any) => option.name,
    };

    return (
        <Stack spacing={3} sx={(styles) ? (styles) : ({ width: "100%" })}>
            <Autocomplete
                {...defaultProps}
                id="auto-highlight"
                sx={(dropDownStyles) ? (dropDownStyles) : ({
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E5E5E5',
                        borderWidth: '1px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E5E5E5',
                        borderWidth: '1px',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px',
                    }
                })}
                autoHighlight
                value={selectedValue}
                onChange={(event: any, newValue: any) => {
                    if (error) setError(false);
                    setSelectedValue(newValue);
                }}
                renderOption={(props, option, { selected }) => (
                    <li
                        {...props}
                        style={{
                            backgroundColor: option.color,
                            borderRadius: '4px',
                            padding: '4px 8px',
                            color: 'white',
                            marginTop: '4px',
                            marginBottom: '0px',
                            fontSize: '1.2rem',
                        }}
                    >
                        {option.name}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="" variant="outlined"
                        placeholder={placeholder}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <Chip
                                    label={selectedValue ? selectedValue.name : ''}
                                    style={{
                                        backgroundColor: selectedValue ? selectedValue.color : 'transparent',
                                        color: selectedValue ? 'white' : 'inherit',
                                        borderRadius: '4px',
                                        marginRight: (selectedValue ? '8px' : '-20px'),
                                        padding: (selectedValue ? '4px 8px' : '-20px'),
                                    }}
                                />
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#E5E5E5',
                                borderWidth: '1px',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#E5E5E5',
                                borderWidth: '1px',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderWidth: '1px',
                            }
                        }}
                    />
                )}
            />
            {(error) && (
                <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>
                    Please select a priority
                </div>
            )}
        </Stack>
    );
}
export default TaskPrioritySelectCustomAutoComplete;
