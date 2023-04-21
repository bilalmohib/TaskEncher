import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

interface MultiSelectCustomAutoCompleteProps {
    placeholder: string;
    options?: any;
    selectedArrayList?: any;
    setSelectedArrayList?: any;
    styles?: any;
    dropDownStyles?: any;
    type: string
}

const MultiSelectCustomAutoComplete: FC<MultiSelectCustomAutoCompleteProps> = ({
    placeholder,
    options,
    selectedArrayList,
    setSelectedArrayList,
    styles,
    dropDownStyles,
    type
}) => {

    // ...
    const [updatedOptions, setUpdatedOptions] = useState<any>([]);

    const [lastInput, setLastInput] = useState<string>('');

    const [customOption, setCustomOption] = useState<any>(null);

    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const isValidEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    useEffect(() => {
        const newOptions: any = [];
        for (let i = 0; i < options.length; i++) {
            if (type === "members") {
                newOptions.push(
                    {
                        title: options[i].name,
                        value: options[i].id
                    }
                );
            } else if (type === "projects") {
                newOptions.push(
                    {
                        title: options[i].ProjectName,
                        value: options[i].id
                    }
                );
            }
        }

        if (type === "members" && customOption) {
            if (isValidEmail(customOption.actualTitle) === false) {
                setError(true);
                setErrorMessage("This email address cannot be added. Please enter a valid email address.");
                return;
            } else {
                setError(false);
                setErrorMessage("");
                newOptions.push(customOption);
            }
        }

        setUpdatedOptions(newOptions);
    }, [options, customOption]);

    // Use 'updatedOptions' wherever you need the transformed options
    // ...

    return (
        <Stack spacing={3} sx={(styles) ? (styles) : ({ width: "100%" })} >
            <Autocomplete
                freeSolo={type === "members"}
                onInputChange={(event, value, reason) => {
                    if (type === "members") {
                        if (reason === 'reset') return;

                        if (reason === 'input' && value.trim()) {
                            setLastInput(value.trim());
                            setCustomOption({
                                title: `${value.trim()}`,
                                actualTitle: value.trim(),
                                value: `custom-${Date.now()}`,
                                isCustom: true
                            });
                        } else {
                            setCustomOption(null);
                        }
                    }
                }}


                multiple
                options={updatedOptions}
                sx={(dropDownStyles) ? (
                    dropDownStyles
                ) : ({
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E5E5E5',
                        borderWidth: '1px',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#E5E5E5',
                        borderWidth: '1px',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        // Give the default border color of material ui input
                        borderWidth: '1px',
                    }
                }
                )}
                value={selectedArrayList}
                onChange={(event, value, reason) => {
                    if (error) setError(false);
                    if (value.length > 0) {
                        let latestValue = value[value.length - 1];

                        if (type === "members" && typeof latestValue === 'string') {
                            if (isValidEmail(lastInput)) {
                                const customOption = {
                                    title: lastInput,
                                    value: `custom-${Date.now()}`,
                                };

                                value[value.length - 1] = customOption;
                                latestValue = customOption.value;
                                setError(false);
                            } else {
                                // Remove the invalid value
                                setError(true);
                                setErrorMessage("Please enter a valid email address")
                                alert("Please enter a valid email address")
                                value.pop();
                                return;
                            }
                        } else {
                            latestValue = latestValue.value;
                        }

                        for (let i = 0; i < value.length - 1; i++) {
                            if (latestValue === value[i].value) {
                                return;
                            }
                        }
                        setSelectedArrayList(value);
                    } else {
                        setSelectedArrayList(value);
                    }
                }}

                getOptionLabel={(option: any) => (typeof option === 'string' ? option : option.title)}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                    />
                )}
                renderTags={(value: any[], getTagProps: any) => {
                    return (
                        <>
                            {value.map((option, index) => {
                                return (
                                    <Chip
                                        key={option.id}
                                        label={option.title}
                                        style={{
                                            backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`,
                                            marginRight: '5px',
                                            marginBottom: '5px'
                                        }}
                                        {...getTagProps({ index })}
                                    />
                                )
                            })}
                        </>
                    )
                }}
            />
            {(error && type === "members") && (
                <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>
                    {errorMessage}
                </div>
            )}
        </Stack>
    );
}
export default MultiSelectCustomAutoComplete;