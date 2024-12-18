//import { Project } from "@/classes/index"
import ProjectForm from "@/components/projects/ProjectForm";
import { SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { ZprojectFormData } from "@/types/index";
import projectAPI from "@/api/projectAPI"
import { Resp } from "@/classes/index";

const CreateProjectView = () => {

  const {register, handleSubmit, formState: {errors}} = useForm<ZprojectFormData>({});

  const handleOnSubmitForm: SubmitHandler<ZprojectFormData> = async (data: ZprojectFormData) => { 
    
    const resp: Resp =  await projectAPI.create(data); 
    console.log(resp);
  }

  return (
        <>
          <div
            className="max-w-3xl mx-auto"
          >
            <h1
              className="text-5xl font-black"
            >Crear Proyecto</h1>
            <p
              className="text-2xl font-light text-gray-500 mt-5"
            >Llena el siguiente formulario para crear un proyecto</p>
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
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                type="submit"
                value="Crear Proyecto"
              />
            </form>
          </div>
        </>
  )
}

export default CreateProjectView