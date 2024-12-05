
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import { Bars3Icon } from "@heroicons/react/20/solid"

const NavMenu = () => {
    return(
        <Popover className='relative'>
            <PopoverButton className='inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg'>
                <Bars3Icon className='w-8 h-8 text-white ' />
            </PopoverButton>
            <PopoverPanel 
                transition
                anchor="bottom"
                className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
                <div className='w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5'>
                    <p className='text-center'>Hola: Usuario</p>

                    <button
                    className='block p-2 hover:text-purple-950'
                    type='button'
                    onClick={() => {}}
                    >
                    Cerrar Sesión
                    </button>
                </div>
            </PopoverPanel>
        </Popover>
    )
}

export default NavMenu