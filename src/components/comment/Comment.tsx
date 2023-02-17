import React from 'react';
import {Card} from "antd";
import {CommentType} from "../../api/commentsApi";
import s from "./Comment.module.css"
import {dateFormatter} from "../../utils/dateFormatter";

type PropsType = {
    comment: CommentType
}

export const Comment = ({comment}: PropsType) => {
    return (
        <Card
            className={s.commentContainer}
            key={comment._id}
            title={
            <div className={s.title}>
                <div>From: {comment.userName}</div>
                <div className={s.date}>{dateFormatter(comment.creationDate)}</div>
            </div>}>
            {comment.text}
        </Card>
    );
};

