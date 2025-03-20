import { Button, Dropdown, Form, Modal, notification, Space, Spin, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { csvExport } from '../../units/csvExport'
import { createURL } from '../../units/createURL'
import './publicDataPage.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { LoadingOutlined } from '@ant-design/icons'
import { jwtDecode } from 'jwt-decode'
import instance, { createData, deleteData } from '../../units/api'
import InputsAuthReg from '../../component/form/InputsAuthReg'
import { TransformationMassiv } from '../../units/transformationMassiv'

const PublicDataPage = () => {
  const [api, contextHolder] = notification.useNotification()
  const [data, setData] = useState()
  const [dataSet, setDataSet] = useState()
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  document.title = 'Данные'

  const getDataForExport = (id) => {
    instance.get(`https://publicdataapi.onrender.com/set/getdataset?id=${Number(id)}`, {
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
  }

  useEffect(() => {
    instance.get('/set/getdata').then((response) => {
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
  }, [])

  const onDelete = (record) => {
    deleteData.request({ data: { id: record.key } }).then((response) => {
      api.info({
        message: 'Успешно',
        description: 'Запись удалена',
        placement: 'bottom'
      })
    }).catch((error) => {
      api.info({
        message: 'Ошибка',
        description: 'Запись не удалена',
        placement: 'bottom'
      })
    })

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
      title: 'Дата обновления',
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
            <Space direction='vertical'>
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
                    getDataForExport(_)
                    if (key == 5) {
                      const recdata = csvExport(record)
                      recdata != 1 ? createURL(recdata, 'csv') : (api.info({
                        message: 'Ошибка',
                        description: 'Что-то пошло не так!',
                        placement: 'bottom'
                      }))
                    }
                    !Object.values(key == 4 ? dataSet : key == 6 ? record : null).length ? (api.info({
                      message: 'Ошибка',
                      description: 'Что-то пошло не так!',
                      placement: 'bottom'
                    })) : createURL(JSON.stringify(key == 4 ? dataSet : key == 6 ? record : null, null, 2), 'json')
                  }
                }}
              >
                <Button>Экспорт</Button>
              </Dropdown>
              {jwtDecode(Cookies.get('token')).role == 'admin' ? <><Button onClick={() => onDelete(record)}>Удалить</Button></> : <></>}
            </Space>
          </>
        )
      }
    }
  ]

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  // Сделать проверку на добавление

  const onFinish = (values) => {
    createData.request({
      data: {
        set: {
          "title": values.title,
          "desc": values.desc,
          "owner_data": values.owner_data,
          "format_data": values.format_data,
          "date_publication": values.date_publication.format('DD.MM.YYYY'),
          "date_update": values.date_update.format('DD.MM.YYYY')
        }, data: JSON.parse(values.dataset)
      }
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      setLoading(false)
      api.info({
        message: 'Ошибка',
        description: error.response.data.error.message,
        placement: 'bottom'
      })
    })
  }

  return (
    <>
      {jwtDecode(Cookies.get('token')).role == 'admin' ? (<>
        <Modal title='Форма заполнения данных' open={isModalOpen} onCancel={handleCancel}
          footer={<></>}>
          <Form
            onFinish={onFinish}
            name='formAuth'
            variant='filled'>
            <InputsAuthReg items={[
              {
                label: "Заголовок",
                name: "title"
              },
              {
                label: "Описание",
                name: "desc"
              },
              {
                label: "Ответственный за информацию",
                name: "owner_data"
              },
              {
                label: "Формат данных",
                name: "format_data"
              },
              {
                label: "Дата публикации",
                name: "date_publication"
              },
              {
                label: "Дата обновления",
                name: "date_update"
              },
              {
                label: "Данные набора",
                name: "dataset"
              },
            ]} />
            <div style={{ gap: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <Form.Item>
                <Button onClick={handleCancel}>Выйти</Button>
              </Form.Item>
              <Form.Item>
                <Button htmlType='submit' onClick={handleCancel}>Отправить</Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
        <div className="up_container" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <Typography.Title level={4}>Публичные данные</Typography.Title>
          <Button onClick={showModal}>Импорт</Button>
        </div></>) : <Typography.Title level={4}>Публичные данные</Typography.Title>}
      <br />
      <Spin spinning={loading} indicator={<LoadingOutlined style={{ color: "var(--color-fbee)" }} />} size='large'>
        <Table columns={columnData} dataSource={TransformationMassiv(data)} />
      </Spin>
    </>

  )
}

export default PublicDataPage