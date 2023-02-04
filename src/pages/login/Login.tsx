import React from "react";
import {useFormik} from 'formik';
// import {useAppDispatch, useAppSelector} from "../../store/store";
import {Button, Card, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
// import {loginTC} from "../../store/reducers/appReducer";
import s from "./Login.module.css"
// import {validate} from "./validation";
// import {MY_PAGE} from "../Content/Routing";
import {Navigate} from "react-router-dom";
import {useAppDispatch} from "../../store/reducers/Store";
import {validate} from "./validation";
// import {getCap, getIsLoggedIn} from "./loginSelectors";


export const Login = () => {

    const dispatch = useAppDispatch()
    // const isLoggedIn = useAppSelector(getIsLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            // dispatch(loginTC(values))
        },
    });
    // if (isLoggedIn) {
    //     return <Navigate to={MY_PAGE}/>
    // }

    return (<Card title={"LOGIN"} className={s.loginCard}>
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
                    <Button type="primary" htmlType="submit" className={s.loginFormButton}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
