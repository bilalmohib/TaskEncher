import {
    doc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
import { enqueueSnackbar } from 'notistack';

const deleteTask = async (
    taskId: number,
    email: string,
    projectID: string,
    projects: any // Add the projects array as an argument
) => {

    const db = getFirestore();
    // const projectRef = doc(db, "Data", "Projects", email, projectID);
    const projectRef = doc(db, "Projects", projectID);

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id === projectID.toString()) {
            let taskName: string = projects[i].ProjectTasks[taskId].taskName;
            let taskArray = projects[i].ProjectTasks;
            taskArray.splice(taskId, 1);
            projects[i].ProjectTasks = taskArray;
            const updatedProject: any = projects[i];
            console.log("Updated Project : ", updatedProject);

            try {
                await updateDoc(projectRef, updatedProject);
                let message: string = `Task "${taskName}" has been deleted successfully`;
                console.log(message);
                enqueueSnackbar(
                    message,
                    {
                        variant: 'success',
                        anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                    },
                )
            } catch (error: any) {
                let message = `Error Deleting task ${error?.message}`;
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
};
export default deleteTask;
