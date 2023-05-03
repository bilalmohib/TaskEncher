import {
    doc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
import { enqueueSnackbar } from 'notistack';

const addProjectSection = async (
    taskObj: any,
    email: string,
    projectID: string,
    projects: any, // Add the projects array as an argument
    sectionName: string | null | undefined
) => {
    const db = getFirestore();

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id === projectID) {
            // const projectRef = doc(db, "Data", "Projects", email, projectID);
            const projectRef = doc(db, "Projects", projectID);

            // Add new section to the ProjectSections array

            if (sectionName === null || sectionName === undefined) {
                sectionName = "New Section";
            }

            projects[i].ProjectStages.push(sectionName);

            // Add a new task to the ProjectTasks array
            const newTask = taskObj;
            projects[i].ProjectTasks.push(newTask);
            const updatedProject: any = projects[i];
            console.log("Updated Project : ", updatedProject);

            try {
                await updateDoc(projectRef, updatedProject);
                let message: string = "New Section has been added successfully";
                enqueueSnackbar(
                    message,
                    {
                        variant: 'success',
                        anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                    },
                );
                console.log(message);
            } catch (error: any) {
                console.error("Error adding new Section:", error.message);
                enqueueSnackbar(
                    `Error adding new Section: ${error.message}`,
                    {
                        variant: 'error',
                        anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                    },
                );
            }
        }
        break;
    }
};

export default addProjectSection;