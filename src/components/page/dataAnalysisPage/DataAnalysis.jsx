import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, notification, Select, Space, Table, Typography } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Area, Bar, Heatmap, Line, Pie, Scatter } from '@ant-design/charts'
import '../../../styles/color.css'
import { SearchOutlined } from '@ant-design/icons'
import instance from '../../units/instance'

const DataAnalysis = () => {
  const [api, contextHolder] = notification.useNotification()
  const [title, setTitle] = useState()
  const [loading, setLoading] = useState(true)

  const [titleDataSetForDG1, setTitleDataSetForDG1] = useState()
  const [titleDataSetForDG2, setTitleDataSetForDG2] = useState()

  const [titleDataSet, setTitleDataSet] = useState()

  const [dataSet1, setDataSet1] = useState([])
  const [dataSet2, setDataSet2] = useState([])

  const [idURL1, setIdURL1] = useState("")
  const [idURL2, setIdURL2] = useState("")

  const [xArg1, setXArg1] = useState("")
  const [yArg1, setYArg1] = useState("")
  const [xArg2, setXArg2] = useState("")
  const [yArg2, setYArg2] = useState("")

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const [name1, setName1] = useState(Area)
  const [name2, setName2] = useState(Area)
  const searchInput = useRef(null);
  document.title = 'Аналитика данных'

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
    instance.get(`https://publicdataapi.onrender.com/set/getdataset?id=${idURL1}`, {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((response) => {
      //title и англ. название
      let tr = []
      const ms = Object.values(response.data.data.message.data[0].data.title)

      setTitleDataSet(Object.values(response.data.data.message.data[0].data.title).map((el) => {

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

      ms.forEach((index, element) => {
        tr.push({ "label": index.title, "value": index.dataIndex })
      });

      setTitleDataSetForDG1(tr)
      //data
      setDataSet1(Object.values(response.data.data.message.data[0].data.data))
    }).catch((error) => {
    })
  }, [idURL1])

  useEffect(() => {
    instance.get(`https://publicdataapi.onrender.com/set/getdataset?id=${idURL2}`, {
      headers: {
        Authorization: Cookies.get('token')
      }
    }).then((response) => {
      //title и англ. название
      let tr = []
      const ms = Object.values(response.data.data.message.data[0].data.title)

      ms.forEach((index, element) => {
        tr.push({ "label": index.title, "value": index.dataIndex })
      });
      setTitleDataSetForDG2(tr)
      //data
      setDataSet2(Object.values(response.data.data.message.data[0].data.data))
    }).catch((error) => {
    })
  }, [idURL2])

  useEffect(() => {
    instance.get('https://publicdataapi.onrender.com/set/getdata').then((response) => {
      const tr = []
      response.data.data.message.forEach(element => {
        tr.push({ "label": element.data.title, "value": element.data.title, "id": element.data.title, 'key': element.data.key })
      });
      setTitle(tr)
      setLoading(false)
    }).catch((error) => {
      api.info({
        message: 'Ошибка',
        description: 'Что-то пошло не так!',
        placement: 'bottom'
      })
    })
  }, [])

  const onChangeURL1 = (values) => {
    setIdURL1(Number(values.key))
  }

  const onChangeURL2 = (values) => {
    setIdURL2(Number(values.key))
  }

  const onChangeX1 = (values) => {
    setXArg1(values.value)
  }

  const onChangeX2 = (values) => {
    setXArg2(values.value)
  }

  const onChangeY1 = (values) => {
    setYArg1(values.value)
  }

  const onChangeY2 = (values) => {
    setYArg2(values.value)
  }

  const typeChart = {

    Line: Line,
    Area: Area,
    Scatter: Scatter,
    Bar: Bar,
    Pie: Pie
  }

  const onChangeName1 = (values) => {
    setName1(values.value)
  }

  const onChangeName2 = (values) => {
    setName2(values.value)
  }

  const ChartComponent1 = typeChart[name1];
  const ChartComponent2 = typeChart[name2];

  return (


    <>
    
      {contextHolder}
      <Typography.Title level={4}>Аналитика данных</Typography.Title>
      <br/>
      <div className="container">
        <div className="up_container" style={{ display: 'flex', justifyContent: 'space-around', paddingBottom: "30px" }}>
          <Select
            style={{ width: '200px' }}
            loading={loading}
            onChange={onChangeURL1}
            labelInValue
            placeholder="Набор..."
            options={title}
          />

          <Select
            style={{ width: '200px' }}
            loading={loading}
            onChange={onChangeURL2}
            labelInValue
            placeholder="Набор..."
            options={title}
          />
        </div>
        <div className="middle_container" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="left_middle_container" style={{ width: "500px" }}>
            <div className="search_container" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Select
                style={{ width: '140px' }}
                loading={loading}
                labelInValue
                onChange={onChangeName1}
                placeholder="Тип графика..."
                options={[
                  {
                    value: 'Area',
                    label: 'Area',
                  },
                  {
                    value: 'Scatter',
                    label: 'Scatter',
                  },
                  {
                    value: 'Bar',
                    label: 'Bar',
                  },
                  {
                    value: 'Line',
                    label: 'Line',
                  },
                  {
                    value: 'Pie',
                    label: 'Pie',
                  },
                ]}
              />
              <Select
                style={{ width: '140px' }}
                loading={loading}
                labelInValue
                onChange={onChangeX1}
                placeholder="Ось x..."
                options={titleDataSetForDG1}
              />
              <Select
                style={{ width: '140px' }}
                loading={loading}
                labelInValue
                onChange={onChangeY1}
                placeholder="Ось y..."
                options={titleDataSetForDG1}
              />
            </div>
            <div className="area_container" style={{ width: "500px", height: "500px" }}>
              {
                ChartComponent1 && (
                  <ChartComponent1
                    style={{
                      fill: 'linear-gradient(-90deg, #EAEECA, #FBEECE)',
                    }}
                    xField={xArg1}
                    yField={yArg1}
                    data={dataSet1} />
                )
              }
            </div>


          </div>
          <div className="right_middle_container" style={{ width: "500px" }}>
            <div className="search_container" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <Select
                style={{ width: '140px' }}
                loading={loading}
                labelInValue
                onChange={onChangeName2}
                placeholder="Тип графика..."
                options={[
                  {
                    value: 'Area',
                    label: 'Area',
                  },
                  {
                    value: 'Scatter',
                    label: 'Scatter',
                  },
                  {
                    value: 'Bar',
                    label: 'Bar',
                  },
                  {
                    value: 'Line',
                    label: 'Line',
                  },
                  {
                    value: 'Pie',
                    label: 'Pie',
                  },
                ]}
              />
              <Select
                style={{ width: '140px' }}
                loading={loading}
                labelInValue
                onChange={onChangeX2}
                placeholder="Ось x..."
                options={titleDataSetForDG2}
              />
              <Select
                style={{ width: '140px' }}
                loading={loading}
                labelInValue
                onChange={onChangeY2}
                placeholder="Ось y..."
                options={titleDataSetForDG2}
              />
            </div>
            <div className="area_container" style={{ width: "500px", height: "500px" }}>


              {
                ChartComponent2 && (
                  <ChartComponent2
                    style={{
                      fill: 'linear-gradient(-90deg, #EAEECA, #FBEECE)',
                    }}
                    xField={xArg2}
                    yField={yArg2}
                    data={dataSet2} />
                )
              }
            </div>
          </div>

        </div>
        <div className="down_container">
          <Table columns={titleDataSet} dataSource={dataSet1} />
        </div>
      </div >
    </>

  )
}

export default DataAnalysis