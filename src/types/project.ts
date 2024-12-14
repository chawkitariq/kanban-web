export type ProjectType = {
  id: string
  title: string
  description: string
  startAt: Date
  endAt: Date
  createdAt: Date
  updatedAt: Date
}

export type CreateProjectPayloadType = {
  title: string
  description: string
  startAt: Date
  endAt: Date
}

export type UpdateProjectPayloadType = Partial<CreateProjectPayloadType>
