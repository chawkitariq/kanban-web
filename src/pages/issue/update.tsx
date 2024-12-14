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
import { TUpdateIssuePayload } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useCallback, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { object, string } from 'yup'
import { IssueForm } from './_form'
import { ContentLoader } from '@/components/content-loader'
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

function IssueUpdatePage() {
  const { id } = useParams()

  const { isPending: isFindOneIssuePending, data: issue } = useQuery({
    queryKey: ['issues', id],
    queryFn: () => IssueApiService.findOne(id!)
  })

  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const {
    isPending: isUpdateIssuePending,
    mutate: updateIssue,
    reset: resetUpdateIssue
  } = useMutation({
    mutationKey: ['issues', id],
    mutationFn: async (payload: TUpdateIssuePayload) => {
      return IssueApiService.update(id!, payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues'] })
      navigate('/issues')
    }
  })

  const form = useFormik<TUpdateIssuePayload>({
    initialValues: {
      title: issue?.title,
      description: issue?.description,
      status: issue?.status,
      type: issue?.type,
      priority: issue?.priority,
      startAt: issue?.startAt,
      endAt: issue?.endAt
    },
    validationSchema: validationSchema,
    onSubmit: (data) => updateIssue(data),
    enableReinitialize: true
  })

  const handleClosePage = useCallback(() => {
    resetUpdateIssue()
    navigate('/issues')
  }, [navigate, resetUpdateIssue])

  const formRef = useRef<HTMLFormElement>(null!)

  return (
    <Dialog open={true} onOpenChange={handleClosePage}>
      <DialogContent
        className="min-w-[600px] max-w-[600px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Modification</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ContentLoader loading={isFindOneIssuePending}>
          <IssueForm form={form} ref={formRef} />
        </ContentLoader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClosePage}
            disabled={isUpdateIssuePending}
          >
            Annuler
          </Button>
          <ButtonLoading
            onClick={() => formRef?.current?.requestSubmit()}
            disabled={isUpdateIssuePending}
            loading={isUpdateIssuePending}
          >
            Confirmer
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default IssueUpdatePage
