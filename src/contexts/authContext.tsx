import { createContext, ReactNode, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useLoading } from '@siakit/loading'

import { api } from '../api/api'

type User = {
  cpf: string
  email: string
  id: number
  name: string
  phone: string
}

type SignInData = {
  email?: string
  password?: string
}

type UpdateUser = {
  name: string
  phone: string
}

type AuthContextData = {
  isSigned: boolean
  user: User | null
  signIn: (data: SignInData) => Promise<void>
  signOut: () => void
  updateUser: (data: UpdateUser) => void
}

export const AuthContext = createContext({} as AuthContextData)

type AuthContextProviderProps = {
  children: ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const { setLoading } = useLoading()
  const navigate = useNavigate()

  const [token, setToken] = useState<string | null>(() => {
    const persistedToken = localStorage.getItem(`@pizzaria:token`)

    if (persistedToken) {
      api.defaults.headers.common.authorization = `Bearer ${persistedToken}`

      return persistedToken
    }

    return ''
  })
  const [user, setUser] = useState<User | null>(() => {
    const persistedUser = localStorage.getItem(`@pizzaria:user`)

    if (persistedUser) {
      return JSON.parse(persistedUser)
    }

    return null
  })

  const isSigned = !!token

  async function signIn(data: SignInData) {
    try {
      setLoading(true)

      const response = await api.post('/session', data)

      setToken(response.data.token)
      setUser(response.data.user)

      localStorage.setItem(`@pizzaria:user`, JSON.stringify(response.data))
      localStorage.setItem(`@pizzaria:token`, response.data.token)

      navigate('/')

      toast.success('Bem vindo!')
    } finally {
      setLoading(false)
    }
  }

  function signOut() {
    localStorage.removeItem(`@pizzaria:token`)
    localStorage.removeItem(`@pizzaria:user`)

    setToken(null)
    setUser(null)
    navigate('/sign-in')
  }

  async function updateUser(data: any) {
    try {
      setLoading(true)

      const response = await api.put(`/user/${user?.id}`, data)

      const { name, phone, id } = response.data

      const newUser = {
        ...user,
        id,
        name,
        phone,
      } as any

      setUser(newUser)

      localStorage.setItem(`@pizzaria:user`, JSON.stringify(newUser))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isSigned,
        user,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
