import React, {useEffect} from 'react';
import './App.scss';
import {useAppDispatch, useAppSelector} from "./store/reducers/Store";
import {ThemeProvider} from "./components/themeProvider/ThemeProvider";
import {AppHeader} from "./components/appHeader/AppHeader";
import {authTC} from "./store/reducers/authReducer";
import Routing from "./pages/rotes/Rotes";
import {getLanguageTC, getThemeTC} from "./store/reducers/appReducer";
import {AppMessagesBar} from "./components/appMessagesBar/AppMessagesBar";
import {AppSearch} from "./components/appSearch/AppSearch";
import {useMediaQuery} from "react-responsive";


function App() {

    const dispatch = useAppDispatch()

    const authInProgress = useAppSelector(state => state.app.authInProgress)
    const isBigScreen = useMediaQuery({ query: '(min-width: 800px)' })

    useEffect(() => {
        dispatch(getThemeTC())
        dispatch(getLanguageTC())
        localStorage.getItem('token') && dispatch(authTC())
    }, [])

    if (authInProgress) {
        return <div>Loading</div>
    }
    return (
        <ThemeProvider>
            <AppHeader/>
            {!isBigScreen && <div className="search"><AppSearch/></div>}
            <div className="rotes">
                <Routing/>
            </div>
            <AppMessagesBar/>
        </ThemeProvider>
    );
}

export default App;
