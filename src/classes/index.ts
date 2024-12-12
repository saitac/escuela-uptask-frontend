import { IProject } from "@/interfaces/index";

class Project implements IProject {
    projectName: String;
    clientName: String;
    description: String;

    constructor(
        projectName: String = "",
        clientName: String = "",
        description: String = ""
     ){

        this.projectName = projectName;
        this.clientName = clientName;
        this.description = description
        
    }
}

export {
    Project
}