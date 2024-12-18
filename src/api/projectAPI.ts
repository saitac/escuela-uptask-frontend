import api from "@/lib/axios";
import { ZprojectFormData } from "@/types/index";
import { Resp } from "@/classes/index";

class projectAPI {

    static async create(formData: ZprojectFormData): Promise<Resp> {
        const resp: Resp = new Resp();
        try {

            resp.error = "";
            resp.project = undefined;

            const {data} = await api.post<Resp>("/projects", formData);
            
            if( data.error && data.error.length > 0 ) {
                resp.error = data.error;
            }

            if ( data.project ) {
                resp.project = data.project;
            }            
            
        } catch (error) {
            if (  error instanceof Error ) {
             resp.error = error.message;   
            }

        }finally{
           return resp;
        }
    }

}

export default projectAPI