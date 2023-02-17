import React from 'react';
import {ItemsList} from "./lastAddedList/ItemsList";
import {ItemsSearch} from "./itemsSearch/ItemsSearch";
import s from "./LastAddedItemsPage.module.css"

export const LastAddedItemsPage = () => {
    return (
        <div className={s.pageContainer}>
            <ItemsList/>
            <ItemsSearch/>
        </div>
    );
};

