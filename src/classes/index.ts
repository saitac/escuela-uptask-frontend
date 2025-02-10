
enum taskStatus {
    PENDING = "pending",
    ON_HOLD = "onhold",
    IN_PROGRESS = "inProgress",
    UNDER_REVIEW = "underReview",
    COMPLETED = "completed"
}

interface ITask {
    _id: string,
    name: string,
    description: string,
    projectId: string,
    status: taskStatus
}

interface IProject {
     _id: string;
    projectName: string;
    clientName: string;
    description: string;
    tasks: ITask[];
};

interface IResp {
    error: string;
    project?: IProject;
    projects?: IProject[];
    task?: ITask;
    tasks?: ITask[];
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

class Project implements IProject {
    _id: string;
    clientName: string;
    description: string;
    projectName: string;
    tasks: Task[];

    constructor(_id: string = "", clientName: string = "", description: string = "" , projectName: string = "", tasks: Task[]) {
        this._id = _id;
        this.clientName = clientName;
        this.description = description;
        this.projectName = projectName;
        this.tasks = tasks;
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