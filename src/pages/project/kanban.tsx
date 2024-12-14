import { KanbanBoard } from '@/components/kanban/board'
import { Task } from '@/components/kanban/task-card'
import { Button } from '@/components/ui/button'
import { ISSUE_STATUS_LABELS } from '@/constants/issue'
import { IssueApiService } from '@/services/issue-api'
import { ProjectIssueApiService } from '@/services/project-issue-api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'

function ProjectKanbanPage() {
  const { id } = useParams()

  const { isPending, data: issues } = useQuery({
    queryKey: ['issues'],
    queryFn: async () => ProjectIssueApiService.findAll(id!)
  })

  const { mutate: updateProject } = useMutation({
    mutationKey: ['issues', id],
    mutationFn: async (task: Task) => {
      return IssueApiService.update(task.id as string, {
        status: task.columnId as string
      })
    }
  })

  if (isPending) {
    return <h1>Chargement...</h1>
  }

  return (
    <div className="grid gap-4">
      <Button asChild className="ml-auto">
        <Link to={`/projects/${id}/issues/create`}>Ajouter</Link>
      </Button>
      <KanbanBoard
        defaultColumns={Object.entries(ISSUE_STATUS_LABELS).map(
          ([id, title]) => ({ id, title })
        )}
        onChange={updateProject}
        defaultTask={issues?.map((issue) => ({
          id: issue.id,
          columnId: issue.status,
          content: issue.title
        }))}
      />
    </div>
  )
}

export default ProjectKanbanPage
