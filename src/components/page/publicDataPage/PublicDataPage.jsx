import { Button, Dropdown, message, notification, Spin, Table, Typography, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { csvExport } from '../../units/csvExport'
import { createURLJSON, createURLCSV } from '../../units/createURL'
import './publicDataPage.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { LoadingOutlined } from '@ant-design/icons'

const PublicDataPage = () => {
  const [api, contextHolder] = notification.useNotification()
  const [data, setData] = useState()
  const [dataSet, setDataSet] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://publicdataapi.onrender.com/set/getdata', {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((response) => {
      setLoading(false)
      setData(response.data.data.message)
    }).catch((error) => {
      setLoading(false)
      api.info({
        message: 'Ошибка',
        description: 'Что-то пошло не так!',
        placement: 'bottom'
      })
    })


    axios.get(`https://publicdataapi.onrender.com/set/getdataset?id=12`, {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((response) => {
      setDataSet(response.data.data.message.data[0].data)
    }).catch((error) => {
      api.info({
        message: 'Ошибка',
        description: 'Что-то пошло не так!',
        placement: 'bottom'
      })
    })
  }, [])

  const TransformationMassiv = () => {
    try {
      let massiv = []
      Object.values(data).forEach((el) => {
        massiv.push(el.data)
      })
      return massiv
    } catch (error) {
    }
  }

  const columnData = [
    {
      title: 'Название набора',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Описание набора',
      dataIndex: 'desc',
      key: 'desc'
    },
    {
      title: 'Ответственный за информацию',
      dataIndex: 'owner_data',
      key: 'owner_data'
    },
    {
      title: 'Дата публикации',
      dataIndex: 'date_publication',
      key: 'date_publication'
    },
    {
      title: 'Дата Обновления',
      dataIndex: 'date_update',
      key: 'date_update'
    },
    {
      title: 'Действия',
      key: 'key',
      dataIndex: 'key',
      render: (_, record) => {
        console.log(record)
        return (
          <>
            <Button><Link to={`/publicdate/${_}`} state={record.title}>Посмотреть</Link></Button>
            {contextHolder}
            <Dropdown
              menu={{
                items: [
                  {
                    key: 1,
                    label: "Экспортировать набор",
                    type: 'group',
                    disabled: true,
                    children: [
                      {
                        key: 4,
                        label: 'json'
                      },
                    ]
                  },
                  {
                    key: 2,
                    label: "Экспортировать паспорт",
                    type: 'group',
                    disabled: true,
                    children: [
                      {
                        key: 5,
                        label: 'csv',
                      },
                      {
                        key: 6,
                        label: 'json'
                      }
                    ]
                  },
                ],
                onClick: ({ key }) => {
                  if (key == 5) {
                    const recdata = csvExport(record)
                    recdata != 1 ? createURLCSV(recdata) : (api.info({
                      message: 'Ошибка',
                      description: 'Что-то пошло не так!',
                      placement: 'bottom'
                    }))
                  }
                  else if (key == 6) {
                    !Object.values(record).length ? (api.info({
                      message: 'Ошибка',
                      description: 'Что-то пошло не так!',
                      placement: 'bottom'
                    })) : createURLJSON(JSON.stringify(record, null, 2))
                  }
                  else if (key == 4) {
                    console.log(dataSet)
                    !Object.values(dataSet).length ? (api.info({
                      message: 'Ошибка',
                      description: 'Что-то пошло не так!',
                      placement: 'bottom'
                    })) : createURLJSON(JSON.stringify(dataSet, null, 2))
                  }
                }
              }}
            >
              <Button>Экспорт</Button>
            </Dropdown>
          </>
        )
      }
    }
  ]

  return (
    <>
      <Typography.Title level={4}>Публичные данные</Typography.Title>
      <Spin spinning={loading} indicator={<LoadingOutlined style={{ color: "var(--color-fbee)" }} />} size='large'>
        <Table columns={columnData} dataSource={TransformationMassiv()} />
      </Spin>


    </>

  )
}

export default PublicDataPage