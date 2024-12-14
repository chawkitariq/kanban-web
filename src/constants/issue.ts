import {
  IssuePrioritiesLabelsType,
  IssueStatusLabelsType,
  IssueType
} from '@/types'

export const ISSUE_STATUS_LABELS: IssueStatusLabelsType = {
  [IssueType.Status.Open]: 'Ouvert',
  [IssueType.Status.Todo]: 'A faire',
  [IssueType.Status.InProgress]: 'En cours',
  [IssueType.Status.InReview]: 'En review',
  [IssueType.Status.Done]: 'Fait'
}

export const ISSUE_PRIORITIES_LABELS: IssuePrioritiesLabelsType = {
  [IssueType.Priority.Highest]: 'Éléver',
  [IssueType.Priority.High]: 'Haut',
  [IssueType.Priority.Medium]: 'Moyenne',
  [IssueType.Priority.Low]: 'Bas',
  [IssueType.Priority.Lowest]: 'Basse'
}
