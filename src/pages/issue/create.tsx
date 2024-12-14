import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { api } from '@/configs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
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

function IssueCreatePage() {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const { isPending, mutate: createProject } = useMutation({
    mutationKey: ['projects'],
    mutationFn: async (payload: any) => {
      const { data } = await api.post('/projects', payload)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      navigate('/projects')
    }
  })

  const form = useFormik({
    initialValues: {
      title: '',
      description: '',
      startAt: new Date(),
      endAt: new Date()
    },
    validationSchema: validationSchema,
    onSubmit: (data) => createProject(data)
  })

  const formRef = useRef<HTMLFormElement>(null!)

  return (
    <Dialog open={true} onOpenChange={() => navigate('/projects')}>
      <DialogContent
        className="min-w-[600px] max-w-[600px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Nouveau projet</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <IssueForm form={form} ref={formRef} />
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

export default IssueCreatePage
