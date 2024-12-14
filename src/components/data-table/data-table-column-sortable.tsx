import { Column } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface IDataTableColumnSortableProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnSortable<TData, TValue>({
  column,
  title
}: IDataTableColumnSortableProps<TData, TValue>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {title}
      <ArrowUpDown />
    </Button>
  )
}
