import { Link, useNavigate } from "react-router-dom"
import ProjectForm from "./ProjectForm"
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ZprojectFormData } from "@/types/index";
import { Project, Resp } from "@/classes/index";
import projectAPI from "@/api/projectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
  project: Project
}

const EditProjectForm = ({project}: EditProjectFormProps) => {

    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors}} = useForm<ZprojectFormData>({defaultValues: project});{}

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
      mutationFn: projectAPI.update,
      onError: ( error ) => { toast.error(error.message) },
      onSuccess: (resp: Resp) => {
        
        queryClient.invalidateQueries({queryKey:["projects"]});
        queryClient.invalidateQueries({queryKey:["editProject", project._id]});
        
        if ( !resp.error ) {
          toast.success('Proyecto actualizado correctamente');
        } else {
          toast.error(resp.error);
        }
        navigate("/");
      }
    });

    const handleOnSubmitForm =  (formData: ZprojectFormData): void => { 
        const data = {
          formData,
          projectId: project._id
        };
        mutate(data);
      }

    return (
        <>
          <div
            className="max-w-3xl mx-auto"
          >
            <h1
              className="text-5xl font-black"
            >Editar Proyecto</h1>
            <p
              className="text-2xl font-light text-gray-500 mt-5"
            >Llena el siguiente formulario para editar el proyecto</p>
            <nav
              className="my-5"
            >
              <Link
                      className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                      to={"/"}
                  >Volver a Proyectos</Link>
            </nav>

            <form
              className="mt-10 bg-white shadow-lg p-10 rounded-lg"
              onSubmit={handleSubmit(handleOnSubmitForm)}
              noValidate
            >
              <ProjectForm
                register={register}
                errors={errors}
              />
              <input
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors disabled:bg-slate-400"
                type="submit"
                value="Guardar Cambios"
                disabled={isPending}
              />
            </form>
          </div>
        </>
  )
}

export default EditProjectForm