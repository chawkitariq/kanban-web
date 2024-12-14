import * as React from 'react'
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Outlet, useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { IssueApiService } from '@/services/issue-api'
import { TIssue } from '@/types'
import { DataTableAdvanced } from '@/components/data-table'

function IssueIndexPage() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const { data: issues } = useQuery({
    queryKey: ['issues'],
    queryFn: () => IssueApiService.findAll()
  })

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutate: deleteIssue } = useMutation({
    mutationKey: ['issues'],
    mutationFn: IssueApiService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] })
    }
  })

  const tableData = React.useMemo(
    () => (issues?.length ? issues : []),
    [issues]
  )

  const table = useReactTable({
    data: tableData,
    columns: [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false
      },
      {
        accessorKey: 'title',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Titre
              <ArrowUpDown />
            </Button>
          )
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue('title')}</div>
        )
      },
      {
        accessorKey: 'description',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Description
              <ArrowUpDown />
            </Button>
          )
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue('description')}</div>
        )
      },
      {
        accessorKey: 'project',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Projet
              <ArrowUpDown />
            </Button>
          )
        },
        cell: ({ row }) => (
          <Badge>{row.getValue<TIssue['project']>('project')?.title}</Badge>
        )
      },
      {
        accessorKey: 'type',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Type
              <ArrowUpDown />
            </Button>
          )
        },
        cell: ({ row }) => <Badge>{row.getValue('type')}</Badge>
      },
      {
        accessorKey: 'status',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Statut
              <ArrowUpDown />
            </Button>
          )
        },
        cell: ({ row }) => <Badge>{row.getValue('status')}</Badge>
      },
      {
        accessorKey: 'priority',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Priorité
              <ArrowUpDown />
            </Button>
          )
        },
        cell: ({ row }) => <Badge>{row.getValue('priority')}</Badge>
      },
      {
        accessorKey: 'startAt',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Date de début
              <ArrowUpDown />
            </Button>
          )
        },
        cell: ({ row }) => (
          <div className="lowercase">
            {new Date(row.getValue('startAt'))?.toLocaleString()}
          </div>
        )
      },
      {
        accessorKey: 'endAt',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Date de fin
              <ArrowUpDown />
            </Button>
          )
        },
        cell: ({ row }) => (
          <div className="lowercase">
            {new Date(row.getValue('endAt')).toLocaleString()}
          </div>
        )
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => navigate(`/issues/${row.original?.id}`)}
                >
                  Voir
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate(`/issues/${row.original?.id}/update`)}
                >
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => deleteIssue(row.original?.id)}
                >
                  Supprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
      }
    ],
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div>
      <DataTableAdvanced
        table={table}
        primaryButton={() => (
          <Button onClick={() => navigate(`/issues/create`)}>Ajouter</Button>
        )}
      />
      <Outlet />
    </div>
  )
}

export default IssueIndexPage
