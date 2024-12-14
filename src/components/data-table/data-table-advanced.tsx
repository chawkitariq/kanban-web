import { DataTable, IDataTableProps } from './data-table'
import { DataTablePagination } from './data-table-pagination'
import { DataTableColumnsVisibility } from './data-table-columns-visibility'

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
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          {searchField?.()}
          <DataTableColumnsVisibility table={table} />
        </div>
        {primaryButton?.()}
      </div>
      <DataTable table={table} />
      <DataTablePagination table={table} />
    </>
  )
}
