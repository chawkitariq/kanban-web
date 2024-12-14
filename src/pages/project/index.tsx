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
import { ProjectApiService } from '@/services/project-api'
import { DataTable } from '@/components/data-table'

function ProjectIndexPage() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: ProjectApiService.findAll
  })

  const table = useReactTable({
    data: projects ?? [],
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
          <div className="lowercase">{row.getValue('startAt')}</div>
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
          <div className="lowercase">{row.getValue('endAt')}</div>
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
                  onClick={() => navigate(`/projects/${row.original?.id}`)}
                >
                  Voir
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigate(`/projects/${row.original?.id}/update`)
                  }
                >
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => deleteProject(row.original?.id)}
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

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { mutate: deleteProject } = useMutation({
    mutationKey: ['projects'],
    mutationFn: ProjectApiService.delete,
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: ['projects'] })
    }
  })

  return (
    <div className="p-4">
      <DataTable
        table={table}
        primaryButtonRender={() => (
          <Button onClick={() => navigate('/projects/new')}>Ajouter</Button>
        )}
      />

      <Outlet />
    </div>
  )
}

export default ProjectIndexPage
