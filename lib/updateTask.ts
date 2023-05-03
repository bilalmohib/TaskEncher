import {
    doc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
import { enqueueSnackbar } from 'notistack';

const updateTask = async (
    taskId: number,
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
            if (type === "taskName") {
                projects[i].ProjectTasks[taskId].taskName = updateThing;
                const updatedProject: any = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);
                    let message: string = "Task name updated successfully";
                    console.log(message);
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'success',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                } catch (error: any) {
                    let message = `Error updating task name: ${error?.message}`
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

            if (type === "taskDue") {
                projects[i].ProjectTasks[taskId].taskDue = updateThing;
                const updatedProject: any = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);
                    let message: string = "Task Due Date has been updated successfully";
                    console.log(message);
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'success',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                } catch (error: any) {
                    let message = `Error updating task Due Date: ${error?.message}`
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

            if (type === "taskStatus") {
                projects[i].ProjectTasks[taskId].taskStatus = updateThing;
                const updatedProject: any = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);
                    let message: string = `Task Status has been updated successfully to: ${updateThing}`;
                    console.log(message);
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'success',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                } catch (error: any) {
                    let message = `Error updating task Status: ${error?.message}`
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

export default updateTask;
