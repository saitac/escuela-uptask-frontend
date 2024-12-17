import { z } from "zod"

const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string()
});

const RespSchema = z.object({
    error: z.string(),
    project: ProjectSchema
});

type Project = z.infer<typeof ProjectSchema>;
type ProjectFormData = Pick<Project, "projectName" | "clientName" | "description">;
type Resp = z.infer<typeof RespSchema>

export {
    type Project,
    type ProjectFormData,
    type Resp,
    RespSchema
}