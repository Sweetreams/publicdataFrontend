import React from 'react'
import MenuComponents from './components/component/menu/MenuComponents'
import { Layout } from 'antd'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'
import "./styles/color.css"

const App = () => {
    if(Cookies.get('token') == undefined){
        return <Navigate to="publicdata-frontend-git-main-pavels-projects-089fe0b1.vercel.app/auth" replace/>
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