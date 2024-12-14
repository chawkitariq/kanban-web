import { api } from '@/configs'
import {
  CreateIssuePayloadType,
  IssueType,
  UpdateIssuePayloadType
} from '@/types'

export class IssueApiService {
  public static async create(
    payload: CreateIssuePayloadType
  ): Promise<IssueType> {
    const { data } = await api.post('/issues', payload)
    return data
  }

  public static async findAll(): Promise<IssueType[]> {
    const { data } = await api.get('/issues')
    return data
  }

  public static async findOne(id: string): Promise<IssueType> {
    const { data } = await api.get(`/issues/${id}`)
    return data
  }

  public static async update(
    id: string,
    payload: UpdateIssuePayloadType
  ): Promise<IssueType> {
    const { data } = await api.patch(`/issues/${id}`, payload)
    return data
  }

  public static async delete(id: string): Promise<unknown> {
    const { data } = await api.delete(`/issues/${id}`)
    return data
  }
}
