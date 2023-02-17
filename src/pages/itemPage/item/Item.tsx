import React from 'react';
import s from "./Item.module.css";
import {Badge, Card, Image, Tag} from "antd";
import {noImage} from "../../../constants";
import Meta from "antd/es/card/Meta";
import {ItemField} from "../../../components/itemField/ItemField";
import {dateFormatter} from "../../../utils/dateFormatter";
import {LikeOutlined} from "@ant-design/icons";
import {useAppSelector} from "../../../store/reducers/Store";

const Item = () => {

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
        <Card>
            <div className={s.cardHeader}>
                <Image
                    className={s.image}
                    src={image ? image : noImage}/>
                <div>
                    <Meta
                        title={title}
                        description={tags?.map(tag => <Tag key={tag}>{tag}</Tag>)}
                    />
                    <ItemField fieldTitle="Date of item creation">{dateFormatter(itemCreationDate)}</ItemField>
                    <ItemField><LikeOutlined className={s.like}/> {likesCount}</ItemField>
                </div>
            </div>
            <div className={s.miniFieldsBox}>{author && <ItemField fieldTitle="Author">{author}</ItemField>}
                {producer && <ItemField fieldTitle="Producer">{producer}</ItemField>}
                {author && <ItemField fieldTitle="Author">{author}</ItemField>}
                {countryOfOrigin && <ItemField fieldTitle="Country of origin">{countryOfOrigin}</ItemField>}
                {dateOfCreation &&
                    <ItemField fieldTitle="Date of creation">{dateFormatter(dateOfCreation)}</ItemField>}
                {dateOfWriting &&
                    <ItemField fieldTitle="Date of writing">{dateFormatter(dateOfWriting)}</ItemField>}
                {productionDate &&
                    <ItemField fieldTitle="Production date">{dateFormatter(productionDate)}</ItemField>}
                {price && <ItemField fieldTitle="Price">{price}$</ItemField>}
                {weight && <ItemField fieldTitle="Weight">{weight}kg</ItemField>}
                {numberOfCopies && <ItemField fieldTitle="Number of copies">{numberOfCopies}</ItemField>}
                {countryOfOrigin && <ItemField fieldTitle="Country of origin">{countryOfOrigin}</ItemField>}
                {isUniqueItem && <ItemField fieldTitle="Unique Item">{isUniqueItem
                    ? <Badge status="success" text="YES"/>
                    : <Badge status="error" text="NO"/>}</ItemField>}
                {isAvailableForSale && <ItemField fieldTitle="Available for sale">{isAvailableForSale
                    ? <Badge status="success" text="YES"/>
                    : <Badge status="error" text="NO"/>}</ItemField>}
                {isAvailableForExchange &&
                    <ItemField fieldTitle="Available for exchange">{isAvailableForExchange
                        ? <Badge status="success" text="YES"/>
                        : <Badge status="error" text="NO"/>}</ItemField>}
            </div>
            {description && <ItemField fieldTitle="Description">{description}</ItemField>}
            {historyOfCreation && <ItemField fieldTitle="History of creation">{historyOfCreation}</ItemField>}
            {uniqueCharacteristics &&
                <ItemField fieldTitle="Unique characteristics">{uniqueCharacteristics}</ItemField>}
        </Card>
    );
};

export default Item;