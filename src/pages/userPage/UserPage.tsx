import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import s from "./UserPage.module.scss"
import {useParams} from "react-router-dom";
import {setUserProfile} from "../../store/reducers/usersReducer";
import {UserProfile} from "./userProfile/UserProfile";
import {UserCollections} from "./userCollections/UserCollections";
import {BackTo} from "../../components/backTo/BackTo";


export const UserPage = () => {

    const dispatch = useAppDispatch()
    const {userId} = useParams()
    const user =useAppSelector(userId? state => state.users.userProfile : state=>state.auth.user)

    useEffect(() => {
        userId && dispatch(setUserProfile(userId))
    }, [])

    return (<>
            <BackTo/>
            <div className={s.userPageContainer}>
                <UserProfile user={user}/>
                <UserCollections userId={user?._id}/>
            </div>
        </>
    );
};

