import { BarChartOutlined, DatabaseOutlined, FileOutlined, ForkOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Affix, Button, Menu } from 'antd'
import '../../../styles/color.css'
import '../../../styles/fonts.css'
import './menuComponents.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const MenuComponents = () => {
    const [collapse, setCollapse] = useState(false)

    const items = [
        {
            key: '1',
            label: <Link to='/publicdate'>Данные</Link>,
            icon: <DatabaseOutlined />

        },
        {
            key: '2',
            label: <Link to='/dataanalysis'>Аналитика</Link>,
            icon: <BarChartOutlined />
        },
        {
            key: '3',
            label: <Link to='/documentation'>Документация</Link>,
            icon: <FileOutlined />
        },
        {
            key: '4',
            label: <Link to='/profile'>Профиль</Link>,
            icon: <UserOutlined />
        },
        {
            key: '5',
            label: <Link to='/aboutproject'>О проекте</Link>,
            icon: <ForkOutlined />

        },
    ]

    return (
        <Affix offsetTop={0} >
            <div style={{ width: collapse ? 80 : 256 }}>

                <Link to='/publicdate'><img src={collapse ? '/' + "logosrez.svg" : '/' + "logo.svg"} style={{ position: 'absolute', left: collapse ? 5 : 60, paddingTop: 10 }} /></Link>

                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode='inline'
                    theme='light'
                    style={{ height: '100vh', fontFamily: "TT Commons", fontWeight: 400, color: "var(--color-3333)", paddingTop: 60, width: collapse ? 80 : 256 }}
                    inlineCollapsed={collapse}
                    items={items} />
                <div style={{position: 'absolute'}}>
                    <Button
                        type="primary"
                        style={{ position: 'absolute', bottom: collapse ? '60px' : '15px', left: collapse ? '17.2px' : '80px' }}>
                        <SettingOutlined />
                    </Button>

                    <Button
                        type="primary"
                        onClick={() => setCollapse(!collapse)}
                        style={{ position: 'absolute', bottom: '15px', left: '17.2px' }}
                    >
                        {collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>
                </div>

            </div>
        </Affix>


    )
}

export default MenuComponents