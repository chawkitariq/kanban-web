import { TProject } from './project'
import { TUser } from './user'

export type TIssue = {
  id: string
  title: string
  description: string
  status: string
  type: string
  priority: string
  startAt: Date
  endAt: Date
  project?: TProject
  asignee?: TUser
  author?: TUser
  parent?: TIssue
  createdAt: Date
  updatedAt: Date
}

export type TCreateIssuePayload = {
  title: string
  description: string
  status: string
  type: string
  priority: string
  startAt: Date
  endAt: Date
}

export type TUpdateIssuePayload = Partial<TCreateIssuePayload>

export namespace TIssue {
  export enum Type {
    Task = 'task',
    Story = 'story',
    Epic = 'epic',
    Bug = 'bug',
    Milestone = 'milestone'
  }

  export enum Priority {
    Highest = 'highest',
    High = 'high',
    Medium = 'medium',
    Low = 'low',
    Lowest = 'lowest'
  }

  export enum Status {
    Open = 'open',
    InProgress = 'inprogress',
    Done = 'done',
    Todo = 'todo',
    InReview = 'inreview'
  }
}

export type TIssuesTypesLabels = { [key in TIssue.Type]: string }
export type TIssuePrioritiesLabels = { [key in TIssue.Priority]: string }
export type TIssueStatusLabels = { [key in TIssue.Status]: string }
