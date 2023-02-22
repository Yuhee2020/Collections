import React, {useEffect} from 'react';
import {authTC} from "../../store/reducers/authReducer";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {ROOT} from "../rotes/Rotes";
import {Navigate} from "react-router-dom";

export const SocialAuth = () => {
    const dispatch =useAppDispatch()
    const isLogin=useAppSelector(state=>state.auth.isLogin)
    useEffect(()=>{
        dispatch(authTC())
    },[])
    if (isLogin){
        return <Navigate to={ROOT}/>
    }
    return (
        <div>
            
        </div>
    );
};

