import { Button, Input, notification, Space, Spin, Table, Typography } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons'
import instance from '../../units/api'

const publicDataSearch = () => {
  let { id } = useParams()
  const [api, contextHolder] = notification.useNotification()
  const [data, setData] = useState([])
  const [title, setTitle] = useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}

      >
        <Input
          ref={searchInput}
          placeholder={`Поиск...`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Поиск
          </Button>
          <Button
            onClick={() => clearFilters()}
            size="small"
            style={{
              width: 90,
            }}
          >
            Сброс
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Закрыть
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

  });

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