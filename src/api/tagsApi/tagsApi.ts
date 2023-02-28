import { AxiosResponse } from 'axios'

import { instance } from '../instance'

import { getTagsResponseType, TagType } from './index'

export const tagsApi = {
  createTags(tags: TagType[]) {
    return instance.post<TagType, AxiosResponse<getTagsResponseType>>(
      '/tags/createTags',
      tags,
    )
  },
  getTags() {
    return instance.get<getTagsResponseType>('/tags/getTags')
  },
}
