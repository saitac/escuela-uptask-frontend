import { Link } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import projectAPI from "@/api/projectAPI";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import { Resp } from "../classes";

const DashboardView = () => {

    const { data } = useQuery({
      queryKey: ["projects"],
      queryFn: projectAPI.getAll
    });

    
    const queryClient = useQueryClient();
    
    const { mutate } = useMutation({
      mutationFn: projectAPI.delete,
      onError: (error) => { toast.error(error.message) },
      onSuccess: (resp: Resp) => {
        if ( !resp.error ) {
          toast.success('Proyecto eliminado correctamente');
          queryClient.invalidateQueries({queryKey:["projects"]});
        } else {
          toast.error(resp.error);
        }
      }
    });
  
    if (data && data.projects) return(
        <>
          <h1
            className="text-5xl font-black"
          >Mis Proyectos</h1>
          <p
            className="text-2xl font-light text-gray-500 mt-5"
          >Maneja y administra tus proyectos</p>
          <nav
            className="my-5"
          >
            <Link
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                    to={"projects/create"}
                >Nuevo Proyecto</Link>
          </nav>

          {
            data.projects.length > 0 
              ? (
                <ul
                  className="divide-y divide-gray-100 border border-gray-100 mt-10 bg-white shadow-lg"
                >
                  {data.projects.map((pr)=>(
                    <li 
                      key={pr._id}
                      className="flex justify-between gap-x-6 px-5 py-10" 
                    >
                      <div
                        className="flex min-w-0 gap-x-4"
                      >
                        <div
                          className="min-w-0 flex-auto space-y-2"
                        >
                          <Link
                            to={""}
                            className="text-gray-600 cursor-pointer hover:underline text-3xl font-bold"
                          >
                            {pr.projectName}
                          </Link>
                          <p
                            className="text-sm text-gray-400"
                          >
                            Cliente: {pr.clientName}
                          </p>
                          <p
                            className="text-sm text-gray-400"
                          >
                            {pr.description}
                          </p>
                        </div>
                      </div>
                      <div
                        className="flex shrink-0 items-center gap-x-6"
                      >
                        <Menu>
                          <MenuButton
                            className="m-2.5 block p-2.5 text-gray-500 hover:text-gray-900"
                          >
                            <EllipsisVerticalIcon
                              className="h-9 w-9 aria-hidden:true"
                            />
                          </MenuButton>
                          <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5
                            focus:outline-none"
                          >
                            <MenuItem>
                              <Link
                                to={""}
                                className="block px-3 py-1 text-sm leading-6 text-gray-900"
                              >Ver Proyecto</Link>
                            </MenuItem>
                            <MenuItem>
                              <Link
                                to={`/projects/${pr._id}/edit`}
                                className="block px-3 py-1 text-sm leading-6 text-gray-900"
                              >Editar Proyecto</Link>
                            </MenuItem>
                            <MenuItem>
                              <button
                                type='button'
                                className='block px-3 py-1 text-sm leading-6 text-red-500'
                                onClick={() => mutate(pr._id) }
                              >
                                Eliminar Proyecto
                              </button>
                            </MenuItem>
                          </MenuItems>
                        </Menu>
                      </div>
                    </li>
                  ))}
                </ul>
              ) 
              : (
                <p
                  className="text-center py-20"
                >No hay proyectos aún {""}
                  <Link
                    to={"projects/create"}
                    className="text-fuchsia-500 font-bold"
                  >Crear Proyecto</Link>
                </p>
              )
          }
          
        </>
    )
}

export default DashboardView