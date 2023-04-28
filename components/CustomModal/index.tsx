import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InviteMembers from './InviteMembers';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import CustomizeSettings from './CustomizeSettings';

interface CustomModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    modalType: string;
    title: string;
    projects: any;
    projectMembers: string[];

    // Widgets
    widgetsList?: any;
    setWidgetsList?: (value: any) => void;
}

const CustomModal: React.FC<CustomModalProps> = (
    {
        open,
        setOpen,
        modalType,
        title,
        projects,
        projectMembers,

        // Widgets
        widgetsList,
        setWidgetsList,
    }) => {
    const handleClose = () => setOpen(false);

    const styles = {
        modal: {
            position: 'absolute' as 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 560,
            height: "auto",
            bgcolor: '#ffffff',
            borderRadius: 3,
            // boxShadow: 24,
            fontSize: "16px",
        },
        modalHeader: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: "0px 24px",
            height: "64px",
            borderBottom: "1px solid #E5E5E5",
        },
        modalTitle: {
            fontSize: "22px",
            lineHeight: "38px",
            color: "#1E1F21",
            fontWeight: 400,
        },
        modalBody: {
            p: 3,
        }
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={styles.modal}>
                        {/* Modal Header  */}
                        <Box sx={styles.modalHeader}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <Typography sx={styles.modalTitle} variant="h6" component="h2">
                                    {title}
                                </Typography>
                                {/* <Button onClick={handleClose}>X</Button> */}
                                <IconButton sx={{ width: "35px", height: "35px" }} onClick={handleClose} aria-label="Close">
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        </Box>

                        <Box sx={styles.modalBody}>
                            {(modalType === 'inviteMembers') && (
                                <InviteMembers
                                    projects={projects}
                                    projectMembers={projectMembers}
                                />
                            )}

                            {(modalType === 'customize') && (
                                <CustomizeSettings
                                    widgetsList={widgetsList}
                                    setWidgetsList={setWidgetsList}
                                />
                            )}
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
export default CustomModal;