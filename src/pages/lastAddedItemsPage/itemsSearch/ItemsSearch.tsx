import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../store/reducers/Store";
import {Card, Tag} from "antd";
import {getTagsTC} from "../../../store/reducers/tagsReducer";
import Search from "antd/es/input/Search";
import s from "./ItemSearch.module.css"
import {useAppDebounce} from "../../../hooks";




export const ItemsSearch = () => {
    const dispatch = useAppDispatch()
    const tags = useAppSelector(state => state.tags.tags)
    const [searchText, setSearchText]=useState<string>('')
    const debouncedSearchText=useAppDebounce(searchText, 1000)
    const handleTagClick = (tag:string) => {
        setSearchText(tag)

    }
    const handleSearchChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setSearchText(e.currentTarget.value)
    }
    useEffect(() => {
        dispatch(getTagsTC())
    }, [])

    return (
        <Card title="Items search" className={s.searchContainer}>
            <Search
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

