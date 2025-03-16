import { Button, DatePicker, Dropdown, Form, Input, message, Modal, notification, Space, Spin, Table, Typography, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { csvExport } from '../../units/csvExport'
import { createURLJSON, createURLCSV } from '../../units/createURL'
import './publicDataPage.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import { LoadingOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { jwtDecode } from 'jwt-decode'

const PublicDataPage = () => {
  const [api, contextHolder] = notification.useNotification()
  const [data, setData] = useState()
  const [dataSet, setDataSet] = useState()
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  document.title = 'Данные'

  const getDataForExport = (id) => {
    axios.get(`https://publicdataapi.onrender.com/set/getdataset?id=${Number(id)}`, {
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

  const onDelete = (record) => {
    axios.delete('https://publicdataapi.onrender.com/set/deletesetdbanddataset', {
      data: {
        id: record.key
      },
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((response) => {
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
    console.log()
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

  const onFinish = (values) => {

    axios.post('https://publicdataapi.onrender.com/set/createsetanddataset',
      {
        set: {
          "title": values.title,
          "desc": values.desc,
          "owner_data": values.owner_data,
          "format_data": values.format_data,
          "date_publication": values.date_publication.format('DD.MM.YYYY'),
          "date_update": values.date_update.format('DD.MM.YYYY')
        },
        data: JSON.parse(values.dataset)
      }, {
      headers: {
        Authorization: Cookies.get('token')
      }
    })
      .then((response) => {
        setIsModalOpen(false)
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
            <Form.Item
              layout='vertical'
              label='Заголовок'
              name='title'
              rules={[{ required: true }]}
              style={{ marginBottom: '40px' }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              layout='vertical'
              label='Описание'
              name='desc'
              rules={[{ required: true }]}
              style={{ marginBottom: '60px' }}>
              <TextArea />
            </Form.Item>

            <Form.Item
              layout='vertical'
              label='Ответственный за информацию'
              name='owner_data'
              rules={[{ required: true }]}
              style={{ marginBottom: '40px' }}>
              <Input />
            </Form.Item>

            <Form.Item
              layout='vertical'
              label='Формат данных'
              name='format_data'
              rules={[{ required: true }]}
              style={{ marginBottom: '40px' }}>
              <Input />
            </Form.Item>
            <Form.Item
              layout='vertical'
              label='Дата публикации'
              name='date_publication'
              rules={[{ required: true }]}
              style={{ marginBottom: '40px' }}>
              <DatePicker />
            </Form.Item>
            <Form.Item
              layout='vertical'
              label='Дата обновления'
              name='date_update'
              rules={[{ required: true }]}
              style={{ marginBottom: '60px' }}>
              <DatePicker />
            </Form.Item>
            <Form.Item
              layout='vertical'
              label='Данные набора'
              name='dataset'
              rules={[{ required: true }]}
              style={{ marginBottom: '60px' }}>
              <TextArea />
            </Form.Item>
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
        <br/>

      <Spin spinning={loading} indicator={<LoadingOutlined style={{ color: "var(--color-fbee)" }} />} size='large'>
        <Table columns={columnData} dataSource={TransformationMassiv()} />
      </Spin>


    </>

  )
}

export default PublicDataPage