import React from 'react';
import {Card} from "antd";
import {CommentType} from "../../api/commentsApi";
import s from "./Comment.module.scss"
import {dateFormatter} from "../../utils/dateFormatter";
import {useTranslation} from "react-i18next";

type PropsType = {
    comment: CommentType
}

export const Comment = ({comment}: PropsType) => {
    const {t} = useTranslation();
    return (
        <Card
            className={s.commentContainer}
            key={comment._id}
            title={
            <div className={s.title}>
                <div>{t("from")}: {comment.userName}</div>
                <div className={s.date}>{dateFormatter(comment.creationDate)}</div>
            </div>}>
            {comment.text}
        </Card>
    );
};

