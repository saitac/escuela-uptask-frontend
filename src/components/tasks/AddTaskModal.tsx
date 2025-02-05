import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form";
import TaskForm from "./TaskForm";
import { ZtaskFormData } from "@/types/index";
import { Project, Resp } from "@/classes/index";
import { useMutation } from "@tanstack/react-query";
import taskAPI from "@/api/taskAPI";

type AddTaskModalProps = {
    project: Project
}

const AddTaskModal = ( {project}: AddTaskModalProps ) => {

    const navigate = useNavigate();

    /** Leer si el modal existe */
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTask = queryParams.get("newTask");
    const show: boolean = modalTask ? true : false;

    /** Obtener projectId */
    const params = useParams();
    const projectId: string = params.projectId!;

    
    const { register, handleSubmit, reset, formState: {errors} } = useForm<ZtaskFormData>({defaultValues: {name:"", description:""}});
    //const { register, handleSubmit, formState: {errors} } = useForm<ZtaskFormData>({defaultValues: new Task});

    const {mutate, isPending} = useMutation({
        mutationFn: taskAPI.create,
        onError: () => {
            toast.error('Error inesperado!');
        },
        onSuccess: (resp: Resp) => {
            
            if ( !resp.error ) {
                toast.success('Tarea creada correctamente');
              } else {
                toast.error(resp.error);
            }

            reset();
            navigate(location.pathname, {replace: true});
            //navigate(`/projects/${projectId}`);
        }
    });

    const handleOnSubmitForm =  (formData: ZtaskFormData): void => { 
        const data = {
          formData,
          projectId: project._id
        };

        mutate(data);
    }

    return(
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={() => navigate(location.pathname, {replace: true})}
                >
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"                    
                    >
                        <div className="fixed inset-0 bg-black/60"></div>
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel 
                                    className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all
                                    p-16"
                                >
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl my-5"
                                    >Nueva Tarea
                                    </DialogTitle>
                                    <p
                                        className="text-xl font-bold"
                                    >Llena el formulario y crea {""}<span className="text-fuchsia-600">una tarea</span>
                                    </p>
                                    <form
                                        className="mt-10 space-y-3"
                                        onSubmit={
                                            handleSubmit(handleOnSubmitForm)
                                        }
                                        noValidate
                                    >
                                        <TaskForm
                                            register={register}
                                            errors={errors}
                                        />
                                        <input
                                            className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors disabled:bg-slate-400"
                                            type="submit"
                                            value="Guardar Tarea"
                                            disabled={isPending}
                                        />
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default AddTaskModal