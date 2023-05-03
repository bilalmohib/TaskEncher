import {
    doc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
import { enqueueSnackbar } from 'notistack';

const addTask = async (
    taskObj: any,
    email: string,
    // projectIDs: any,
    projectID: any,
    projects: any, // Add the projects array as an argument
    type: "single" | "multiple"
) => {
    const db = getFirestore();
    // console.log("Project ID : ", projectIDs)

    if (type === "single") {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === projectID) {
                const projectRef = doc(db, "Projects", projectID);

                // Add a new task to the ProjectTasks array
                const newTask = taskObj;
                projects[i].ProjectTasks.push(newTask);
                const updatedProject: any = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);
                    let message: string = `New task "${taskObj.taskName}" has been added successfully`
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'success',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                    console.log(message)
                } catch (error: any) {
                    let message: string = `Error adding new task ${error}`;
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'error',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                    console.error(message);
                }
                break;
            }
        }
    }

    if (type === "multiple") {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === projectID) {
                let pID = projects[i].id;
                // const projectRef = doc(db, "Data", "Projects", email, pID);
                const projectRef = doc(db, "Projects", pID);

                // Add a new task to the ProjectTasks array
                const newTask = taskObj;
                projects[i].ProjectTasks.push(newTask);
                const updatedProject: any = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);
                    let message: string = `New task "${taskObj.taskName}" has been added successfully`
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'success',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                    console.log(message)
                } catch (error: any) {
                    let message: string = `Error adding new task ${error}`;
                    enqueueSnackbar(
                        message,
                        {
                            variant: 'error',
                            anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                        },
                    )
                    console.error(message);
                }
                break;
            }
        }
    }
};

export default addTask;
