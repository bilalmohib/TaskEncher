import React, { useState, useEffect, useRef } from 'react';

import Overview from '@app/components/ProjectDetails/Overview';
import HeaderProjectDetails from '@app/components/HeaderProjectDetails';
import List from '@app/components/ProjectDetails/List';
import Board from '@app/components/ProjectDetails/Board';
import Timeline from '@app/components/ProjectDetails/Timeline';
import Calender from '@app/components/ProjectDetails/Calender';
import Workflow from '@app/components/ProjectDetails/Workflow';
import Dashboard from '@app/components/ProjectDetails/Dashboard';
import Messages from '@app/components/ProjectDetails/Messages';
import Files from '@app/components/ProjectDetails/Files';
import CustomLoader from '@app/components/CustomLoader';

import styles from './styles.module.css';

interface ProjectDetailsInsideProps {
    projectID: any;
    projectName: any;
    isSignedIn: boolean;
    signedInUserData: any;

    // Add Task Model Open
    isAddTaskModalOpen: boolean;
    setIsAddTaskModalOpen: (value: boolean) => void;
}

const ProjectDetailsInside: React.FC<ProjectDetailsInsideProps> = (
    {
        projectID,
        projectName,
        isSignedIn,
        signedInUserData,

        // Add Task Model Open
        isAddTaskModalOpen,
        setIsAddTaskModalOpen
    }) => {

    const [selectedTabItemValue, setSelectedTabItemValue] = useState<Number>(1);

    const [projectTitle, setProjectTitle] = useState<string>("");

    return (
        <div className={styles.container}>
            {(isSignedIn) ? (
                <div className={styles.container}>
                    <header className={`${styles.header}`}>
                        <HeaderProjectDetails
                            setProjectTitle={setProjectTitle}
                            projectID={projectID}
                            email={signedInUserData.email}
                            projectTitle={projectTitle}
                            photoURL={signedInUserData.photoURL}
                            selectedTabItemValue={selectedTabItemValue}
                            setSelectedTabItemValue={setSelectedTabItemValue} />
                    </header>

                    <div>
                        {(selectedTabItemValue === 1) ? (
                            <Overview photoURL={signedInUserData.photoURL} />
                        ) : (selectedTabItemValue === 2) ? (
                            <List
                                email={signedInUserData.email}
                                projectName={projectName}
                                projectID={projectID}

                                // Add Task Model Open
                                isAddTaskModalOpen={isAddTaskModalOpen}
                                setIsAddTaskModalOpen={setIsAddTaskModalOpen}
                            />
                        ) : (selectedTabItemValue === 3) ? (
                            <Board />
                        ) : (selectedTabItemValue === 4) ? (
                            <Timeline />
                        ) : (selectedTabItemValue === 5) ? (
                            <Calender />
                        ) : (selectedTabItemValue === 6) ? (
                            <Workflow />
                        ) : (selectedTabItemValue === 7) ? (
                            <Dashboard />
                        ) : (selectedTabItemValue === 8) ? (
                            <Messages />
                        ) : (selectedTabItemValue === 9) ? (
                            <Files />
                        ) : (
                            <>Please Select the correct tab</>
                        )}
                    </div>
                </div>
            ) : (
                <CustomLoader />
            )}
        </div>
    )
}
export default ProjectDetailsInside;