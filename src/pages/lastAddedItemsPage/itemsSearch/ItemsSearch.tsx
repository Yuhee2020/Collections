import React, {ChangeEvent, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/reducers/Store";
import {Card, Tag} from "antd";
import {getTagsTC} from "../../../store/reducers/tagsReducer";
import Search from "antd/es/input/Search";
import s from "./ItemSearch.module.css"
import {setItemsIsLoading, setSearch} from "../../../store/reducers/itemsReducer";


export const ItemsSearch = () => {
    const dispatch = useAppDispatch()
    const tags = useAppSelector(state => state.tags.tags)
    const {searchText,itemsIsLoading }=useAppSelector(state =>state.items)
    const handleTagClick = (tag:string) => {
        dispatch(setSearch(tag))
        dispatch(setItemsIsLoading(true))
    }
    const handleSearchChange=(e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(setSearch(e.currentTarget.value))
        dispatch(setItemsIsLoading(true))
    }
    useEffect(() => {
        dispatch(getTagsTC())
    }, [])

    return (
        <Card title="Items search" className={s.searchContainer}>
            <Search
                loading={itemsIsLoading}
                placeholder="search items"
                value={searchText}
                onChange={handleSearchChange}
            />
            <div className={s.tagsContainer}>
                {tags.map(tag => {
                    return (
                        <Tag key={tag._id}
                             color="cyan"
                             className={s.tag}
                             style={{cursor: "pointer"}}
                             onClick={()=>handleTagClick(tag.title)}>
                            {tag.title}
                        </Tag>)
                })}
            </div>
        </Card>


    );
};

