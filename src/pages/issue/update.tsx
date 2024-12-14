import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { IssueApiService } from '@/services/issue-api'
import { UpdateIssuePayloadType } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'
import { IssueForm } from './_form'

const validationSchema = object().shape({
  title: string().required('Obligatoire!'),
  description: string().required('Obligatoire!'),
  type: string().required('Obligatoire!'),
  status: string().required('Obligatoire!'),
  priority: string().required('Obligatoire!'),
  startAt: string().required('Obligatoire!'),
  endAt: string().required('Obligatoire!')
})

function IssueUpdatePage() {
  const { id: projectId, issueId } = useParams()

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { isPending, mutate: updateIssue } = useMutation({
    mutationKey: ['issues', issueId],
    mutationFn: async (payload: UpdateIssuePayloadType) => {
      return IssueApiService.update(issueId!, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] })
      navigate(!projectId ? '/issues' : `/projects/${projectId}/issues`)
    }
  })

  const form = useFormik({
    initialValues: {
      title: '',
      description: '',
      startAt: undefined,
      endAt: undefined
    },
    validationSchema: validationSchema,
    onSubmit: (data) => updateIssue(data)
  })

  const formRef = useRef<HTMLFormElement>(null!)

  return (
    <Dialog
      open={true}
      onOpenChange={() =>
        navigate(!projectId ? '/issues' : `/projects/${projectId}/issues`)
      }
    >
      <DialogContent
        className="min-w-[600px] max-w-[600px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Modification Issue</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <IssueForm form={form} ref={formRef} />
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              navigate(!projectId ? '/issues' : `/projects/${projectId}/issues`)
            }
            disabled={isPending}
          >
            Annuler
          </Button>
          <Button
            onClick={() => formRef?.current?.requestSubmit()}
            disabled={isPending}
          >
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default IssueUpdatePage
