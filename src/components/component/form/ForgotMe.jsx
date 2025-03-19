import { Checkbox, Form } from 'antd'
import React from 'react'

const ForgotMe = () => {
    return (
        <Form.Item
            style={{ marginBottom: '10px', display: 'flex' }}>
            <Checkbox style={{ fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)" }}>Запомнить меня</Checkbox>
        </Form.Item>
    )
}

export default ForgotMe