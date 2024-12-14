import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { IssueForm } from './_form'
import { IssueApiService } from '@/services/issue-api'
import { TCreateIssuePayload, TIssue } from '@/types'
import { ButtonLoading } from '@/components/button-loading'

const validationSchema = object().shape({
  title: string().required('Obligatoire!'),
  description: string().required('Obligatoire!'),
  type: string().required('Obligatoire!'),
  status: string().required('Obligatoire!'),
  priority: string().required('Obligatoire!'),
  startAt: string().required('Obligatoire!'),
  endAt: string().required('Obligatoire!')
})

function IssueCreatePage() {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const {
    isPending: isCreateIssuePending,
    mutate: createIssue,
    reset: resetCreateIssue
  } = useMutation({
    mutationKey: ['issues'],
    mutationFn: IssueApiService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] })
      navigate('/issues')
    }
  })

  const form = useFormik<TCreateIssuePayload>({
    initialValues: {
      title: '',
      description: '',
      type: TIssue.Type.Task,
      status: TIssue.Status.Open,
      priority: TIssue.Priority.Medium,
      startAt: new Date(),
      endAt: new Date()
    },
    validationSchema: validationSchema,
    onSubmit: (data) => createIssue(data)
  })

  const handleCancel = useCallback(() => {
    resetCreateIssue()
    navigate('/issues')
  }, [navigate, resetCreateIssue])

  const formRef = useRef<HTMLFormElement>(null!)

  return (
    <Dialog open={true} onOpenChange={handleCancel}>
      <DialogContent
        className="min-w-[600px] max-w-[600px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Creation</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <IssueForm form={form} ref={formRef} />
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isCreateIssuePending}
          >
            Annuler
          </Button>
          <ButtonLoading
            onClick={() => formRef?.current?.requestSubmit()}
            disabled={isCreateIssuePending}
            loading={isCreateIssuePending}
          >
            Ajouter
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default IssueCreatePage
