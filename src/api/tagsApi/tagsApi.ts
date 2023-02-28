import {instance} from "../instance";
import {AxiosResponse} from "axios";
import {getTagsResponseType, TagType} from "./index";


export const tagsApi = {
    createTags(tags: TagType[]) {
        return instance.post<TagType, AxiosResponse<getTagsResponseType>>
        ('/tags/createTags', tags)
    },
    getTags() {
        return instance.get<getTagsResponseType>('/tags/getTags')
    },
}


