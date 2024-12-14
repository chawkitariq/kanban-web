import { api } from '@/configs'
import { CreateIssuePayloadType, IssueType } from '@/types'

export class ProjectIssueApiService {
  public static async create(
    id: string,
    payload: CreateIssuePayloadType
  ): Promise<IssueType> {
    const { data } = await api.post(`/projects/${id}/issues`, payload)
    return data
  }

  public static async findAll(id: string): Promise<IssueType[]> {
    const { data } = await api.get(`/projects/${id}/issues`)
    return data
  }
}
