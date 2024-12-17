import api from "@/lib/axios";
import { Resp, ProjectFormData, RespSchema } from "@/types/index";

class projectAPI {

    static async create(formData: ProjectFormData) {
        let resp: Resp;
        let data: Resp
        try {
            const {data} = await api.post<Resp>("/projects", formData);
            
            console.log("1");
            console.log(data)
            console.log(RespSchema.safeParse(data));
            console.log("2");
            
        } catch (error) {
            /*if (  error instanceof Error ) {
                
            }*/
           console.log(error)
        }finally{
            
        }
    }

}

export default projectAPI