import * as React from 'react';
import { FC } from 'react';
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

}

const MultiSelectCustomAutoComplete: FC<MultiSelectCustomAutoCompleteProps> = ({
    placeholder,
    options,
    selectedArrayList,
    setSelectedArrayList,
    styles,
    dropDownStyles
}) => {
    return (
        <Stack spacing={3} sx={(styles) ? (styles) : ({ width: "100%" })} >
            <Autocomplete
                multiple
                options={options}
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
                onChange={(event, value) => {
                    if (value !== null) {
                        // Make a new array to extract the last element of the array and store in new array. Note it shold be a new array 
                        // Not a invididual element of the array

                        let newArray = value.slice(0, value.length - 1);

                        let latestValue = value[value.length - 1].value;
                        console.log('Array new', newArray);
                        console.log('Latest value', latestValue);

                        for (let i = 0; i < newArray.length; i++) {
                            if (latestValue === newArray[i].value) {
                                console.log('same', newArray[i].value);
                                return;
                            }
                        }
                        setSelectedArrayList(value);
                    } else {
                        setSelectedArrayList(value);
                    }
                }}
                getOptionLabel={(option: any) => option.title}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                    />
                )}
                renderTags={(value: any[], getTagProps: any) =>
                    value.map((option, index) => (
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
                    ))
                }
            />
        </Stack>
    );
}
export default MultiSelectCustomAutoComplete;