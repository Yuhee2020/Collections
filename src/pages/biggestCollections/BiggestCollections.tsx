import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {getCollectionsTC} from "../../store/reducers/collectionsReducer";
import {List} from "antd";
import s from "./BiggestCollections.module.scss"
import {Collection} from "../../components/collection/Collection";

export function BiggestCollections() {

    const dispatch = useAppDispatch()
    const {collections, collectionsIsLoading} = useAppSelector(state => state.collections)

    useEffect(() => {
        dispatch(getCollectionsTC())
    }, [])

    return (
        <div className={s.listContainer}>
            <List
                loading={collectionsIsLoading}
                itemLayout="vertical"
                size="small"
                pagination={{pageSize: 10}}
                dataSource={collections}
                renderItem={(item) => (
                    <Collection item={item}/>
                )}
            />
        </div>)
}


