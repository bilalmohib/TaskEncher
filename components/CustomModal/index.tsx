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
import AddTasksModalBody from './AddTasksModalBody';
import Draggable from 'react-draggable';

interface CustomModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    modalType: string;
    title: string;
    projects: any;
    projectMembers: string[];
    // Project Sections
    projectSections?: any;

    email?: string;
    projectID?: string;

    // Widgets
    widgetsList?: any;
    setWidgetsList?: (value: any) => void;

    // Background Image
    selectedBackgroundImage?: string;
    setSelectedBackgroundImage?: (value: string) => void;
}

const CustomModal: React.FC<CustomModalProps> = (
    {
        open,
        setOpen,
        modalType,
        title,
        projects,
        projectMembers,
        projectSections,
        // Email
        email,
        projectID,

        // Widgets
        widgetsList,
        setWidgetsList,

        // Background Image
        selectedBackgroundImage,
        setSelectedBackgroundImage,
    }) => {

    const handleClose = () => setOpen(false);

    const [isDragging, setIsDragging] = React.useState(false);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragStop = () => {
        setIsDragging(false);
    };

    const styles = {
        modal: {
            // position: 'absolute' as 'absolute',
            // top: '50%',
            // left: '50%',
            // transform: 'translate(-50%, -50%)',
            width: 1060,
            height: "auto",
            maxHeight: "700px",
            minHeight: "600px",
            bgcolor: '#ffffff',
            borderRadius: 3,
            // boxShadow: 24,
            fontSize: "16px",
            cursor: isDragging ? "grabbing" : 'grab'
        },
        modalOuter: {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1060,
            height: "700px",
            bgcolor: 'transparent',
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
                <Box sx={styles.modalOuter}>
                    <Draggable onStart={handleDragStart} onStop={handleDragStop}>
                        <Box>
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
                                                // @ts-ignore
                                                projectID={projectID}
                                            />
                                        )}

                                        {(modalType === 'customize') && (
                                            <CustomizeSettings
                                                widgetsList={widgetsList}
                                                setWidgetsList={setWidgetsList}

                                                // Background Image
                                                selectedBackgroundImage={selectedBackgroundImage}
                                                setSelectedBackgroundImage={setSelectedBackgroundImage}
                                            />
                                        )}

                                        {(modalType === 'addTasks') && (
                                            <AddTasksModalBody
                                                projects={projects}
                                                projectMembers={projectMembers}
                                                projectSections={projectSections}
                                                // @ts-ignore
                                                email={email}
                                                // @ts-ignore
                                                projectID={projectID}

                                                handleClose={handleClose}
                                            />
                                        )}
                                    </Box>
                                </Box>
                            </Fade>
                        </Box>
                    </Draggable>
                </Box>
            </Modal>
        </div>
    );
}
export default CustomModal;