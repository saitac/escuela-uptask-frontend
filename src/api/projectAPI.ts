import api from "@/lib/axios";
import { ZprojectFormData, ProjectsSchema, Zproject, ProjectSchema } from "@/types/index";
import { Resp } from "@/classes/index";
import { isAxiosError } from "axios";

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
            if ( isAxiosError(error) && error.response ) { 
                resp.error = error.response.data.error;
            }
            /*if (  error instanceof Error ) {
             resp.error = error.message;
            }*/
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
            if ( isAxiosError(error) && error.response ) { 
                resp.error = error.response.data.error;
            }
        } finally {
            return resp;
        }
    }

    static async getById(projectId: Zproject["_id"]): Promise<Resp> {
        const resp = new Resp;
        try {
            const {data} = await api.get<Resp>(`/projects/${projectId}`);
            
            if ( data.error && data.error.length > 0 ) {
                resp.error = data.error;
            }

            if ( data.project ) {

                if ( ProjectSchema.safeParse(data.project).success ) {
                    resp.project = data.project;
                }
                
            }

        } catch (error) {
            if ( isAxiosError(error) && error.response ) { 
                resp.error = error.response.data.error;
            }
        } finally {
            return resp;
        }
    }

}

export default projectAPI