import { Form, Input } from 'antd'
import React from 'react'

const InputsAuthReg = ({ props }) => {
  return (
    <>
      {props.map((element) => {
        return (
        <Form.Item
          layout='vertical'
          label={element.label}
          name={element.name}
          style={{ marginBottom: '40px' }}
        >
          {element.name == "password"
          ? <Input.Password placeholder={element.label} style={{ width: '450px', color: "var(--color-3333)" }}></Input.Password>
          : <Input placeholder={element.label} style={{ width: '450px', color: "var(--color-3333)" }}></Input>}
        </Form.Item>)
      })}
    </>
  )
}

export default InputsAuthReg