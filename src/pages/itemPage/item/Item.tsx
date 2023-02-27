import React from 'react';
import s from "./Item.module.scss";
import {Badge, Card, Image, Tag} from "antd";
import {noImage} from "../../../constants";
import Meta from "antd/es/card/Meta";
import {ItemField} from "../../../components/itemField/ItemField";
import {dateFormatter} from "../../../utils/dateFormatter";
import {LikeOutlined} from "@ant-design/icons";
import {useAppSelector} from "../../../store/reducers/Store";
import {useTranslation} from "react-i18next";
import ReactMarkdown from "react-markdown";

const Item = () => {
    const {t} = useTranslation();
    const {
        author,
        producer,
        productionDate,
        price,
        dateOfCreation,
        itemCreationDate,
        dateOfWriting,
        isUniqueItem,
        numberOfCopies,
        weight,
        title,
        tags,
        likesCount,
        historyOfCreation,
        countryOfOrigin,
        image,
        description,
        uniqueCharacteristics,
        isAvailableForExchange,
        isAvailableForSale,
    } = useAppSelector(state => state.items.item)


    return (
        <Card className={s.container}>
            <div className={s.cardHeader}>
                <Image
                    width={250}
                    className={s.image}
                    src={image ? image : noImage}/>
                <div>
                    <Meta
                        title={<div className={s.title}>{title}</div>}
                        description={tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
                    />
                    <ItemField fieldTitle={t("dateOfCreation")}>{dateFormatter(itemCreationDate)}</ItemField>
                    <ItemField><LikeOutlined className={s.like}/> {likesCount}</ItemField>
                </div>
            </div>
            <div className={s.miniFieldsBox}>
                {author && <ItemField fieldTitle={t("author")}>{author}</ItemField>}
                {producer && <ItemField fieldTitle={t("producer")}>{producer}</ItemField>}
                {countryOfOrigin && <ItemField fieldTitle={t("countryOfOrigin")}>{countryOfOrigin}</ItemField>}
                {dateOfCreation &&
                    <ItemField fieldTitle={t("dateOfCreation")}>{dateFormatter(dateOfCreation)}</ItemField>}
                {dateOfWriting &&
                    <ItemField fieldTitle={t("dateOfWriting")}>{dateFormatter(dateOfWriting)}</ItemField>}
                {productionDate &&
                    <ItemField fieldTitle={t("productionDate")}>{dateFormatter(productionDate)}</ItemField>}
                {price && <ItemField fieldTitle={t("price")}>{price}$</ItemField>}
                {weight && <ItemField fieldTitle={t("weight")}>{weight}kg</ItemField>}
                {numberOfCopies && <ItemField fieldTitle={t("numberOfCopies")}>{numberOfCopies}</ItemField>}
                {isUniqueItem && <ItemField fieldTitle={t("uniqueItem")}>{isUniqueItem
                    ? <Badge status="success" text="YES"/>
                    : <Badge status="error" text="NO"/>}</ItemField>}
                {isAvailableForSale && <ItemField fieldTitle={t("availableForSale")}>{isAvailableForSale
                    ? <Badge status="success" text="YES"/>
                    : <Badge status="error" text="NO"/>}</ItemField>}
                {isAvailableForExchange &&
                    <ItemField fieldTitle={t("availableForExchange")}>{isAvailableForExchange
                        ? <Badge status="success" text="YES"/>
                        : <Badge status="error" text="NO"/>}</ItemField>}
            </div>
            {description && <ItemField fieldTitle={t("descriptions")}><ReactMarkdown>{description}</ReactMarkdown></ItemField>}
            {historyOfCreation && <ItemField fieldTitle={t("historyOfCreation")}><ReactMarkdown>{historyOfCreation}</ReactMarkdown></ItemField>}
            {uniqueCharacteristics &&
                <ItemField fieldTitle={t("uniqueCharacteristics")}><ReactMarkdown>{uniqueCharacteristics}</ReactMarkdown></ItemField>}
        </Card>
    );
};

export default Item;