import { Task, taskStatus } from "@/classes/index"

type TaskListProps = {
    tasks: Task[]
}

const TaskList = ({tasks}: TaskListProps) => {
    
    const groupedTasks = tasks.reduce((acc, task) => {
        /*let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };*/
        
        //let currentGroup = task.status in acc ? [...acc[task.status]] : [];
        //currentGroup = [...currentGroup, task]
        
        //console.log(currentGroup);
        return []
    }, []);

    console.log(groupedTasks)
    return (
        <>
            HOLA
        </>
    )
}

export default TaskList