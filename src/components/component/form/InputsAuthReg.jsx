import { Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'

const InputsAuthReg = ({ items }) => {
  return (
    <>
      {items.map((element) => {
        return (
        <Form.Item
          layout='vertical'
          label={element.label}
          name={element.name}
          style={{ marginBottom: element.name == "dataset" || element.name == "desc" ? '60px' :  '40px' }}
        >
          {element.name == "password"
          ? <Input.Password placeholder={element.label} style={{ width: '450px', color: "var(--color-3333)" }}></Input.Password>
          : element.name == "dataset" || element.name == "desc"
          ? <TextArea placeholder={element.label} style={{ width: '450px', color: "var(--color-3333)" }}></TextArea>
          : <Input placeholder={element.label} style={{ width: '450px', color: "var(--color-3333)" }}></Input>}
        </Form.Item>)
      })}
    </>
  )
}

export default InputsAuthReg