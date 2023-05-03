import {
    doc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
import { enqueueSnackbar } from 'notistack';

const updateProject = async (
    updateThing: any,
    type: string,
    email: string,
    projectID: string,
    projects: any // Add the projects array as an argument
) => {
    const db = getFirestore();
    // const projectRef = doc(db, "Data", "Projects", email, projectID);
    const projectRef = doc(db, "Projects", projectID);

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id === projectID.toString()) {
            if (type === "updateDescription") {
                projects[i].description = updateThing;
                const updatedProject: any = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);
                    let message: string = "Project Description has been updated successfully";
                    console.log(message);
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'success',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                } catch (error: any) {
                    let message = `Error updating Project Description: ${error?.message}`
                    console.error(message);
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'error',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                }
            }
            if (type === "updateDescriptionTitle") {
                projects[i].descriptionTitle = updateThing;
                const updatedProject: any = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);
                    let message: string = "Project Title has been updated successfully";
                    console.log(message);
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'success',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                } catch (error: any) {
                    let message = `Error updating Project Title: ${error?.message}`
                    console.error(message);
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'error',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                }
            }
            if (type === "updateSection") {
                projects[i].ProjectStages = updateThing.ProjectStages;
                projects[i].ProjectTasks = updateThing.ProjectTasks
                const updatedProject: any = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);
                    let message: string = "Project Section has been updated successfully";
                    console.log(message);
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'success',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                } catch (error: any) {
                    let message = `Error updating Project Section: ${error?.message}`
                    console.error(message);
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'error',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                }
            }
        }
    }
};
export default updateProject;
