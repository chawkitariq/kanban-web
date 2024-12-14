import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ProjectIssueApiService } from '@/services/project-issue-api'
import { CreateIssuePayloadType, IssueType } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'
import { IssueForm } from '../issue/_form'

const validationSchema = object().shape({
  title: string().required('Obligatoire!'),
  description: string().required('Obligatoire!'),
  type: string().required('Obligatoire!'),
  status: string().required('Obligatoire!'),
  priority: string().required('Obligatoire!'),
  startAt: string().required('Obligatoire!'),
  endAt: string().required('Obligatoire!')
})

function ProjectIssueCreatePage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { isPending, mutate: createProject } = useMutation({
    mutationKey: ['projects', id, 'issues/create'],
    mutationFn: async (payload: CreateIssuePayloadType) => {
      return ProjectIssueApiService.create(id!, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues', id] })
      navigate(`/projects/${id}/issues`)
    }
  })

  const form = useFormik<CreateIssuePayloadType>({
    initialValues: {
      title: '',
      description: '',
      type: IssueType.Type.Task,
      status: IssueType.Status.Open,
      priority: IssueType.Priority.Medium,
      startAt: new Date(),
      endAt: new Date()
    },
    validationSchema: validationSchema,
    onSubmit: (data) => createProject(data)
  })

  const formRef = useRef<HTMLFormElement>(null!)

  return (
    <Dialog open={true} onOpenChange={() => navigate(`/projects/${id}/issues`)}>
      <DialogContent
        className="min-w-[600px] max-w-[600px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Nouvelle Issue</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <IssueForm form={form} ref={formRef} />
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => navigate(`/projects/${id}/issues`)}
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

export default ProjectIssueCreatePage
