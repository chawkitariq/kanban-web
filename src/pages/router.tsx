import { createBrowserRouter, Navigate } from 'react-router-dom'
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
import IssueIndexPage from './issue'
import IssueCreatePage from './issue/create'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/projects" />
      },
      {
        path: '/projects',
        element: <ProjectIndexPage />,
        children: [
          {
            path: 'create',
            element: <ProjectCreatePage />
          },
          {
            path: ':id/update',
            element: <ProjectUpdatePage />
          }
        ]
      },
      {
        path: '/issues',
        element: <IssueIndexPage />,
        children: [
          {
            path: 'create',
            element: <IssueCreatePage />
          },
          {
            path: ':id/update',
            element: <IssueUpdatePage />
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
        path: 'issues',
        element: <ProjectIssueIndexPage />,
        children: [
          {
            path: 'create',
            element: <ProjectIssueCreatePage />
          },
          {
            path: ':issueId/update',
            element: <IssueUpdatePage />
          }
        ]
      },
      {
        path: 'kanban',
        element: <ProjectKanbanPage />
      }
    ]
  }
])
