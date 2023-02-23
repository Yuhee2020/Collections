import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {getCollectionsTC} from "../../store/reducers/collectionsReducer";
import {Card, Image, List} from "antd";
import {noImage} from "../../constants";
import {dateFormatter} from "../../utils/dateFormatter";
import s from "./BiggestCollections.module.css"
import {useNavigate} from "react-router-dom";
import {COLLECTION_ITEMS} from "../rotes/Rotes";
import {useTranslation} from "react-i18next";

export function BiggestCollections() {
    const navigate=useNavigate()
    const dispatch = useAppDispatch()
    const {t} = useTranslation();
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
                    <Card key={item._id}
                          onClick={()=>navigate(`${COLLECTION_ITEMS}/${item._id}`)}
                          className={s.collectionContainer}>
                        <div className={s.collection}>
                            <div>
                                <Image
                                    width={250}
                                    alt="logo"
                                    src={item.image ? item.image : noImage}
                                />
                            </div>
                            <div className={s.fieldsBox}>
                                <div className={s.title}>{item.title}</div>

                                <div className={s.field}>{t("theme")}: {item.theme}</div>
                                <div className={s.field}>{t("dateOfCreation")}: {dateFormatter(item.creationDate)}</div>
                                <div className={s.field}>{t("itemsCount")}: {item.itemsCount}</div>
                                <div className={s.descriptionContainer}>
                                    {item.description}
                                </div>
                            </div>
                        </div>
                    </Card>
                )}
            />
        </div>)
}


