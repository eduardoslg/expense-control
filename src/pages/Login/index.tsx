import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

import { TextInput } from '@/components/TextInput'
import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { AuthContext } from '@/contexts/authContext'
import { zodResolver } from '@hookform/resolvers/zod'

const FormSchema = z.object({
  email: z
    .string({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Campo obrigatório',
    })
    .email({
      message: 'Formato de email inválido.',
    })
    .min(1, {
      message: 'Campo obrigatório',
    }),
  password: z
    .string({
      required_error: 'Campo obrigatório',
      invalid_type_error: 'Campo obrigatório',
    })
    .min(1, {
      message: 'Campo obrigatório',
    }),
})

export function Login() {
  const { setTheme } = useTheme()

  const { signIn } = useContext(AuthContext)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    signIn(data)
  }

  useEffect(() => {
    setTheme('light')
  }, [setTheme])

  return (
    <div className="grid h-screen place-items-center">
      <div className="flex flex-col p-4 w-[400px] gap-8">
        <div>
          <h1 className="text-xl font-medium mt-4">Hi, welcome back 👋</h1>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-4"
          >
            <TextInput
              name="email"
              label="Usuário"
              placeholder="Usuário"
              className=""
              type="text"
            />

            <TextInput
              name="password"
              label="Senha"
              placeholder="Senha"
              type="password"
            />

            <div className="flex">
              <Button type="submit" className="flex w-full">
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
