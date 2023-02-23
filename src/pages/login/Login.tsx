import React from "react";
import {useFormik} from 'formik';
import {Button, Card, Form, Input} from "antd";
import {
    GithubOutlined,
    GoogleOutlined,
    LockOutlined,
    UserOutlined
} from '@ant-design/icons';
import s from "./Login.module.css"
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {validate} from "../../utils/validation";
import {loginTC} from "../../store/reducers/authReducer";
import {REGISTRATION, ROOT} from "../rotes/Rotes";
import {getGoogleUrl} from "../../utils/getGoogleUrl";
import {getGitHubUrl} from "../../utils/getGithubUrl";
import {useTranslation} from "react-i18next";


export const Login = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {t} = useTranslation();
    const isLoggedIn = useAppSelector(state => state.auth.isLogin)
    const handleRegistrationClick = () => {
        navigate(REGISTRATION)
    }
    const location = useLocation();
    let from = ((location.state as any)?.from?.pathname as string) || '/';

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            dispatch(loginTC(values))
        },
    });

    if (isLoggedIn) {
        return <Navigate to={ROOT}/>
    }



    return (
        <div className={s.loginContainer}>
            <Card title={t("login")} className={s.loginCard}>
                <Form
                    size={"large"}
                    onSubmitCapture={formik.handleSubmit}
                    name="normal_login"
                    initialValues={{remember: true}}
                >
                    <Form.Item
                        help={formik.touched.email && !!formik.errors.email ? formik.errors.email : " "}
                        validateStatus={formik.touched.email && !!formik.errors.email ? "error" : "success"}
                    >
                        <Input {...formik.getFieldProps('email')} prefix={<UserOutlined/>}
                            // @ts-ignore
                               placeholder={t("email")}/>
                    </Form.Item>

                    <Form.Item
                        help={formik.touched.password && !!formik.errors.password ? formik.errors.password : " "}
                        validateStatus={formik.touched.password && !!formik.errors.password ? "error" : "success"}
                    >
                        <Input.Password
                            {...formik.getFieldProps('password')}
                            prefix={<LockOutlined/>}
                            type="password"
                            // @ts-ignore
                            placeholder={t("password")}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"
                                className={s.loginFormButton}>
                            {t("login")}
                        </Button>
                        <div className={s.registrationBox}>
                            <div><Button size="middle" type="text"
                                         style={{marginTop: "10px"}}
                                         href={getGoogleUrl(from)}><GoogleOutlined/>Google</Button>
                                <Button size="middle" type="text"
                                        style={{marginTop: "10px"}}
                                        href={getGitHubUrl(from)}><GithubOutlined/>GitHub</Button>
                            </div>
                            <div className={s.pleaseRegister} >{t("pleaseRegister")}</div>
                            <Button size="middle"
                                    onClick={handleRegistrationClick}>{t("registration")}</Button>
                        </div>
                    </Form.Item>

                </Form>
            </Card>
        </div>
    )
}
