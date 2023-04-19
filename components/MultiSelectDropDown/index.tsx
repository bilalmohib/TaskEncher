import * as React from 'react';
import { FC } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

interface MultiSelectDropDownProps {
    placeholder: string;
    options: string[];
    selectedArrayList: string[];
    setSelectedArrayList: (selectedArrayList: string[]) => void;
    styles?: any;
    dropDownStyles?: any;

}

const MultiSelectDropDown: FC<MultiSelectDropDownProps> = ({
    placeholder,
    options,
    selectedArrayList,
    setSelectedArrayList,
    styles,
    dropDownStyles
}) => {
    const theme = useTheme();

    const handleChange = (event: SelectChangeEvent<typeof selectedArrayList>) => {
        const {
            target: { value },
        } = event;
        setSelectedArrayList(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
            <FormControl sx={styles}>
                <Select
                    multiple
                    displayEmpty
                    value={selectedArrayList}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <span>{placeholder}</span>;
                        }

                        return selected.join(', ');
                    }}
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
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem disabled value="">
                        <span>{placeholder}</span>
                    </MenuItem>
                    {options.map((option) => (
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
        </div>
    );
}
export default MultiSelectDropDown;