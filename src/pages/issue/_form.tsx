import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  ISSUE_PRIORITIES_LABELS,
  ISSUE_STATUS_LABELS,
  ISSUE_TYPES_LABELS
} from '@/constants/issue'
import { cn } from '@/lib/utils'
import { TCreateIssuePayload, TIssue, TUpdateIssuePayload } from '@/types'
import { format } from 'date-fns'
import { useFormik } from 'formik'
import { CalendarIcon } from 'lucide-react'
import { forwardRef } from 'react'

interface Props {
  form: ReturnType<typeof useFormik<TCreateIssuePayload | TUpdateIssuePayload>>
}

export const IssueForm = forwardRef<HTMLFormElement, Props>(({ form }, ref) => {
  return (
    <form
      className="grid gap-4 min-h-[700px] max-h-[700px] auto-rows-min"
      onSubmit={form.handleSubmit}
      ref={ref}
    >
      <div className="grid gap-2">
        <Label htmlFor="title">Ttire</Label>
        <Input
          id="title"
          name="title"
          defaultValue={form.values.title}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        {form.errors.title && form.touched.title && (
          <p className="text-sm text-red-500">{form.errors.title}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={form.values.description}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          rows={10}
        />
        {form.errors.description && form.touched.description && (
          <p className="text-sm text-red-500">{form.errors.description}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Type</Label>
        <Select
          defaultValue={form.values.type}
          onValueChange={(type) => form.setFieldValue('type', type)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Séléctionner un type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(TIssue.Type).map((type) => (
              <SelectItem key={type} value={type}>
                {ISSUE_TYPES_LABELS[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.errors.type && form.touched.type && (
          <p className="text-sm text-red-500">{form.errors.type}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Statut</Label>
        <Select
          defaultValue={form.values.status}
          onValueChange={(status) => form.setFieldValue('status', status)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Séléctionner un statut" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(TIssue.Status).map((status) => (
              <SelectItem key={status} value={status}>
                {ISSUE_STATUS_LABELS[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.errors.status && form.touched.status && (
          <p className="text-sm text-red-500">{form.errors.status}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Priorité</Label>
        <Select
          defaultValue={form.values.priority}
          onValueChange={(priority) => form.setFieldValue('priority', priority)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Séléctionner un priorité" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(TIssue.Priority).map((priority) => (
              <SelectItem key={priority} value={priority}>
                {ISSUE_PRIORITIES_LABELS[priority]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.errors.priority && form.touched.priority && (
          <p className="text-sm text-red-500">{form.errors.priority}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="grid gap-2">
          <Label htmlFor="description">Date de début</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'justify-start text-left font-normal',
                  !form.values.startAt && 'text-muted-foreground'
                )}
              >
                <CalendarIcon />
                {format(form.values.startAt ?? Date.now(), 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={form.values.startAt}
                onSelect={(date) =>
                  form.setFieldValue('startAt', date?.toISOString())
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {form.errors.startAt && form.touched.startAt && (
            <p className="text-sm text-red-500">
              {form.errors.startAt as string}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Date de fin</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'justify-start text-left font-normal',
                  !form.values.endAt && 'text-muted-foreground'
                )}
              >
                <CalendarIcon />
                {format(form.values.endAt ?? Date.now(), 'PPP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={form.values.endAt}
                onSelect={(date) =>
                  form.setFieldValue('endAt', date?.toISOString())
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {form.errors.endAt && form.touched.endAt && (
            <p className="text-sm text-red-500">
              {form.errors.endAt as string}
            </p>
          )}
        </div>
      </div>
    </form>
  )
})
