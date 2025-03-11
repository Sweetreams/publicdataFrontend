import React from 'react'
import './authUserStyle.css'
import "../../../styles/fonts.css"
import "../../../styles/color.css"
import FormItem from 'antd/es/form/FormItem'
import { Button, Checkbox, ConfigProvider, Form, Input, Typography } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function authUser() {

  const onFinish = (values) => {
    axios.post('http://localhost:8000/user/loginuser', values)
            .then((response) => {
              console.log(response.data)
                Cookies.set('token', response.data.data.token)
                // window.location.href = 'http://localhost:5173';
            }).catch(function (error) {
                console.log(error);
            })
  }

  return (
    <>
      <div className="conteinerLeftRight" style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div className="containerLeft" style={{ width: '50%' }}>
          <div className="containerImage" style={{ background: 'linear-gradient(130deg,#FBEECE, #EAEECA)', height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <img className="imageSun" src="../../../sun.png" alt="" style={{ height: '50vh', width: '50vh', position: 'absolute', zIndex: 2 }} />
          </div>
        </div>
        <div className="containerRight" style={{ width: '50%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="secondContainerRight" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography.Title style={{ fontFamily: "TT Commons", fontWeight: 400, color: "var(--color-3333)" }}>Авторизация</Typography.Title>
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
                  <Form.Item
                    layout='vertical'
                    label="Логин"
                    name='login'
                    style={{ marginBottom: '40px' }}
                  >
                    <Input
                      placeholder='Логин'
                      style={{ width: '450px', color: "var(--color-3333)" }}></Input>
                  </Form.Item>
                  <Form.Item
                    layout='vertical'
                    label="Пароль"
                    name='password'
                    style={{ marginBottom: '40px', fontFamily: "TT Commons", fontWeight: 400, color: "var(--color-3333)" }}
                  >

                    <Input
                      placeholder='Пароль'
                      style={{ width: '450px', color: "var(--color-3333)" }}></Input>

                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: '10px' }}>
                    <Checkbox style={{ fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)" }}>Запомнить меня</Checkbox>
                  </Form.Item>
                  <Typography.Text style={{ marginBottom: '10px', fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)" }}>У меня нет аккаунта, <Typography.Link className='regLink' style={{ fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)" }} href='http://localhost:5173/reg'>Зарегистрироваться?</Typography.Link></Typography.Text>
                  {/* <Typography.Text style={{ marginBottom: '10px' }}><Typography.Link className='forgotThePasswordLink' style={{ marginBottom: '10px', fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)" }}>Забыл пароль?</Typography.Link></Typography.Text> */}
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
