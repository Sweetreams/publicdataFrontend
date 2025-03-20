import { Button, Input, notification, Space, Spin, Table, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import instance from '../../units/api'
import { getColumnSearchProps } from '../../component/columnSearch/getColumnSearchProps'

const publicDataSearch = () => {
  let { id } = useParams()
  const [api, contextHolder] = notification.useNotification()
  const [data, setData] = useState([])
  const [title, setTitle] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation();

  useEffect(() => {
    instance.get(`https://publicdataapi.onrender.com/set/getdataset?id=${Number(id)}`).then((response) => {
      setData(Object.values(response.data.data.message.data[0].data.data))
      setTitle(Object.values(response.data.data.message.data[0].data.title).map((el) => {
        if (el.filter) {
          delete el["filter"]
          el['filterDropdown'] = getColumnSearchProps(el.dataIndex)['filterDropdown']
          el['filterIcon'] = getColumnSearchProps(el.dataIndex)['filterIcon']
          el['onFilter'] = getColumnSearchProps(el.dataIndex)['onFilter']
        }
        if (el.sorter) {
          
          el["sorter"] = eval(`(a, b) => a.${el.dataIndex} - b.${el.dataIndex}`)
        }
        return el
      }))
      setLoading(false)
    }).catch((error) => {
      api.info({
        message: 'Ошибка',
        description: 'Что-то пошло не так!',
        placement: 'bottom'
      })
    })
  }, [])

  return (
    <>
      {contextHolder}
      <Typography.Title level={4}>{location.state}</Typography.Title>
      <Spin spinning={loading} indicator={<LoadingOutlined style={{ color: "var(--color-fbee)" }} />} size='large'>
        <Table columns={title} dataSource={data} />
      </Spin>

    </>
  )
}

export default publicDataSearch