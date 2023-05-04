import {
    doc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
// import sendEmail from "./EmailSend/sendEmail";

const addProjectMembers = async (
    projectsToAdd: any,
    projectID: string,
    projects: any, // Add the projects array as an argument
    projectMembers: [] | null | undefined,
    enqueueSnackbar: any
) => {
    const db = getFirestore();

    if (projectMembers === null || projectMembers === undefined || projectMembers.length === 0) {
        let m = `Please select at least one member to add to the project`;
        // enqueueSnackbar(
        //     m,
        //     {
        //         variant: 'error',
        //         anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
        //     },
        // );
        alert(m);
        return;
    }

    if (projectMembers !== null && projectMembers !== undefined && projectMembers.length !== 0) {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id === projectsToAdd[i]) {
                let projectId = projects[i].id;
                const projectRef = doc(db, "Projects", projectId);

                let tempMembers: any = projects[i].ProjectMembers;

                // Use a Set to ensure unique members
                const uniqueMembers = new Set([...tempMembers, ...projectMembers]);
                projects[i].ProjectMembers = Array.from(uniqueMembers);

                const updatedProject: any = projects[i];
                console.log("Updated Project : ", updatedProject);

                try {
                    await updateDoc(projectRef, updatedProject);

                    let text = `Hi ${projectMembers.toString()}. You have been invited to the Project: ${projects[i].ProjectName} by ${projects[i].createdBy}. Please login to your account to view the project.`

                    // sendEmail(
                    //     text,
                    //     projectMembers.toString(),
                    //     `Invitation to Project: ${projects[i].ProjectName}`,
                    //     projects[i].createdBy
                    // )
                    let message: string = `Project Member ${projectMembers.toString()} added to Project ${projects[i].ProjectName} successfully`
                    alert(message);
                    // enqueueSnackbar(
                    //     message,
                    //     {
                    //         variant: 'success',
                    //         anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                    //     },
                    // );
                    console.log(message);
                } catch (error: any) {
                    console.log("Error adding new member(s):", error.message);
                    // enqueueSnackbar(
                    //     `Error adding new member(s)}`,
                    //     {
                    //         variant: 'error',
                    //         anchorOrigin: { vertical: 'bottom', horizontal: 'right' }
                    //     },
                    // );
                    alert(`Error adding new member(s): ${error.message}`);
                }
            }
        }
    }
};
export default addProjectMembers;
