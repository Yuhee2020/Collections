import React from 'react';
import {Button, Card, Image} from "antd";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import s from "./Collection.module.scss"
import {COLLECTION_ITEMS} from "../../pages/rotes/Rotes";
import {dateFormatter} from "../../utils/dateFormatter";
import {useMediaQuery} from "react-responsive";
import { DownloadOutlined } from '@ant-design/icons';
import { CSVLink} from "react-csv";
import {useAppSelector} from "../../hooks";
import {CollectionType} from "../../api/collectionsApi";
import {noImage} from "../../images/noImage";

type PropsType = {
    item: CollectionType
    full?: boolean
}

export const Collection = ({item, full}: PropsType) => {

    const navigate = useNavigate()
    const {t} = useTranslation();
    const isBigScreen = useMediaQuery({query: '(min-width: 800px)'})
    const items=useAppSelector(state => state.items.collectionItems)

    return (
        <Card key={item._id}
              onClick={() => navigate(`${COLLECTION_ITEMS}/${item._id}`)}
              className={full ? `${s.collectionContainer} ${s.fullContainer}` : s.collectionContainer}>
            <div className={s.collection}>
                <div>
                    <Image
                        width={250}
                        alt="logo"
                        src={item.image ? item.image : noImage}
                    />
                </div>
                <div className={s.fieldsBox}>
                    <div className={s.title}>{item.title}
                        {full &&
                            <CSVLink data={items}>
                            <Button
                            type="text"
                            size={"large"}
                            icon={<DownloadOutlined/>}/>
                            </CSVLink>}
                    </div>
                    <div className={s.field}>{t("theme")}: {item.theme}</div>
                    <div
                        className={s.field}>{t("dateOfCreation")}: {dateFormatter(item.creationDate)}</div>
                    <div className={s.field}>{t("itemsCount")}: {item.itemsCount}</div>
                    {isBigScreen
                        && <div className={full ? s.descriptionContainerFull : s.descriptionContainer}>
                        {item.description}
                    </div>}

                </div>

            </div>
        </Card>
    );
};

