import { api } from '@/configs'
import {
  TCreateIssuePayload,
  TIssue,
  TUpdateIssuePayload
} from '@/types'

export class IssueApiService {
  public static async create(
    payload: TCreateIssuePayload
  ): Promise<TIssue> {
    const { data } = await api.post('/issues', payload)
    return data
  }

  public static async findAll(): Promise<TIssue[]> {
    const { data } = await api.get('/issues')
    return data
  }

  public static async findOne(id: string): Promise<TIssue> {
    const { data } = await api.get(`/issues/${id}`)
    return data
  }

  public static async update(
    id: string,
    payload: TUpdateIssuePayload
  ): Promise<TIssue> {
    const { data } = await api.patch(`/issues/${id}`, payload)
    return data
  }

  public static async delete(id: string): Promise<unknown> {
    const { data } = await api.delete(`/issues/${id}`)
    return data
  }
}
