import api from "@/lib/axios";
import { ZprojectFormData, ProjectsSchema } from "@/types/index";
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
            /*if( isAxiosError(error) ){
                if (error.message) {
                    resp.error = error.message;
                }
                if (error.response){
                    resp.error = error.response.data.message
                }
            }*/
            if (  error instanceof Error ) {
             resp.error = error.message;
            }
        }finally{
           return resp;
        }
    }

    static async getAll(): Promise<Resp> {
        const resp = new Resp();
        try {
            const {data} = await api.get<Resp>("/projects");
            
            if ( data.error && data.error.length > 0 ) {
                resp.error = data.error;
            }

            if ( data.projects ) {

                if ( ProjectsSchema.safeParse(data.projects).success ) {
                    resp.projects = data.projects;
                }
                
            }
        } catch (error) {
            if ( error instanceof Error) { resp.error = error.message; }
        } finally {
            return resp;
        }
    }

}

export default projectAPI