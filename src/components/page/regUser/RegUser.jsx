import React, { useState } from 'react'
import "../../../styles/fonts.css"
import "../../../styles/color.css"
import { Button, Checkbox, ConfigProvider, Form, Input, notification, Spin, Typography } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import ImageRegAuthPage from '../../component/imageRegAuthPage/imageRegAuthPage'

const RegUser = () => {
    const [api, contextHolder] = notification.useNotification()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    document.title = 'Регистрация'
    const onFinish = (values) => {
        setLoading(true)
        axios.post('https://publicdataapi.onrender.com/user/createuser', values)
            .then((response) => {
                setLoading(false)
                Cookies.set('token', response.data.data.token)
                navigate("/publicdate")
            }).catch((error) => {
                setLoading(false)
                api.info({
                    message: 'Ошибка',
                    description: error.response.data.error.message,
                    placement: 'bottom'
                })
            })
    }

    return (
        <>
            {contextHolder}
            <div className="conteinerLeftRight" style={{ display: 'flex', justifyContent: 'space-around' }}>
                <ImageRegAuthPage/>
                <div className="containerRight" style={{ width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                    <div className="secondContainerRight" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography.Title style={{ fontFamily: "TT Commons", fontWeight: 400, color: "var(--color-3333)" }}>Регистрация</Typography.Title>
                        <div className="formContainer" >
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Input: {
                                            colorBorder: "var(--color-3333)",
                                            hoverBorderColor: "var(--color-3333)",
                                            activeBorderColor: "var(--color-3333)",
                                        },
                                        Button: {
                                            defaultHoverBorderColor: "var(--color-3333)"
                                        },
                                    },
                                }}
                            >
                                <Form
                                    name="formAuth"
                                    variant='filled'
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                        maxWidth: 505,
                                    }}
                                    onFinish={(values) => onFinish(values)}
                                >
                                    <Spin spinning={loading} indicator={<LoadingOutlined style={{ color: "var(--color-fbee)" }} />} size='large'>


                                        <Form.Item
                                            layout='vertical'
                                            label="E-mail"
                                            name="email"
                                            style={{ marginBottom: '40px' }}
                                        >
                                            <Input
                                                placeholder='E-mail'
                                                style={{ width: '450px', color: "var(--color-3333)" }}></Input>
                                        </Form.Item>
                                        <Form.Item
                                            layout='vertical'
                                            label="Логин"
                                            name="login"
                                            style={{ marginBottom: '40px' }}
                                        >
                                            <Input
                                                placeholder='Логин'
                                                style={{ width: '450px', color: "var(--color-3333)" }}></Input>
                                        </Form.Item>
                                        <Form.Item
                                            layout='vertical'
                                            label="Пароль"
                                            name="password"
                                            style={{ marginBottom: '40px', fontFamily: "TT Commons", fontWeight: 400, color: "var(--color-3333)" }}
                                        >
                                            <Input.Password
                                            type='pa'
                                                placeholder='Пароль'
                                                style={{ width: '450px', color: "var(--color-3333)" }}></Input.Password>
                                        </Form.Item>

                                        <Form.Item
                                            style={{ marginBottom: '10px', display: 'flex' }}>
                                            <Checkbox style={{ fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)" }}>Запомнить меня</Checkbox>
                                        </Form.Item>
                                    </Spin>
                                    <Typography.Text style={{ marginBottom: '10px', fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)" }}>У меня уже есть аккаунт, <Typography.Link className='regLink' style={{ fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)" }} href='/authuser'>Войти?</Typography.Link></Typography.Text>
                                    <Form.Item>
                                        <Button
                                            style={{ width: '170px' }}
                                            htmlType='submit'>
                                            <Typography.Text style={{ fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)", paddingTop: "3px" }}>Зарегистрироваться</Typography.Text>
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </ConfigProvider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegUser