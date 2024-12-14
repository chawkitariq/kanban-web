import { ContentLoader } from '@/components/content-loader'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { ProjectApiService } from '@/services/project-api'
import { TUpdateProjectPayload } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { object } from 'yup'
import { ProjectForm } from './_form'

const validationSchema = object().shape({})

function ProjectUpdatePage() {
  const { id } = useParams()

  const { isPending: isFindOneProjectPending, data: project } = useQuery({
    queryKey: ['projects', id],
    queryFn: () => ProjectApiService.findOne(id!)
  })

  const form = useFormik<TUpdateProjectPayload>({
    initialValues: {
      title: project?.title,
      description: project?.description,
      startAt: project?.startAt,
      endAt: project?.endAt
    },
    validationSchema: validationSchema,
    onSubmit: (data) => updateProject(data)
  })

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { isPending, mutate: updateProject } = useMutation({
    mutationKey: ['projects', id],
    mutationFn: async (payload: TUpdateProjectPayload) => {
      return ProjectApiService.update(id!, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      navigate('/projects')
    }
  })

  const formRef = useRef<HTMLFormElement>(null!)

  return (
    <Dialog open={true} onOpenChange={() => navigate('/projects')}>
      <DialogContent
        className="min-w-[600px] max-w-[600px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Modification du projet</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ContentLoader loading={isFindOneProjectPending || !project}>
          <ProjectForm form={form} ref={formRef} />
        </ContentLoader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => navigate('/projects')}
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

export default ProjectUpdatePage
