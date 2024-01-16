import { Outlet } from 'react-router-dom'

import { ModeToggle } from '@/components/mode-toggle'
import { NavLink } from '@/components/nav-link'
import { Menubar } from '@/components/ui/menubar'
import { UserNav } from '@/components/user-nav'

export function DefaultLayout() {
  return (
    <div className="gap-4 flex flex-col h-screen w-full max-w-7xl m-auto lg:px-4 mt-4 overflow-hidden mb-4">
      <Menubar className="py-6 shadow-inner">
        <div className="flex w-full justify-between mx-3 my-4">
          <nav className="flex items-center space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/enterprises">Categorias</NavLink>
            <NavLink to="/monitoring">Produtos</NavLink>
            <NavLink to="/settings">Configurações</NavLink>
          </nav>

          <div className="flex align-middle gap-2">
            <ModeToggle />

            <UserNav />
          </div>
        </div>
      </Menubar>

      <Outlet />
    </div>
  )
}
