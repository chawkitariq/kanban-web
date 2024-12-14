import { Button } from '../ui/button'
import { IDataTableProps } from './data-table'

type IDataTablePaginationProps<TData> = Pick<IDataTableProps<TData>, 'table'>

export const DataTablePagination = <TData,>({
  table
}: IDataTablePaginationProps<TData>) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} sur{' '}
        {table.getFilteredRowModel().rows.length} ligne(s) séléctionner
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Suivant
        </Button>
      </div>
    </div>
  )
}
