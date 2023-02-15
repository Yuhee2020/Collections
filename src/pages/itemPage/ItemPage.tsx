import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {getItemTC} from "../../store/reducers/itemsReducer";
import {Badge, Descriptions, Image} from "antd";
import {dateFormatter} from "../../utils/dateFormatter";
import {noImage} from "../../constants";
import s from "./ItemPage.module.css"
import {BackTo} from "../../components/backTo/BackTo";
import {COLLECTION} from "../rotes/Rotes";

export const ItemPage = () => {
    const dispatch = useAppDispatch()
    const {itemId} = useParams()
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
        collectionId
    } = useAppSelector(state => state.items.item)

    useEffect(() => {
        itemId && dispatch(getItemTC(itemId))
    }, [])

    return (
        <>
            <BackTo path={`${COLLECTION}/${collectionId}`} title={"collection"}/>
            <Descriptions
            layout="vertical"
            className={s.descriptions}
            labelStyle={{fontWeight: "bold"}}
            size="small"
            bordered
            column={{xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1}}
        >
            <Descriptions.Item label="Image">{<Image
                width={50}
                src={image ? image : noImage}/>}</Descriptions.Item>
            <Descriptions.Item label="Title:">{title}</Descriptions.Item>
            <Descriptions.Item label="Tags:">{tags?.join(", ")}</Descriptions.Item>
            <Descriptions.Item label="LikesCount:">{likesCount}</Descriptions.Item>
            <Descriptions.Item label="Date of item creation:">{dateFormatter(itemCreationDate)}</Descriptions.Item>
            {author && <Descriptions.Item label="Author:">{author}</Descriptions.Item>}
            {producer && <Descriptions.Item label="Producer:">{producer}</Descriptions.Item>}
            {countryOfOrigin && <Descriptions.Item label="Country of origin:">{countryOfOrigin}</Descriptions.Item>}
            {dateOfCreation &&
                <Descriptions.Item label="Date of creation:">{dateFormatter(dateOfCreation)}</Descriptions.Item>}
            {dateOfWriting &&
                <Descriptions.Item label="Date of writing:">{dateFormatter(dateOfWriting)}</Descriptions.Item>}
            {productionDate &&
                <Descriptions.Item label="Production date:">{dateFormatter(productionDate)}</Descriptions.Item>}
            {price && <Descriptions.Item label="Price:">{price}$</Descriptions.Item>}
            {weight && <Descriptions.Item label="Weight:">{weight}kg</Descriptions.Item>}
            {numberOfCopies && <Descriptions.Item label="Number of copies:">{numberOfCopies}</Descriptions.Item>}

            {isUniqueItem && <Descriptions.Item label="Unique Item:">{isUniqueItem
                ? <Badge status="success" text="YES"/>
                : <Badge status="error" text="NO"/>}</Descriptions.Item>}
            {isAvailableForSale && <Descriptions.Item label="Available for sale:">{isAvailableForSale
                ? <Badge status="success" text="YES"/>
                : <Badge status="error" text="NO"/>}</Descriptions.Item>}
            {isAvailableForExchange && <Descriptions.Item label="Available for exchange:">{isAvailableForExchange
                ? <Badge status="success" text="YES"/>
                : <Badge status="error" text="NO"/>}</Descriptions.Item>}
            {description && <Descriptions.Item label="Description:">{description}</Descriptions.Item>}
            {historyOfCreation &&
                <Descriptions.Item label="History of creation:">{historyOfCreation}</Descriptions.Item>}
            {uniqueCharacteristics &&
                <Descriptions.Item label="Unique characteristics:">{uniqueCharacteristics}</Descriptions.Item>}
        </Descriptions></>
    );
};

