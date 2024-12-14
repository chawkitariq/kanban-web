import { api } from '@/configs'
import {
  CreateProjectPayloadType,
  ProjectType,
  UpdateProjectPayloadType
} from '@/types'

export class ProjectApiService {
  public static async create(
    payload: CreateProjectPayloadType
  ): Promise<ProjectType> {
    const { data } = await api.post('/projects', payload)
    return data
  }

  public static async findAll(): Promise<ProjectType[]> {
    const { data } = await api.get('/projects')
    return data
  }

  public static async findOne(id: string): Promise<ProjectType> {
    const { data } = await api.get(`/projects/${id}`)
    return data
  }

  public static async update(
    id: string,
    payload: UpdateProjectPayloadType
  ): Promise<ProjectType> {
    const { data } = await api.put(`/projects/${id}`, payload)
    return data
  }

  public static async delete(id: string): Promise<unknown> {
    const { data } = await api.delete(`/projects/${id}`)
    return data
  }
}
