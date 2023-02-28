import React, {useEffect} from 'react';
import {getCommentsTC} from "../../../store/reducers/commentsReducer";
import {Comment} from "../../../components/comment/Comment";
import s from "./Comments.module.scss"
import {useAppDispatch, useAppSelector} from "../../../hooks";

type PropsType = {
    itemId?: string
}


export const Comments = ({itemId}: PropsType) => {

    const dispatch = useAppDispatch()
    const comments = useAppSelector(state => state.comments.comments)

    useEffect(() => {
        itemId && dispatch(getCommentsTC(itemId))
        const intervalId = setInterval(() => {
            itemId && dispatch(getCommentsTC(itemId))
        }, 6000)
        return ()=>clearInterval(intervalId)
    }, [])

    return (
        <div className={s.comments}>
            {comments.map(comment =>
                <Comment key={comment._id} comment={comment}/>
            )}
        </div>

    );
};

