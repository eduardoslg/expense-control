import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { format } from 'date-fns'
import { Split } from 'lucide-react'
import { z } from 'zod'

import { api } from '@/api/api'
import { Dialog } from '@/components/Dialog'
import { toMask } from '@/components/Mask/Mask'
import { MaskInput } from '@/components/MaskInput'
import { Modal } from '@/components/Modal'
import { Pagination } from '@/components/Pagination'
import { TextInput } from '@/components/TextInput'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Form } from '@/components/ui/form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { zodResolver } from '@hookform/resolvers/zod'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useLoading } from '@siakit/loading'
import { useQuery, useQueryClient } from '@tanstack/react-query'

type Enterprise = {
  id: number
  businessName: string
  cnpj: string
  createdAt: Date
}

export function Enterprises() {
  const { setLoading } = useLoading()

  const queryClient = useQueryClient()

  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState<string | undefined>('')

  const [dataToUpdate, setDataToUpdate] = useState<Enterprise>({} as Enterprise)

  const [modalOpen, setModalOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState<undefined | string>()

  const SearchFormSchema = z.object({
    search: z.coerce.string().optional(),
  })

  const searchForm = useForm<z.infer<typeof SearchFormSchema>>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: {
      search: '',
    },
  })

  const FormSchema = z.object({
    businessName: z
      .string({
        invalid_type_error: 'Campo obrigatório',
        required_error: 'Campo obrigatório',
      })
      .min(1, {
        message: 'Campo obrigatório',
      }),
    cnpj: z
      .string()
      .optional()
      .superRefine((value, ctx) => {
        if (!value && !dataToUpdate.id) {
          ctx.addIssue({
            message: 'Campo obrigatório',
            code: z.ZodIssueCode.custom,
          })
        }
      }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { reset } = form

  const { data: enterprises } = useQuery<Enterprise[]>(
    ['enterprises', { currentPage, search }],
    async () => {
      setLoading(true)

      const response = await api.get('/client/list', {
        params: {
          search,
          take: 20,
          skip: currentPage,
        },
      })

      setTotalCount(response?.data?.count)

      return response.data.data
    },
    {
      refetchInterval: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      onSettled() {
        setLoading(false)
      },
    },
  )

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)

      if (dataToUpdate.id) {
        const response = await api.put(`/client/${dataToUpdate.id}`, {
          ...data,
          cnpj: dataToUpdate?.cnpj,
        })

        queryClient.setQueryData(
          ['enterprises', { currentPage, search }],
          (prevState: any) =>
            prevState.map((item: Enterprise) =>
              item.id === response.data.id ? response.data : item,
            ),
        )

        toast.success('Atualizado com sucesso!')
      } else {
        const response = await api.post('/client', data)

        queryClient.setQueryData(
          ['enterprises', { currentPage, search }],
          (prevState: any) => [...prevState, response.data],
        )

        toast.success('Criado com sucesso!')
      }

      handleCloseModal()
    } finally {
      setLoading(false)
    }
  }

  async function onDelete(id: number) {
    try {
      setLoading(true)

      await api.delete(`/client/${id}`)

      queryClient.setQueryData(
        ['enterprises', { currentPage, search }],
        (prevState: any) =>
          prevState.filter((item: Enterprise) => item.id !== id),
      )

      toast.success('Empresa excluída com sucesso!')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleSubmitSearch(data: z.infer<typeof SearchFormSchema>) {
    setSearch(data.search)
    setCurrentPage(1)
  }

  function handleCloseModal() {
    reset({
      businessName: undefined,
      cnpj: undefined,
    })

    setDataToUpdate({} as Enterprise)

    setModalOpen(false)
  }

  useEffect(() => {
    if (dataToUpdate.id) {
      reset({
        ...dataToUpdate,
      })
    } else {
      reset({
        businessName: '',
        cnpj: '',
      })
    }
  }, [dataToUpdate, reset])

  return (
    <>
      <Modal
        open={modalOpen}
        onOpenChange={handleCloseModal}
        title={dataToUpdate.id ? 'Editar empresa' : 'Nova empresa'}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-2"
          >
            <TextInput
              name="businessName"
              label="Nome"
              placeholder="Nome"
              className=""
            />

            <MaskInput
              name="cnpj"
              label="CNPJ"
              mask="cnpj"
              placeholder="CNPJ"
              disabled={!!dataToUpdate?.id}
            />

            <div className="flex justify-between">
              <div />

              <Button type="submit">
                {dataToUpdate.id ? 'Atualizar' : 'Cadastrar'}
              </Button>
            </div>
          </form>
        </Form>
      </Modal>

      <Dialog
        type="danger"
        open={!!dialogOpen}
        onOpenChange={() => setDialogOpen(undefined)}
        description="Esta ação não pode ser desfeita. Isso removerá permanentemente
        essa empresa."
        onAction={() => onDelete(Number(dialogOpen))}
        actionText="Excluir"
        cancelText="Cancelar"
      />

      <div className="flex flex-col mt-4 overflow-auto">
        <Card className="">
          <div className="ml-4 mt-2 mb-4 mr-4 flex gap-2 justify-between items-baseline">
            <Button variant="default" onClick={() => setModalOpen(true)}>
              Nova empresa
            </Button>

            <div className="flex">
              <Form {...searchForm}>
                <form
                  onSubmit={searchForm.handleSubmit(handleSubmitSearch)}
                  className="w-full space-y-2 flex gap-2 items-baseline"
                >
                  <TextInput
                    name="search"
                    placeholder="Informe um texto de pesquisa"
                    onChange={(value) => {
                      if (!value) {
                        setSearch('')
                      }
                    }}
                  />

                  <Button type="submit">Buscar</Button>
                </form>
              </Form>
            </div>
          </div>
        </Card>

        <Card className="overflow-auto mt-4">
          <Table className="overflow-auto">
            <TableHeader className="">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Data de criação</TableHead>
                <TableHead className="flex items-center justify-end">
                  Ações
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {enterprises?.map((enterprise) => (
                <TableRow className="items-center" key={enterprise.id}>
                  <TableCell className="text-xs font-bold text-muted-foreground">
                    {enterprise.id}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="">
                      {enterprise.businessName}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2 font-medium">
                    <span>
                      {toMask({ value: enterprise.cnpj ?? '', mask: 'cnpj' })}
                    </span>
                  </TableCell>
                  <TableCell className="space-x-2 font-medium">
                    <Split className="inline-block h-3 w-3 text-violet-400" />
                    <span>
                      {format(new Date(enterprise?.createdAt), 'dd/MM/yyyy')}
                    </span>
                  </TableCell>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex justify-end mr-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="relative top-3 w-9"
                        >
                          <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => {
                          setDataToUpdate(enterprise)
                          setModalOpen(true)
                        }}
                      >
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          setDialogOpen(String(enterprise.id))
                        }}
                      >
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Pagination
          totalCount={totalCount}
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page)
          }}
          perPage={20}
        />
      </div>
    </>
  )
}
