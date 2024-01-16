import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  ArrowDownCircle,
  ArrowLeftRight,
  ArrowUpCircle,
  CircleDollarSign,
  List,
  Table as ITable,
  CalendarDays,
} from 'lucide-react'
import { z } from 'zod'

import { Pagination } from '@/components/Pagination'
import { TextInput } from '@/components/TextInput'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'

import { months } from './items'

export function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState<string | undefined>('')

  const SearchFormSchema = z.object({
    search: z.coerce.string().optional(),
  })

  const searchForm = useForm<z.infer<typeof SearchFormSchema>>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: {
      search: '',
    },
  })

  function handleSubmitSearch(data: z.infer<typeof SearchFormSchema>) {
    setSearch(data.search)
    setCurrentPage(1)
  }

  console.log(currentPage)
  console.log(search)

  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <div className="flex gap-2 justify-between items-baseline">
        <div />

        <div>
          <Form {...searchForm}>
            <form
              onSubmit={searchForm.handleSubmit(handleSubmitSearch)}
              className="w-full flex gap-2 items-baseline"
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

      <div className="grid grid-cols-3 gap-2">
        <Card className="flex p-4 h-20 gap-2 shadow-inner cursor-pointer items-center">
          <Card className="p-2">
            <ArrowUpCircle className="text-green-500" />
          </Card>

          <div className="flex flex-col">
            <p className="font-roboto font-bold text-green-500">Entrada</p>

            <p className="font-roboto font-semibold">R$ 3.300</p>
          </div>
        </Card>

        <Card className="flex p-4 h-20 gap-2 shadow-inner cursor-pointer items-center">
          <Card className="p-2">
            <ArrowDownCircle className="text-red-500" />
          </Card>

          <div className="flex flex-col">
            <p className="font-roboto font-bold text-red-500">Saída</p>

            <p className="font-roboto font-semibold">R$ 3.300</p>
          </div>
        </Card>

        <Card className="flex p-4 h-20 gap-2 shadow-inner cursor-pointer items-center">
          <Card className="p-2">
            <CircleDollarSign className="text-purple-500" />
          </Card>

          <div className="flex flex-col">
            <p className="font-roboto font-bold text-purple-500">Balanço</p>

            <p className="font-roboto font-semibold">R$ 0</p>
          </div>
        </Card>
      </div>

      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <ArrowLeftRight size={16} />

          <p className="font-roboto font-bold">Transações recentes</p>
        </div>

        <div className="flex gap-2">
          <Card className="p-1 cursor-pointer">
            <List size={16} />
          </Card>

          <Card className="p-1 cursor-pointer">
            <ITable size={16} />
          </Card>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-4 overflow-auto">
        {months.map((item) => (
          <Card
            key={item.id}
            className="p-4 flex gap-4 shadow-inner items-center justify-between cursor-pointer"
          >
            <div className="flex gap-4 items-center">
              <div>
                {item.type === 'in' && (
                  <div className="bg-green-200 rounded-full">
                    <ArrowUpCircle className="text-green-500" />
                  </div>
                )}
                {item.type === 'out' && (
                  <div className="bg-red-300 rounded-full">
                    <ArrowDownCircle className="text-red-500" />
                  </div>
                )}
              </div>

              <div className="flex h-10">
                <Separator orientation="vertical" />
              </div>

              <div className="flex gap-2">
                <CalendarDays size={16} />

                <p className="font-roboto text-xs font-semibold">17/12/2023</p>
              </div>

              <div className="flex h-10">
                <Separator orientation="vertical" />
              </div>

              <div>
                <p className="font-roboto text-sm font-semibold">
                  Fatura do cartão
                </p>
                <p className="font-roboto text-sm">
                  pagamento de parcela referente a compra de uma placa mãe
                </p>
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <div className="flex gap-1 items-center">
                {item.type === 'in' && (
                  <p className="font-roboto text-sm font-semibold text-green-500">
                    +
                  </p>
                )}

                {item.type === 'out' && (
                  <p className="font-roboto text-sm font-semibold text-red-500">
                    -
                  </p>
                )}
                <p className="font-roboto text-sm font-semibold">R$</p>
                <p className="font-roboto text-sm font-semibold">150</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Separator />

      <div>
        <Pagination
          currentPage={1}
          onPageChange={() => undefined}
          perPage={20}
          totalCount={20}
        />
      </div>
    </div>
  )
}
