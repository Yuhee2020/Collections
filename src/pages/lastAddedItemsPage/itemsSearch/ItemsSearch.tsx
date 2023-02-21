import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/reducers/Store";
import {Card, Tag} from "antd";
import {getTagsTC} from "../../../store/reducers/tagsReducer";
import s from "./ItemSearch.module.css"
import {setItemsIsLoading, setSearch} from "../../../store/reducers/itemsReducer";
import {AppSearch} from "../../../components/appHeader/appSearch/AppSearch";


export const ItemsSearch = () => {
    const dispatch = useAppDispatch()
    const tags = useAppSelector(state => state.tags.tags)

    const handleTagClick = (tag: string) => {
        dispatch(setSearch(tag))
        dispatch(setItemsIsLoading(true))
    }

    useEffect(() => {
        dispatch(getTagsTC())
    }, [])

    return (
        <Card title="Items search" className={s.searchContainer}>
            <AppSearch/>
            <div className={s.tagsContainer}>
                {tags.map(tag => {
                    return (
                        <Tag key={tag._id}
                             color="cyan"
                             className={s.tag}
                             style={{cursor: "pointer"}}
                             onClick={() => handleTagClick(tag.title)}>
                            {tag.title}
                        </Tag>)
                })}
            </div>
        </Card>


    );
};

