import { Typography } from 'antd'
import React from 'react'

const LinkForm = ({props}) => {
  return (
    <Typography.Text style={{ marginBottom: '10px', fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)" }}>{props.text}, <Typography.Link className='regLink' style={{ fontFamily: "TT Commons", fontWeight: 400, fontSize: 16, color: "var(--color-3333)" }} href={props.link}>{props.desc}</Typography.Link></Typography.Text>
  )
}

export default LinkForm