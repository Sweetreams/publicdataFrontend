import { notification, Spin, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import { LoadingOutlined } from '@ant-design/icons'

const publicDataSearch = () => {
  let { id } = useParams()
  const [api, contextHolder] = notification.useNotification()
  const [data, setData] = useState()
  const [title, setTitle] = useState()
  const [loading, setLoading] = useState(true)
  const location = useLocation();

  useEffect(() => {
    axios.get(`https://publicdataapi.onrender.com/set/getdataset?id=${Number(id)}`, {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((response) => {
      console.log(response)
      setData(Object.values(response.data.data.message.data[0].data.data))
      setTitle(Object.values(response.data.data.message.data[0].data.title))
      setLoading(false)
    }).catch((error) => {
      console.log(error)
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