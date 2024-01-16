import { Button } from '../ui/button'

type PaginationProps = {
  totalCount: number

  currentPage: number
  onPageChange: (page: number) => void

  perPage: number
}

export function Pagination({
  totalCount,
  currentPage,
  perPage,
  onPageChange,
}: PaginationProps) {
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

  return (
    <div className="flex items-center justify-between space-x-2">
      <div>
        <p className="font-roboto text-sm">
          <strong>{(currentPage - 1) * perPage}</strong> -{' '}
          <strong>
            {totalCount < currentPage * perPage
              ? totalCount
              : currentPage * perPage}
          </strong>{' '}
          de <strong>{totalCount}</strong>
        </p>
      </div>

      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!(previousPages.length > 0)}
        >
          Anterior
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={nextPages.length <= 0}
          className=""
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
