import React from "react";
import {useFormik} from 'formik';
import {Button, Card, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import s from "./Login.module.css"
import {Navigate, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/reducers/Store";
import {validate} from "../../utils/validation";
import {loginTC} from "../../store/reducers/authReducer";
import {REGISTRATION, ROOT} from "../rotes/Rotes";


export const Login = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLogin)
    const handleRegistrationClick = () => {
        navigate(REGISTRATION)
    }

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
            <Card title={"LOGIN"} className={s.loginCard}>
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
                               placeholder="email"/>
                    </Form.Item>

                    <Form.Item
                        help={formik.touched.password && !!formik.errors.password ? formik.errors.password : " "}
                        validateStatus={formik.touched.password && !!formik.errors.password ? "error" : "success"}
                    >
                        <Input.Password
                            {...formik.getFieldProps('password')}
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"  htmlType="submit" className={s.loginFormButton}>
                            Login
                        </Button>
                    </Form.Item>
                    <div className={s.registrationBox}>
                        <h6 style={{color: "gray"}}>If you don't have an account, please register</h6>
                        <Button size="middle" onClick={handleRegistrationClick}>Registration</Button></div>
                </Form>
            </Card>
        </div>
    )
}
