import { Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

const publicDataSearch = () => {
  let { id } = useParams()
  const [data, setData] = useState()
  const [title, setTitle] = useState()

  useEffect(()=> {
    axios.get(`http://localhost:8000/set/getdataset?id=${Number(id)}`, {
      headers: {
        Authorization: Cookies.get('token')
      }}).then((response) => {
        setData(Object.values(response.data.data.message.data))
        setTitle(Object.values(response.data.data.message.title))
      })
  }, [])

  return (
    <>
    
      <Typography.Title level={4}>Публичные данные</Typography.Title>
      <Table columns={title} dataSource={data} />
    </>
  )
}

export default publicDataSearch