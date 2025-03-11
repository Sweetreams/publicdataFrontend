import React from 'react'
import MenuComponents from './components/component/menu/MenuComponents'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import "./styles/color.css"

const App = () => {
    if(Cookies.get('token') == undefined){
        window.location.href = '/auth'
    }
    return (
        <>
            <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
                <MenuComponents />
                <Layout >
                    <Layout.Content style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                        <div className="content" style={{
                            background: 'var(--color-white)',
                            minHeight: 240,
                            width: 1200,
                            padding: 24,
                            margin: 24,
                            borderRadius: 24
                        }}>
                            <Outlet />
                        </div>
                    </Layout.Content>
                </Layout>
            </Layout>


        </>

    )
}

export default App