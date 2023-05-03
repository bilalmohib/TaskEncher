import React from 'react';
import { Box } from '@mui/material';
import styles from './style.module.css';

interface MessageContainerProps {
    editedMessageId: number,
    userName: string,
    timeSent: string,
    message: string,
    id: string,
    userPic: string
}

const MessageContainer: React.FC<MessageContainerProps> = ({
    editedMessageId,
    userName,
    timeSent,
    message,
    userPic,
    id
}) => {
    console.log("the user pictuyre ==> " + userPic)
    return (
        <Box
            sx={{
                marginLeft: '5px',
                boxShadow: 'none'
            }}
        >
            <div style={{display: 'flex'}}>
            <Box className="d-flex justify-content-start" sx={{boxShadow:'none'}}>
                <h3
                    className={styles.MiddleheaderTitle}
                    style={{
                        fontWeight: 'bold',
                        color: 'black'
                    }}>
                                                    {/* <img src={userPic} alt="" /> */}
                    {userName}
                </h3>
            </Box>
            <p
                    className={styles.MiddleheaderTitle}
                    style={{
                        fontSize: '12px',
                    }}>
                    {timeSent} {
                        (editedMessageId.toString() === id) ? (
                            <span style={{
                                color: '#008AD1', 
                                fontWeight: 'lighter',
                            }}>
                                Edited
                            </span>
                        ) : (
                            <></>
                        )
                    }
                </p>
            </div>
            <div style={{backgroundColor: '#F0F0F0', borderRadius: '10px'}}>
            <p style={{paddingTop: '10px', paddingBottom: '10px'}} className={styles.Middlemessage}>
                {message}
            </p>
            </div>
        </Box>
    )
}
export default MessageContainer;