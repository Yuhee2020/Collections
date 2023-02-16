import React from 'react';
import {LastAddedList} from "./lastAddedList/LastAddedList";
import {ItemsSearch} from "./itemsSearch/ItemsSearch";
import s from "./LastAddedItemsPage.module.css"

export const LastAddedItemsPage = () => {

    return (
        <div className={s.pageContainer}>
            <LastAddedList/>
            <ItemsSearch/>
        </div>
    );
};

