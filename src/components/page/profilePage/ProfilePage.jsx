import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Typography } from 'antd'
const ProfilePage = () => {
  const [data, setData] = useState()

  axios.get('https://publicdataapi.onrender.com/user/profile', {
    headers: {
      Authorization: Cookies.get('token')
    }
  })
    .then((response) => {
      console.log()
      setData(response.data.data.message)
    }).catch(function (error) {
      console.log(error);
    })
  return (
    <>
      <div className="up_container"
      style={{display: 'flex', flexDirection: 'row'}}>
        <div className="up_left_container"
        style={{width: '25%'}}>

        </div>
        <div className="up_right_container"
        style={{width: '75%'}}>
          <Typography.Text>{data}</Typography.Text>
        </div>
      </div>
      <div className="down_container">

      </div>
    </>
  )
}

export default ProfilePage