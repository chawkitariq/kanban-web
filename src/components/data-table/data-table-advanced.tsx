import { DataTable, IDataTableProps } from './data-table'
import { DataTablePagination } from './data-table-pagination'
import { DataTableViewOptions } from './data-table-view-options'

interface IDataTableAdvancedProps<TData> extends IDataTableProps<TData> {
  searchField?: () => React.ReactNode
  primaryButton?: () => React.ReactNode
}

export function DataTableAdvanced<TData>({
  table,
  searchField,
  primaryButton
}: IDataTableAdvancedProps<TData>) {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {searchField?.()}
          <DataTableViewOptions table={table} />
        </div>
        {primaryButton?.()}
      </div>
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </div>
  )
}
