import {instance} from "./instance";
import {AxiosResponse} from "axios";


export const tagsApi = {
    createTags(tags: TagType[]) {
        return instance.post<TagType, AxiosResponse<{ message: string }>>
        ('/tags/createTags', tags)
    },
    getTags() {
        return instance.get<getTagsResponseType>('/tags/getTags')
    },
}


export type TagType = {
    title: string
    _id?: string
}

type getTagsResponseType={
    message:string
    tags:TagType[]
}