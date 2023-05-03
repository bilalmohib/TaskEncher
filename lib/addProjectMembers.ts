import {
    doc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
import { enqueueSnackbar } from 'notistack';

const addProjectMembers = async (
    projectsToAdd: any,
    email: string,
    projectID: string,
    projects: any, // Add the projects array as an argument
    projectMembers: [] | null | undefined
) => {
    const db = getFirestore();

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id === projectsToAdd.id) {
            // const projectRef = doc(db, "Data", "Projects", email, projectID);
            let projectId = projects[i].id;
            const projectRef = doc(db, "Projects", projectID);

            // Add new section to the ProjectSections array

            if (projectMembers === null || projectMembers === undefined || projectMembers.length === 0) {
                enqueueSnackbar
                    (
                        `Please select atleast one member to add to the project`,
                        {
                            variant: 'error',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    );
                return;
            }

            let tempMembers: any = projects[i].ProjectMembers;

            projects[i].ProjectMembers = tempMembers.concat(projectMembers);

            // Add a new task to the ProjectTasks array
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
export default addProjectMembers;