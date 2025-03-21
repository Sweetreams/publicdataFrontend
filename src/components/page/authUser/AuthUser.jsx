import React, { useState } from 'react'
import './authUserStyle.css'
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
import { authUserAxios } from '../../units/api'

export default function authUser() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  document.title = 'Авторизация'

  const onFinish = (values) => {
    setLoading(true)
    console.log(values)
    authUserAxios.request({ data: values }).then((response) => {
      setLoading(false)
      Cookies.set('token', response.data.data.token)
      navigate("/publicdate")
    }).catch(function (err) {
      setLoading(false)
      api.info({
        message: 'Ошибка',
        description: 'Что-то пошло не так!',
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
            <Typography.Title className='titleSecondContainer' style={{ fontFamily: "TT Commons", fontWeight: 400, color: "var(--color-3333)" }}>Авторизация</Typography.Title>
            <div className="formContainer" >
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      defaultHoverBorderColor: "var(--color-3333)"
                    },
                    Input: {
                      colorBorder: "var(--color-3333)",
                      hoverBorderColor: "var(--color-3333)",
                      activeBorderColor: "var(--color-3333)"
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
                      "text": "У меня нет аккаунта",
                      "desc": "Зарегистрироваться?",
                      "link": "/reguser"
                    }
                  } />
                  <SendButton name={"Войти"} />
                </Form>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
