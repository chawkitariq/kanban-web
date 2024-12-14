import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { TCreateProjectPayload, TUpdateProjectPayload } from '@/types'
import { format } from 'date-fns'
import { useFormik } from 'formik'
import { CalendarIcon } from 'lucide-react'
import { forwardRef } from 'react'

interface Props {
  form: ReturnType<
    typeof useFormik<TCreateProjectPayload | TUpdateProjectPayload>
  >
}

export const ProjectForm = forwardRef<HTMLFormElement, Props>(
  ({ form }, ref) => {
    return (
      <form
        className="grid gap-4 min-h-[700px] max-h-[700px] auto-rows-min"
        onSubmit={form.handleSubmit}
        ref={ref}
      >
        <div className="grid gap-4">
          <Label htmlFor="title">Ttire</Label>
          <Input
            id="title"
            name="title"
            value={form.values.title}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.title && form.touched.title && (
            <p className="text-sm text-red-500">{form.errors.title}</p>
          )}
        </div>
        <div className="grid gap-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={form.values.description}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            rows={10}
          />
          {form.errors.description && form.touched.description && (
            <p className="text-sm text-red-500">{form.errors.description}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="grid gap-4">
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
          <div className="grid gap-4">
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
  }
)
