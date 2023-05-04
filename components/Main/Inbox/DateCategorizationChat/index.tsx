import React, { FC } from 'react';
import { Box, Typography } from '@mui/material'

const formatDate = (dateString: any) => {
    // alert(dateString);
    // const date = new Date(dateString);
    // const today = new Date();
    // const yesterday = new Date();
    // yesterday.setDate(today.getDate() - 1);

    // if (date.toDateString() === today.toDateString()) {
    //     return 'Today';
    // } else if (date.toDateString() === yesterday.toDateString()) {
    //     return 'Yesterday';
    // } else {
    //     return date.toLocaleDateString();
    // }
    return dateString;
};

// Date Categorization Component
interface DateCategorizationChatProps {
    messageDate: string;
    showDate: boolean;
}

const DateCategorizationChat: React.FC<DateCategorizationChatProps> = ({
    messageDate,
    showDate
}) => {
    const formattedDate = formatDate(messageDate);

    return (
        <>
            {showDate && (
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    marginBottom: '30px',
                }}>
                    <Box sx={{
                        // borderBottom: "1px solid black",
                        width: "45%"
                    }}>
                    </Box>
                    <Typography sx={{
                        width: "10%",
                        textAlign: "center",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    >
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100px',
                            height: '50px',
                            backgroundColor: '#EDEDED',
                            color: '#727272',
                            borderRadius: '10px',
                            marginTop: '10px',
                            marginBottom: '-25px',
                            padding: '10px',
                        }}
                        >
                           {formattedDate}
                        </Box>

                    </Typography>
                    <Box
                        sx={{
                            // borderBottom: "1px solid black",
                            width: "45%"
                        }}>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default DateCategorizationChat;