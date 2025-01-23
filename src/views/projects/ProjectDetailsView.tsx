import projectAPI from "@/api/projectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom"


const ProjectDetailsView = () => {

    const navigate = useNavigate();

    const { projectId } = useParams();
        
    const {data, isLoading, isError} = useQuery({
        queryKey: ["editProject", projectId!],
        queryFn: () => projectAPI.getById(projectId!),
        retry: false
    });
    
    if(isLoading) return "Cargando...";
    if(isError) return <Navigate to={"/404"}/>
    
    if(!isLoading && !isError && data){
        if(data.error){
            return <Navigate to={"/404"}/>
        } else {
            if(data.project) return (
                <>
                    <h1 className="text-5xl font-black">{data.project.projectName}</h1>
                    <p className="text-2xl font-light text-gray-500 mt-5">{data.project.description}</p>
                    <nav className="my-5 flex gap-3">
                        <button
                            type="button"
                            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                            onClick={() => navigate("?newTask=true")}
                        >Agregar Tarea
                        </button>
                    </nav>
                    <AddTaskModal/>
                </>
            )
        }
    }

}

export default ProjectDetailsView