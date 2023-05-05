import React from 'react';
import { Box, Tooltip } from '@mui/material';
import Image from 'next/image';
import DateCategorizationChat from '../DateCategorizationChat';

import styles from './style.module.css';
interface MessageContainerProps {
    editedMessageId: number,
    userName: string,
    timeSent: string,
    message: string,
    id: string,
    userPic: string,
    type: string,
    messageType: string
}

const MessageContainer: React.FC<MessageContainerProps> = ({
    editedMessageId,
    userName,
    timeSent,
    message,
    userPic,
    id,
    type,
    messageType
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
                <div>
                    {(messageType === 'text') && (
                        <div
                            style={{
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
                    )}
                    {(messageType === 'file') && (
                        <div
                            style={{
                                backgroundColor: "transparent",
                                borderRadius: '10px',
                                width: 'fit-content',
                                maxWidth: '80%',
                                marginLeft: '10px',
                                // border: "1px solid red"
                            }}
                        >
                            <Image
                                src={message}
                                alt={`Image sent by user ${userName}`}
                                title={`Image sent by user ${userName}`}
                                width={500}
                                height={300}
                                style={{
                                    height: 'auto !important',
                                    width: 'auto !important',
                                    borderRadius: '10px',
                                }}
                                loading='eager'
                            />
                        </div>
                    )}
                </div>
            </Tooltip>
        </Box>
    )
}
export default MessageContainer;