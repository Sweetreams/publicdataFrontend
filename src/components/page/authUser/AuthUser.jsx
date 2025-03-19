import React, { useState } from 'react'
import './authUserStyle.css'
import "../../../styles/fonts.css"
import "../../../styles/color.css"
import { Button, Checkbox, ConfigProvider, Form, Input, notification, Spin, Typography } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import ImageRegAuthPage from '../../component/imageRegAuthPage/imageRegAuthPage'
import InputsAuthReg from '../../component/form/InputsAuthReg'

export default function authUser() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  document.title = 'Авторизация'

  const onFinish = (values) => {
    setLoading(true)
    axios.post('https://publicdataapi.onrender.com/user/loginuser', values)
      .then((response) => {
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
                    <InputsAuthReg props={[
                      {
                        label: "Логин",
                        name: "login"
                      },
                      {
                        label: "Пароль",
                        name: "password"
                      },
                    ]} />
                    <Form.Item
                      style={{ marginBottom: '10px', display: 'flex', }}>
                      <Checkbox style={{ fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)" }}>Запомнить меня</Checkbox>
                    </Form.Item>
                  </Spin>
                  <Typography.Text style={{ marginBottom: '10px', fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)" }}>У меня нет аккаунта, <Typography.Link className='regLink' style={{ fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)" }} href='/reguser'>Зарегистрироваться?</Typography.Link></Typography.Text>
                  <Form.Item>
                    <Button
                      style={{ width: '130px' }} htmlType='submit'> <Typography.Text style={{ fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)", paddingTop: "3px" }}>Войти</Typography.Text> </Button>
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
