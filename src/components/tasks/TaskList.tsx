import { Task, taskStatus } from "@/classes/index"
import { object } from "zod";

type TaskListProps = {
    tasks: Task[]
}

const TaskList = ({tasks}: TaskListProps) => {
    

    

    const groupedTasks1 = () => {
        //let x: [taskStatus, Task[]] = [tasks[0].status, []];
        //let x: [taskStatus, Task[]];
        let grouped: [taskStatus, Task[]][]

        
        

    }

    /*const groupedTasks = tasks.reduce((acc: object, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
        
        //let currentGroup = task.status in acc ? acc["dd"] : [];
        //currentGroup = [...currentGroup, task]
        
        
        //let x = task.status in acc ? [...acc[task.status]] : acc[0]
        //const x = acc?[task.status]: ""

        
        
        console.log({...acc, [task.status]: []});
        
        
    

        //console.log(currentGroup);
        
        
        
        return {...acc, [task.status]: []}
    }, []);*/

    console.log(groupedTasks1)


    return (
        <>
            HOLA
        </>
    )
}

export default TaskList