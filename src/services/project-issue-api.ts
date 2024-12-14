import { api } from '@/configs'
import { TCreateIssuePayload, TIssue } from '@/types'

export class ProjectIssueApiService {
  public static async create(
    id: string,
    payload: TCreateIssuePayload
  ): Promise<TIssue> {
    const { data } = await api.post(`/projects/${id}/issues`, payload)
    return data
  }

  public static async findAll(id: string): Promise<TIssue[]> {
    const { data } = await api.get(`/projects/${id}/issues`)
    return data
  }
}
