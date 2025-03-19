import { Button, Form, Typography } from 'antd'
import React from 'react'

const SendButton = ({ name }) => {
    return (
        <Form.Item>
            <Button
                style={{ width: '130px' }} htmlType='submit'> <Typography.Text style={{ fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)", paddingTop: "3px" }}>{name}</Typography.Text> </Button>
        </Form.Item>
    )
}

export default SendButton