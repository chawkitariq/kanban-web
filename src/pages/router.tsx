import { createBrowserRouter } from 'react-router-dom'
import ProjectIndexPage from './project'
import ProjectCreatePage from './project/create'
import ProjectDetailIndexPage from './project/detail'
import ProjectUpdatePage from './project/update'
import ProjectKanbanPage from './project/kanban'
import { DefaultLayout } from '@/layouts'
import { ProjectDetailLayout } from '@/layouts/project/detail'
import ProjectIssueIndexPage from './project-issue'
import ProjectIssueCreatePage from './project-issue/create'
import IssueUpdatePage from './issue/update'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/projects',
        element: <ProjectIndexPage />,
        children: [
          {
            path: '/projects/new',
            element: <ProjectCreatePage />
          },
          {
            path: '/projects/:id/update',
            element: <ProjectUpdatePage />
          }
        ]
      }
    ]
  },
  {
    path: '/projects/:id',
    element: <ProjectDetailLayout />,
    children: [
      {
        index: true,
        element: <ProjectDetailIndexPage />
      },
      {
        path: '/projects/:id/issues',
        element: <ProjectIssueIndexPage />,
        children: [
          {
            path: '/projects/:id/issues/create',
            element: <ProjectIssueCreatePage />
          },
          {
            path: '/projects/:id/issues/:issueId/update',
            element: <IssueUpdatePage />
          }
        ]
      },
      {
        path: '/projects/:id/kanban',
        element: <ProjectKanbanPage />
      }
    ]
  }
])
