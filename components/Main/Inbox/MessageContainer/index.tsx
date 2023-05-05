import React from 'react';
import { Box, Tooltip } from '@mui/material';
import styles from './style.module.css';
import DateCategorizationChat from '../DateCategorizationChat';

interface MessageContainerProps {
    editedMessageId: number,
    userName: string,
    timeSent: string,
    message: string,
    id: string,
    userPic: string,
    type: string,
}

const MessageContainer: React.FC<MessageContainerProps> = ({
    editedMessageId,
    userName,
    timeSent,
    message,
    userPic,
    id,
    type,
}) => {
    console.log("the user pictuyre ==> " + userPic)
    return (
        <Box
            sx={{
                marginLeft: '5px',
                boxShadow: 'none'
            }}
        >
            {/* <DateCategorizationChat
                messageDate={new Date(timeSent).toDateString()}
                showDate={true}
            /> */}
            <div style={{ display: 'flex' }}>
                <Box className="d-flex justify-content-start" sx={{ boxShadow: 'none' }}>
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
            <Tooltip title={timeSent} placement="top">
                <div style={{
                    backgroundColor:
                        (type === "sent") ? (
                            '#058760'
                        ) : (type === "received") ? (
                            '#055587'
                        ) : (""),
                    borderRadius: '10px',
                    width: 'fit-content',
                    maxWidth: '80%',
                    paddingRight: '10px',
                    marginLeft: '10px',
                }}
                >
                    <p style={{ paddingTop: '10px', paddingBottom: '10px' }} className={styles.Middlemessage}>
                        {message}
                    </p>
                </div>
            </Tooltip>
        </Box>
    )
}
export default MessageContainer;