import {
  TIssuePrioritiesLabels,
  TIssueStatusLabels,
  TIssue,
  TIssuesTypesLabels
} from '@/types'

export const ISSUE_TYPES_LABELS: TIssuesTypesLabels = {
  [TIssue.Type.Bug]: 'Bug',
  [TIssue.Type.Epic]: 'Epic',
  [TIssue.Type.Milestone]: 'Milestone',
  [TIssue.Type.Story]: 'Story',
  [TIssue.Type.Task]: 'Task'
}

export const ISSUE_PRIORITIES_LABELS: TIssuePrioritiesLabels = {
  [TIssue.Priority.Highest]: 'Éléver',
  [TIssue.Priority.High]: 'Haut',
  [TIssue.Priority.Medium]: 'Moyenne',
  [TIssue.Priority.Low]: 'Bas',
  [TIssue.Priority.Lowest]: 'Basse'
}

export const ISSUE_STATUS_LABELS: TIssueStatusLabels = {
  [TIssue.Status.Open]: 'Ouvert',
  [TIssue.Status.Todo]: 'A faire',
  [TIssue.Status.InProgress]: 'En cours',
  [TIssue.Status.InReview]: 'En review',
  [TIssue.Status.Done]: 'Fait'
}
