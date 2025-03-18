import { Typography } from 'antd'
import React from 'react'

const Ul = (
    {
     props: props,
     title: title
    }) => {
    return (
        <>
            {title == undefined ? <></> : <Typography.Title level={4}>{title}</Typography.Title>}
            <ul type="disc" style={{ paddingBottom: '19.2px', paddingLeft: '24px', paddingTop: title == undefined ? '10px' : '0px' }}>
                {props?.map((el, index) => {
                    return props.length - 1 == index
                    ? <li><Typography.Text><b>{el.title}</b> : {el.value}</Typography.Text></li>
                    : <li style={{ paddingBottom: '7px' }}><Typography.Text><b>{el.title}</b> : {el.value}</Typography.Text></li>
                })}
                
            </ul>
        </>
    )
}

export default Ul