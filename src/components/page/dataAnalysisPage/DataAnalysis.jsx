import React, { useEffect, useRef, useState } from 'react'
import { notification, Select, Table, Typography } from 'antd'
import Cookies from 'js-cookie'
import '../../../styles/color.css'
import instance from '../../units/api'
import { getColumnSearchProps } from '../../component/columnSearch/getColumnSearchProps'
import { typeChart } from '../../units/typeChart'

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

  const [name1, setName1] = useState()
  const [name2, setName2] = useState()

  document.title = 'Аналитика данных'

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

  const onChangeName = (values, options) => {
    options.top == 1 ? setName1(values.value) : setName2(values.value)
  }

  //перенести в другой файл
  

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
                onChange={(value, options) => onChangeName(value, options)}
                placeholder="Тип графика..."
                options={[
                  {
                    value: 'Area',
                    label: 'Area',
                    top: 1
                  },
                  {
                    value: 'Scatter',
                    label: 'Scatter',
                    top: 1
                  },
                  {
                    value: 'Bar',
                    label: 'Bar',
                    top: 1
                  },
                  {
                    value: 'Line',
                    label: 'Line',
                    top: 1
                  },
                  {
                    value: 'Pie',
                    label: 'Pie',
                    top: 1
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
                onChange={(value, options) => onChangeName(value, options)}
                placeholder="Тип графика..."
                options={[
                  {
                    value: 'Area',
                    label: 'Area',
                    top: 2
                  },
                  {
                    value: 'Scatter',
                    label: 'Scatter',
                    top: 2
                  },
                  {
                    value: 'Bar',
                    label: 'Bar',
                    top: 2
                  },
                  {
                    value: 'Line',
                    label: 'Line',
                    top: 2
                  },
                  {
                    value: 'Pie',
                    label: 'Pie',
                    top: 2
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