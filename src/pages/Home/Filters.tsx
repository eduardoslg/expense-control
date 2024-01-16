import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { z } from 'zod'

import { TextInput } from '@/components/TextInput'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'

type DrawerProps = {
  open: boolean
  onOpenChange: () => void
}

export function Drawer({ open, onOpenChange }: DrawerProps) {
  const [search, setSearch] = useState('')

  const SearchFormSchema = z.object({
    search: z.coerce.string().optional(),
  })

  const searchForm = useForm<z.infer<typeof SearchFormSchema>>({
    resolver: zodResolver(SearchFormSchema),
    defaultValues: {
      search: '',
    },
  })

  console.log('search', search)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-[340px] p-4 rounded-s-lg gap-4">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
        </SheetHeader>

        <Separator />

        <Form {...searchForm}>
          <form
            onSubmit={searchForm.handleSubmit(() => undefined)}
            className="w-full space-y-2 flex gap-2 items-baseline"
          >
            <TextInput
              name="deletedAt"
              placeholder="Pedidos finalizados"
              label="Pedidos finalizados"
              className="w-[306px]"
              onChange={(value) => {
                if (!value) {
                  setSearch('')
                }
              }}
            />
          </form>
        </Form>

        <SheetFooter>
          <Button type="submit">Buscar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
