import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
    Box,
    TextField,
    Typography,
} from '@mui/material';

interface DatePickerCustomProps {
    value: any;
    setValue: (value: any) => void;
    label?: string;
    error: boolean;
    setError: (value: boolean) => void;
    datePickerStyles?: any;

    errorMessage?: string;
    setErrorMessage?: (value: string) => void;
}

const DatePickerCustom: React.FC<DatePickerCustomProps> = ({
    value,
    setValue,
    label,
    error,
    setError,
    datePickerStyles,
    errorMessage,
    setErrorMessage
}) => {

    let currentDateTime = dayjs();

    return (
        <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                        label={(label) ? (label) : ("")}
                        value={value}
                        onChange={(newValue) => {
                            if (error) {
                                setError(false);
                                //@ts-ignore
                                setErrorMessage("");
                            }
                            setValue(newValue);
                        }}
                        sx={(datePickerStyles) ? (datePickerStyles) : ({
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#E5E5E5',
                                borderWidth: '1px',

                            }
                        }
                        )}
                    />
                </DemoContainer>
            </LocalizationProvider>

            {(error) ? (
                <Typography
                    variant="caption"
                    sx={{
                        color: '#FF0000',
                        marginTop: '5px',
                        display: 'block'
                    }}
                >
                    {(errorMessage) ? (errorMessage) : ("Please select a due date.")}
                </Typography>
            ) : null}
        </Box>
    );
}
export default DatePickerCustom;