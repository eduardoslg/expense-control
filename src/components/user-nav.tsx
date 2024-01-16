import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { AuthContext } from '@/contexts/authContext'

import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

type User = {
  cpf: string
  email: string
  id: number
  name: string
  phone: string
}

export function UserNav() {
  const { signOut } = useContext(AuthContext)

  const [user, setUser] = useState<User>({} as User)

  useEffect(() => {
    const persistedUser = localStorage.getItem(`@pizzaria:user`)

    setUser(JSON.parse(persistedUser ?? ''))
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 select-none rounded-full bg-primary/10"
        >
          <Avatar className="h-8 w-8 border-[1px] border-foreground">
            <AvatarImage src="../src/assets/xd.jpg" alt={user?.name} />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/settings">Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={signOut}
          className="text-red-600 focus:text-red-600"
        >
          Sair
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
