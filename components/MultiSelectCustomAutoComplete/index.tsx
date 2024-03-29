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
    type: string,
    error?: boolean;
    setError?: (value: boolean) => void;
}

const MultiSelectCustomAutoComplete: FC<MultiSelectCustomAutoCompleteProps> = ({
    placeholder,
    options,
    selectedArrayList,
    setSelectedArrayList,
    styles,
    dropDownStyles,
    type,
    error,
    setError
}) => {

    // ...
    const [updatedOptions, setUpdatedOptions] = useState<any>([]);

    const [lastInput, setLastInput] = useState<string>('');

    const [customOption, setCustomOption] = useState<any>(null);

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
                // @ts-ignore
                setError(true);
                setErrorMessage("This email address cannot be added. Please enter a valid email address.");
                return;
            } else {
                // @ts-ignore
                setError(false);
                setErrorMessage("");
                newOptions.push(customOption);
            }
        }

        setUpdatedOptions(newOptions);
    }, [options, customOption]);

    const handleOnChange = (event: any, value: any, reason: any) => {
        // @ts-ignore
        if (error) setError(false);
        if (value.length > 0) {
            let latestValue = value[value.length - 1];

            if (type === "members" && typeof latestValue === 'string') {
                if (isValidEmail(latestValue)) {
                    const customOption = {
                        title: latestValue,
                        value: `custom-${Date.now()}`,
                    };

                    value[value.length - 1] = customOption;
                    setSelectedArrayList(value);
                    // @ts-ignore
                    setError(false);
                } else {
                    // Remove the invalid value
                    // @ts-ignore
                    setError(true);
                    setErrorMessage("Please enter a valid email address")
                    alert("Please enter a valid email address")
                    value.pop();
                    return;
                }
            } else {
                setSelectedArrayList(value);
            }
        } else {
            setSelectedArrayList(value);
        }
    };

    // Use 'updatedOptions' wherever you need the transformed options
    // ...

    return (
        <Stack spacing={3} sx={(styles) ? (styles) : ({ width: "100%" })} >
            <Autocomplete
                freeSolo={type === "members"}
                onInputChange={(event: any, value: any, reason: any) => {
                    if (type === "members") {
                        if (reason === 'reset') return;
                        if (reason === 'input' && value.trim()) {
                            setLastInput(value.trim());
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
                onChange={handleOnChange}
                getOptionLabel={(option: any) => (typeof option === 'string' ? option : option.title)}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        error={error}
                        placeholder={placeholder}
                        onChange={
                            (event: any) => {
                                if (type === "members") {
                                    if (event.target.value.trim()) {
                                        setLastInput(event.target.value.trim());
                                    }
                                }
                            }
                        }
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
                                        marginBottom: '5px',
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