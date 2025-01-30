import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Resp, Task } from "../classes";
import { Zproject, ZtaskFormData } from "../types";

type TaskAPIType = {
    formData: ZtaskFormData,
    projectId: Zproject["_id"]
}

class taskAPI {
    
    static async create({formData, projectId}: Pick<TaskAPIType, "formData"|"projectId">): Promise<Resp> {
        const resp: Resp = new Resp();
        try {
            resp.error = "";
            resp.task = undefined;

            const {data} = await api.post<Resp>(`/projects/${projectId}/tasks`, {name:"UNO", description:"DOS"});
            
            console.log("create");
            console.log(formData);
            console.log(data);
            console.log("create");

        } catch (error) {
            if( isAxiosError(error) && error.response ) { resp.error = error.response.data.error }   
        } finally {
            return resp
        }
    }

}


export default taskAPI