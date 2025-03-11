import { Button, Dropdown, message, notification, Table, Typography, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { csvExport } from '../../units/csvExport'
import { createURLJSON, createURLCSV } from '../../units/createURL'
import './publicDataPage.css'
import axios from 'axios'
import Cookies from 'js-cookie'

const PublicDataPage = () => {
  const [api, contextHolder] = notification.useNotification()
  const [data, setData] = useState()

  useEffect(()=> {
    axios.get('http://localhost:8000/set/getdata', {
      headers: {
        Authorization: Cookies.get('token')
      }}).then((response) => {
        setData(response.data.data.message)
      })
  }, [])

  const TransformationMassiv = () => {
    try {
      let massiv = []
      Object.values(data).forEach((el)=> {
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
        return (
          <>
            <Button><Link to={`/publicdate/${_}`}>Посмотреть</Link></Button>
            {contextHolder}
            <Dropdown
              menu={{
                items: [
                  {
                    key: 1,
                    label: 'csv',
                  },
                  {
                    key: 2,
                    label: 'json'
                  },
                ],
                onClick: ({ key }) => {
                  if (key == 1) {
                    const recdata = csvExport(record)
                    console.log(recdata)
                    if (recdata != 1) {
                      createURLCSV(recdata)
                    } else {
                      api.info({
                        message: 'Ошибка',
                        description: 'Что-то пошло не так!',
                        placement: 'bottom'
                      })
                    }
                  } else if (key == 2) {
                    if (!Object.values(record).length) {
                      api.info({
                        message: 'Ошибка',
                        description: 'Что-то пошло не так!',
                        placement: 'bottom'
                      })
                    } else {
                      createURLJSON(JSON.stringify(record, null, 2))
                    }
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
      <Table columns={columnData} dataSource={TransformationMassiv()} />
    </>

  )
}

export default PublicDataPage