import projectAPI from "@/api/projectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom"


const EditProjectView = () => {

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
            if(data.project) return <EditProjectForm project = {data.project}/>
        }
    }

}

export default EditProjectView