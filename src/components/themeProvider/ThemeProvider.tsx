import React from 'react';
import {ConfigProvider, Layout} from "antd";
import {useAppSelector} from "../../store/reducers/Store";

const tokenLight={
    "colorPrimary": "#004643",
    "colorPrimaryBg": "#98b9b2",
    "colorPrimaryBgHover": "#6bafa2",
    "colorPrimaryBorder": "#376b63",
    "colorPrimaryText": "#034c49",
    "colorPrimaryTextHover": "#14756d",
    "colorTextBase": "#001e1d",
    "colorBgLayout": "#ccded9",
    "colorBgContainer": "#fffffe",
    "colorText": "#001e1d",
    "borderRadius": 4,
}

const tokenDark={
    "colorPrimary": "#7b948d",
    "colorPrimaryBg": "#414c4b",
    "colorTextBase": "#d9d9d9",
    "colorBgBase": "#202020",
    "colorBgLayout": "#023431",
    "colorBgContainer": "#004643",
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
            <Layout className="layout">
                {children}
            </Layout>
        </ConfigProvider>
    );
};


