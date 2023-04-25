import React from 'react';
import { Box } from '@mui/material';
import styles from './style.module.css';

interface MessageContainerProps {
    editedMessageId: number,
    userName: string,
    timeSent: string,
    message: string,
    id: string
}

const MessageContainer: React.FC<MessageContainerProps> = ({
    editedMessageId,
    userName,
    timeSent,
    message,
    id
}) => {
    return (
        <Box
            sx={{
                marginLeft: '5px',
            }}
        >
            <Box className="d-flex justify-content-start">
                <h3
                    className={styles.MiddleheaderTitle}
                    style={{
                        fontWeight: 'bold',
                    }}>
                    {userName}
                </h3>
                <p
                    className={styles.MiddleheaderTitle}
                    style={{
                        fontSize: '12px',
                    }}>
                    {timeSent} {
                        (editedMessageId.toString() === id) ? (
                            <span style={{
                                color: '#000',
                                fontWeight: 'lighter',
                            }}>
                                Edited
                            </span>
                        ) : (
                            <></>
                        )
                    }
                </p>
            </Box>
            <p className={styles.Middlemessage}>
                {message}
            </p>
        </Box>
    )
}
export default MessageContainer;