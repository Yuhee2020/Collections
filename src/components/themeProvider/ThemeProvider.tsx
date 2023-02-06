import React from 'react';
import {ConfigProvider, Layout, Spin} from "antd";
import {useAppSelector} from "../../store/reducers/Store";

const tokenLight={
    "colorPrimary": "#11a7a7",
    "colorTextBase": "#000000",
    "colorBgBase": "#ffffff",
    "colorBgLayout": "#d9e4e4",
    "borderRadius": 4
}

const tokenDark={
    "colorPrimary": "#11a7a7",
    "colorTextBase": "#f7f7f7",
    "colorBgBase": "#413f3f",
    "borderRadius": 4
}


export const ThemeProvider = ({children}: any) => {

    const selectedTheme=useAppSelector(state => state.app.theme)
    const isLoading=useAppSelector(state => state.app.isLoading)

    return (
        <ConfigProvider
            theme={{
                token: selectedTheme==="light" ? tokenLight : tokenDark
            }}
        >
            <Spin wrapperClassName="spin" spinning={isLoading} size={"large"}>
            <Layout className="layout">
                {children}
            </Layout>
            </Spin>
        </ConfigProvider>
    );
};


