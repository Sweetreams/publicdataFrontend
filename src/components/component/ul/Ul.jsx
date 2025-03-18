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
                    return <li style={{ paddingBottom: props.length - 1 == index ? '0px' : '7px' }}><Typography.Text><b>{el.title}</b> : {el.value}</Typography.Text></li>
                })}

            </ul>
        </>
    )
}

Ul.roadmap = ({
    props: props,
}) => {
    
    return (
        <>
            {props.map((element, index) => {
                return (<>
                    <div style={{ marginTop: '7px' }}>{element.title}: </div>
                    <ul style={{ paddingLeft: '20px', paddingBottom: element.value.length == index ? '0px' : '10px', }}>
                        {element.value.map((elements, indexx) => {
                            console.log(element.value.length, indexx + 1)
                            return  <li style={{ paddingBottom: element.value.length != indexx + 1 || element.value.length == 1  ? '7px' : '0px', paddingTop: element.value.length != indexx + 1 || element.value.length == 1 ? '7px' : '0px' }}>{elements}</li>
                        })}
                    </ul>
                </>)
            })}
        </>
    )
}

export default Ul