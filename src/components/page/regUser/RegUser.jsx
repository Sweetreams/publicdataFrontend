import React, { useState } from 'react'
import "../../../styles/fonts.css"
import "../../../styles/color.css"
import { ConfigProvider, Form, notification, Spin, Typography } from 'antd'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import ImageRegAuthPage from '../../component/imageRegAuthPage/ImageRegAuthPage'
import InputsAuthReg from '../../component/form/InputsAuthReg'
import SendButton from '../../component/form/SendButton'
import LinkForm from '../../component/form/LinkForm'
import ForgotMe from '../../component/form/ForgotMe'
import { createUserAxios } from '../../units/api'

const RegUser = () => {
    const [api, contextHolder] = notification.useNotification()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    document.title = 'Регистрация'

    const onFinish = (values) => {
        setLoading(true)
        createUserAxios.request({ data: values }).then((response) => {
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
                <ImageRegAuthPage />
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

                                        <InputsAuthReg items={[
                                            {
                                                label: "E-mail",
                                                name: "email"
                                            },
                                            {
                                                label: "Логин",
                                                name: "login"
                                            },
                                            {
                                                label: "Пароль",
                                                name: "password"
                                            },
                                        ]} />

                                        <ForgotMe />
                                    </Spin>
                                    <LinkForm props={
                                        {
                                            "text": "У меня уже есть аккаунт",
                                            "desc": "Войти?",
                                            "link": "/authuser"
                                        }
                                    } />
                                    <SendButton name={"Зарегистрироваться"} />
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