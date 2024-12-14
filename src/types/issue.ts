export type IssueType = {
  id: string
  title: string
  description: string
  status: string
  type: string
  priority: string
  startAt: Date
  endAt: Date
  createdAt: Date
  updatedAt: Date
}

export type CreateIssuePayloadType = {
  title: string
  description: string
  status: string
  type: string
  priority: string
  startAt: Date
  endAt: Date
}

export type UpdateIssuePayloadType = Partial<CreateIssuePayloadType>

export namespace IssueType {
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

export type IssueStatusLabelsType = { [key in IssueType.Status]: string }
export type IssuePrioritiesLabelsType = { [key in IssueType.Priority]: string }
