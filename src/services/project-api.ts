import { api } from '@/configs'
import {
  TCreateProjectPayload,
  TProject,
  TUpdateProjectPayload
} from '@/types'

export class ProjectApiService {
  public static async create(
    payload: TCreateProjectPayload
  ): Promise<TProject> {
    const { data } = await api.post('/projects', payload)
    return data
  }

  public static async findAll(): Promise<TProject[]> {
    const { data } = await api.get('/projects')
    return data
  }

  public static async findOne(id: string): Promise<TProject> {
    const { data } = await api.get(`/projects/${id}`)
    return data
  }

  public static async update(
    id: string,
    payload: TUpdateProjectPayload
  ): Promise<TProject> {
    const { data } = await api.put(`/projects/${id}`, payload)
    return data
  }

  public static async delete(id: string): Promise<unknown> {
    const { data } = await api.delete(`/projects/${id}`)
    return data
  }
}
