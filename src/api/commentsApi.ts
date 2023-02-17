import {instance} from "./instance";
import {AxiosResponse} from "axios";


export const commentsApi = {
    addComment(comment: CommentType) {
        return instance.post<CommentType, AxiosResponse<getCommentsResponseType>>
        ('/comments/createComment', comment)
    },
    getComments(itemId:string) {
        return instance.get<getCommentsResponseType>(`/comments/getComments/${itemId}`)
    },
}


export  type CommentType={
    _id?:string,
    itemId: string,
    text:string,
    userId: string,
    userName:string,
    creationDate?:Date,
}

type getCommentsResponseType={
    message:string
    comments:CommentType[]
}