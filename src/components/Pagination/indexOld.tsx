import { useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

type OptionType = {
  value: number
  label: string
}

type PaginationProps = {
  totalCount: number

  currentPage: number
  onPageChange: (page: number) => void

  perPage: number
  perPageChange?: (amount: number) => void
}

export function DataTablePagination({
  totalCount,
  currentPage,
  perPage,
  onPageChange,
  perPageChange,
}: PaginationProps) {
  const [valueSelected, setValueSelected] = useState<OptionType>({
    value: 20,
    label: '20',
  })

  const siblingsCount = 1

  function generatePagesArray(from: number, to: number): number[] {
    return [...new Array(to - from)]
      .map((_, index) => {
        return from + index + 1
      })
      .filter((page) => page > 0)
  }

  const lastPage = Math.ceil(totalCount / perPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : []

  const totalPages = Math.ceil(totalCount / perPage)

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex gap-1 text-sm font-medium">
        <p className="text-sm font-medium">{(currentPage - 1) * perPage}</p> -{' '}
        <p className="text-sm font-medium">
          {totalCount < currentPage * perPage
            ? totalCount
            : currentPage * perPage}
        </p>{' '}
        de <p className="text-sm font-medium">{totalCount}</p>
      </div>
      <div className="flex items-center space-x-4 lg:space-x-4">
        <div className="flex items-center space-x-2">
          {!!perPageChange && (
            <Select
              value={String(valueSelected.value)}
              onValueChange={(value) => {
                if (value) {
                  setValueSelected({ label: value, value: Number(value) })
                  perPageChange(Number(value))
                  console.log(value)
                }
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={valueSelected.label} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {currentPage} de {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!(previousPages.length > 0)}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={nextPages.length <= 0}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
