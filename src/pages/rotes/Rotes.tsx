import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Registration} from "../registration/Registration";
import {BiggestCollections} from "../biggestCollections/BiggestCollections";
import {AdminPage} from "../adminPage/AdminPage";
import {Login} from "../login/Login";
import {Error404} from "../error404/Error404";
import {UserPage} from "../userPage/UserPage";
import {CollectionPage} from "../collectionPage/CollectionPage";
import {ItemPage} from "../itemPage/ItemPage";
import {LastAddedItemsPage} from "../lastAddedItemsPage/LastAddedItemsPage";
import {CollectionItems} from "../collectionItems/CollectionItems";
import {SocialAuth} from "../socialAuth/socialAuth";



export const ROOT = '/'
export const LOGIN = '/login'
export const REGISTRATION = '/registration'
export const BIGGEST_COLLECTIONS = '/biggest_collections'
export const USER_PAGE = '/user_page'
export const USER_PROFILE_PAGE = '/user_profile_page/:userId'
export const USER_PROFILE = '/user_profile_page'
export const COLLECTION_PAGE = '/collection_page/:collectionId'
export const COLLECTION = '/collection_page'
export const ITEM_PAGE = '/item_page/:itemId'
export const ITEM = '/item_page'
export const COLLECTION_ITEMS = '/collection_items'
export const COLLECTION_ITEMS_PAGE = '/collection_items/:collectionId'
export const ADMIN_PAGE = '/admin_page'
export const SOCIAL_AUTH = '/socialAuth'
export const ERROR_404 = '/404'


const Routing = () => {

    return (
        <Routes>
            <Route path={ROOT} element={<LastAddedItemsPage/>}/>
            <Route path={LOGIN} element={<Login/>}/>
            <Route path={REGISTRATION} element={<Registration/>}/>
            <Route path={BIGGEST_COLLECTIONS} element={<BiggestCollections/>}/>
            <Route path={USER_PAGE} element={<UserPage/>}/>
            <Route path={USER_PROFILE_PAGE} element={<UserPage/>}/>
            <Route path={ADMIN_PAGE} element={<AdminPage/>}/>
            <Route path={COLLECTION_PAGE} element={<CollectionPage/>}/>
            <Route path={COLLECTION_ITEMS_PAGE} element={<CollectionItems/>}/>
            <Route path={ITEM_PAGE} element={<ItemPage/>}/>
            <Route path={SOCIAL_AUTH} element={<SocialAuth/>}/>
            <Route path={ERROR_404} element={<Error404/>}/>
            <Route path="/*" element={<Navigate to={"/404"}/>}/>
        </Routes>
    )
}

export default Routing;