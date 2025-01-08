import projectAPI from "@/api/projectAPI";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"


const EditProjectView = () => {

    const { projectId } = useParams();
        
    const {data, isLoading} = useQuery({
        queryKey: ["editProject", projectId!],
        queryFn: () => projectAPI.getById(projectId!),
        retry: false
    });

    console.log(data)
    
    return(
        <>
            HOLA
        </>
    )
}

export default EditProjectView