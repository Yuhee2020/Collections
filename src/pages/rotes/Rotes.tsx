import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {LastAdded} from "../lastAdded/LastAdded";
import {Registration} from "../registration/Registration";
import {BiggestCollections} from "../biggestCollections/BiggestCollections";

import {AdminPage} from "../adminPage/AdminPage";
import {Login} from "../login/Login";
import {Error404} from "../error404/Error404";
import {UserPage} from "../userPage/UserPage";
import {AddCollectionPage} from "../addCollectionPage/AddCollectionPage";
;


export const ROOT = '/'
export const LOGIN = '/login'
export const REGISTRATION = '/registration'
export const BIGGEST_COLLECTIONS = '/biggest_collections'
export const USER_PAGE = '/user_page'
export const USER_PROFILE_PAGE = '/user_profile_page/:userId'
export const USER_PROFILE = '/user_profile_page'
export const ADMIN_PAGE = '/admin_page'
export const ADD_COLLECTION_PAGE = '/add_collection/:userId'
export const ADD_COLLECTION = '/add_collection'
export const ERROR_404 = '/404'



const Routing = () => {
    return (
            <Routes>
                <Route path={ROOT} element={<LastAdded/>}/>
                <Route path={LOGIN} element={<Login/>}/>
                <Route path={REGISTRATION} element={<Registration/>}/>
                <Route path={BIGGEST_COLLECTIONS} element={<BiggestCollections/>}/>
                <Route path={USER_PAGE} element={<UserPage/>}/>
                <Route path={USER_PROFILE_PAGE} element={<UserPage/>}/>
                <Route path={ADMIN_PAGE} element={<AdminPage/>}/>
                <Route path={ADD_COLLECTION_PAGE} element={<AddCollectionPage/>}/>
                <Route path={ERROR_404} element={<Error404/>}/>
                <Route path="/*" element={<Navigate to={"/404"}/>}/>
            </Routes>
    )
}

export default Routing;