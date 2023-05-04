import {
    doc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
import { enqueueSnackbar } from 'notistack';

const addProjectMembers = async (
    projectsToAdd: any,
    projectID: string,
    projects: any, // Add the projects array as an argument
    projectMembers: [] | null | undefined
) => {
    const db = getFirestore();

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id === projectsToAdd[i]) {
            let projectId = projects[i].id;
            const projectRef = doc(db, "Projects", projectId);

            if (projectMembers === null || projectMembers === undefined || projectMembers.length === 0) {
                enqueueSnackbar
                    (
                        `Please select at least one member to add to the project`,
                        {
                            variant: 'error',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    );
                alert(`Please select at least one member to add to the project`);
                return;
            }

            let tempMembers: any = projects[i].ProjectMembers;

            // Use a Set to ensure unique members
            const uniqueMembers = new Set([...tempMembers, ...projectMembers]);
            projects[i].ProjectMembers = Array.from(uniqueMembers);

            const updatedProject: any = projects[i];
            console.log("Updated Project : ", updatedProject);

            try {
                await updateDoc(projectRef, updatedProject);
                let message: string = `Project Member ${projectMembers.toString()} added to Project ${projects[i].ProjectName} successfully`
                enqueueSnackbar(
                    message,
                    {
                        variant: 'success',
                        anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                    },
                );
                console.log(message);
            } catch (error: any) {
                console.log("Error adding new member(s):", error.message);
                enqueueSnackbar(
                    `Error adding new member(s)}`,
                    {
                        variant: 'error',
                        anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                    },
                );
                alert(`Error adding new member(s): ${error.message}`);
            }
        }
    }
};
export default addProjectMembers;
