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

interface MultiSelectChipDropDownProps {
    placeholder: string;
    options: string[];
    selectedArrayList: string[];
    setSelectedArrayList: (selectedArrayList: string[]) => void;
    styles?: any;
    dropDownStyles?: any;

}

const MultiSelectChipDropDown: FC<MultiSelectChipDropDownProps> = ({
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
                            return <span style={{fontWeight:"light",color:"#A1A1A1"}}>{placeholder}</span>;
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
                        <span style={{fontWeight:"light",color:"#A1A1A1"}}>{placeholder}</span>
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
export default MultiSelectChipDropDown;