export type TProject = {
  id: string
  title: string
  description: string
  startAt: Date
  endAt: Date
  createdAt: Date
  updatedAt: Date
}

export type TCreateProjectPayload = {
  title: string
  description: string
  startAt: Date
  endAt: Date
}

export type TUpdateProjectPayload = Partial<TCreateProjectPayload>
