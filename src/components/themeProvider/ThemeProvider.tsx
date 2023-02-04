import React from 'react';
import {ConfigProvider, Layout, theme} from "antd";
import {useAppSelector} from "../../store/reducers/Store";
import {Content} from "antd/es/layout/layout";

const tokenLight={
    "colorPrimary": "#11a7a7",
    "colorTextBase": "#000000",
    "colorBgBase": "#ffffff",
    "colorBgLayout": "#d9e4e4",
    "borderRadius": 4
}

const tokenDark={
    "colorPrimary": "#13C2C2",
    "colorTextBase": "#f7f7f7",
    "colorBgBase": "#413f3f",
    "borderRadius": 4
}


export const ThemeProvider = ({children}: any) => {

    const selectedTheme=useAppSelector(state => state.app.theme)

    return (
        <ConfigProvider
            theme={{
                token: selectedTheme==="light" ? tokenLight : tokenDark
            }}
        >
            <Layout>
                {children}
            </Layout>
        </ConfigProvider>
    );
};


