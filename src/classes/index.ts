interface IProject {
     _id: string;
    projectName: string;
    clientName: string;
    description: string;
};

interface IResp {
    error: string;
    project?: IProject;
    projects?: IProject[];
}

class Project implements IProject {
    _id: string;
    clientName: string;
    description: string;
    projectName: string;

    constructor(_id: string = "", clientName: string = "", description: string = "" , projectName: string = "") {
        this._id = _id;
        this.clientName = clientName;
        this.description = description;
        this.projectName = projectName;
    }
}

class Resp implements IResp {
    error: string;
    project?: Project | undefined;
    projects?: IProject[] | undefined;

    constructor(error: string = "", project: IProject | undefined = undefined, projects: IProject[] | undefined = undefined){
        this.error = error;
        this.project = project;
        this.projects = projects
    }
}

export {
    Project,
    Resp
}