import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {getItemTC} from "../../store/reducers/itemsReducer";
import {BackTo} from "../../components/backTo/BackTo";
import Item from "./item/Item";
import s from "./ItemPage.module.css"
import {CommentsCreator} from "./commentsCreator/CommentsCreator";
import {Comments} from "./comments/Comments";

export const ItemPage = () => {
    const dispatch = useAppDispatch()
    const {itemId} = useParams()
    const isLogin = useAppSelector(state => state.auth.isLogin)

    useEffect(() => {
        itemId && dispatch(getItemTC(itemId))
    }, [])

    return (
        <div className={s.pageContainer}>
            <div className={s.pageBox}>
                <BackTo/>
                <Item/>
                {isLogin &&
                    <>
                        <CommentsCreator itemId={itemId}/>
                        <Comments itemId={itemId}/>
                    </>}
            </div>
        </div>
    );
};

