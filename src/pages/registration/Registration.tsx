import React from "react";
import {useFormik} from 'formik';
import {Button, Card, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import s from "./Registration.module.scss"
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store/reducers/Store";
import {registerTC} from "../../store/reducers/authReducer";
import {LOGIN} from "../rotes/Rotes";
import {validate} from "../../utils/validation";
import {useTranslation} from "react-i18next";


export const Registration = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {t} = useTranslation()

    const handleLoginClick = () => {
        navigate(LOGIN)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            dispatch(registerTC(values))
            navigate(LOGIN)

        },
    });


    return (
        <div className={s.registrationContainer}>
            <Card title={t("registration")} className={s.registrationCard}>
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
                                className={s.registrationFormButton}>
                            {t("registration")}
                        </Button>
                    </Form.Item>
                    <div className={s.loginBox}>
                        <h6 style={{color: "gray"}}>{t("pleaseLogin")}</h6>
                        <Button size="middle" onClick={handleLoginClick}>Login</Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}
