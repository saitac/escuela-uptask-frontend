import { z } from "zod"

const taskStatusSchema = z.enum(["pending","onhold","inProgress","underReview","completed"]);

const TaskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    projectId: z.string(),
    status: taskStatusSchema
});

const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(TaskSchema)
});
// satisfies ZodType<IProject> 

const ProjectsSchema = z.array(
    ProjectSchema.pick({
        _id: true,
        projectName: true,
        clientName: true,
        description: true
    })
);
// satisfies ZodType<IProject[]>

type Zproject = z.infer<typeof ProjectSchema>;
type Ztask = z.infer<typeof TaskSchema>;

type ZprojectFormData = Pick<Zproject, "projectName" | "clientName" | "description">;
type ZtaskFormData = Pick<Ztask, "name" | "description">;

export {
    type Zproject,
    type ZprojectFormData,
    type Ztask,
    type ZtaskFormData,
    ProjectsSchema,
    ProjectSchema,
    TaskSchema
}