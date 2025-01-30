
enum taskStatus {
    PENDING = "pending",
    ON_HOLD = "onhold",
    IN_PROGRESS = "inProgress",
    UNDER_REVIEW = "underReview",
    COMPLETED = "completed"
}

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
    task?: ITask;
    tasks?: ITask[];
}

interface ITask {
    _id: string,
    name: string,
    description: string,
    projectId: string,
    status: taskStatus
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

class Task implements ITask {
    _id: string;
    name: string;
    description: string;
    projectId: string;
    status: taskStatus;

    constructor(_id: string = "", name: string = "", description: string = "", projectId: string = "", status: taskStatus = taskStatus.ON_HOLD){
        this._id = _id;
        this.name = name;
        this.description = description;
        this.projectId = projectId;
        this.status = status
    }   
}

class Resp implements IResp {
    error: string;
    project?: Project | undefined;
    projects?: IProject[] | undefined;
    task?: ITask | undefined;
    tasks?: ITask[] | undefined;

    constructor(error: string = "", project: IProject | undefined = undefined, projects: IProject[] | undefined = undefined,
        task: ITask | undefined = undefined, tasks: ITask[] | undefined = undefined
    ){
        this.error = error;
        this.project = project;
        this.projects = projects;
        this.task = task;
        this.tasks = tasks
    }
}

export {
    Project,
    type IProject,
    Task,
    type ITask,
    taskStatus,
    Resp
}