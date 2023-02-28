import React, {useEffect} from "react";
import {getCollectionsTC} from "../../store/reducers/collectionsReducer";
import {List} from "antd";
import s from "./BiggestCollections.module.scss"
import {Collection} from "../../components/collection/Collection";
import {useAppDispatch, useAppSelector} from "../../hooks";

export function BiggestCollections() {

    const dispatch = useAppDispatch()
    const {collections, collectionsAreLoading} = useAppSelector(state => state.collections)

    useEffect(() => {
        dispatch(getCollectionsTC())
    }, [])

    return (
        <div className={s.listContainer}>
            <List
                loading={collectionsAreLoading}
                itemLayout="vertical"
                size="small"
                pagination={{pageSize: 10}}
                dataSource={collections}
                renderItem={(item) => (
                    <div className={s.collection}><Collection item={item}/></div>
                )}
            /></div>
    )
}


