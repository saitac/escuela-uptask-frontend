import { z } from "zod"

const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string()
});


type Zproject = z.infer<typeof ProjectSchema>;
type ZprojectFormData = Pick<Zproject, "projectName" | "clientName" | "description">;

export {
    type Zproject,
    type ZprojectFormData
}