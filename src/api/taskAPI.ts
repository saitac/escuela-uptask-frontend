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

            const {data} = await api.post<Resp>(`/projects/${projectId}/tasks`, formData);

            if( data.error && data.error.length > 0 ) {
                resp.error = data.error;
            }

            if ( data.task ) {
                resp.task = data.task;
            }
            
        } catch (error) {
            if( isAxiosError(error) && error.response ) { resp.error = error.response.data.error }   
        } finally {
            return resp
        }
    }

}


export default taskAPI