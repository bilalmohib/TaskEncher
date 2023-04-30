import {
    doc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";

const updateTask = async (
    taskId: number,
    updateThing: any,
    type: string,
    email: string,
    projectID: string,
    projects: any // Add the projects array as an argument
) => {
    const db = getFirestore();
    const projectRef = doc(db, "Data", "Projects", email, projectID);

    for (let i = 0; i < projects.length; i++) {
        if (projects[i].id === projectID.toString()) {
            if (type === "taskName") {
                projects[i].ProjectTasks[taskId].taskName = updateThing;
                const updatedProject: any = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);
                    console.log("Task name updated successfully");
                } catch (error) {
                    console.error("Error updating task name:", error);
                }
            }

            if (type === "taskDue") {
                projects[i].ProjectTasks[taskId].taskDue = updateThing;
                const updatedProject: any = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);
                    console.log("Task due date updated successfully");
                } catch (error) {
                    console.error("Error updating task due date:", error);
                }
            }

            if (type === "addTask") {
                // Add a new task to the ProjectTasks array
                const newTask = updateThing;
                projects[i].ProjectTasks.push(newTask);
                const updatedProject: any = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);
                    console.log("New task added successfully");
                } catch (error) {
                    console.error("Error adding new task:", error);
                }
            }
            break;
        }
    }
};

export default updateTask;
