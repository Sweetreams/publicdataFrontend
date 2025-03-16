import { Space, Typography } from 'antd'
import React from 'react'

const DocumentationPage = () => {
  document.title = 'Документация'
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>


      <div style={{ maxWidth: '900px' }}>
        <Typography.Title level={3} style={{ paddingBottom: '13.2px' }}>Документация</Typography.Title>
        <div style={{ textAlign: 'left' }}>
          <Typography.Title level={4}>Как пользоваться сайтом</Typography.Title>
          <ul type="disc" style={{ paddingBottom: '19.2px', paddingLeft: '24px' }}>
            <li style={{ paddingBottom: '7px' }}><Typography.Text><b>Навигация:</b><br />На главной странице вы найдете ссылки на основные разделы: "Данные", "Аналитика", "Документация" и "О проекте". Используйте меню в левой части сайта для быстрого перехода.</Typography.Text></li>
            <li style={{ paddingBottom: '7px' }}><Typography.Text><b>Публичные данные:</b><br />В разделе "Данные" содержатся публичные данные, которые можно: просомтреть, отфильтровать и отсортировать.</Typography.Text></li>
            <li><Typography.Text><b>Аналитика:</b><br />В разделе "Аналитика" содержатся инструменты для анализа и визуализации публичных данных.</Typography.Text></li>
          </ul>

          <Typography.Title level={4}>Работа с данными</Typography.Title>
          <ul type="disc" style={{ paddingBottom: '19.2px', paddingLeft: '24px' }}>
            <li style={{ paddingBottom: '7px' }}><Typography.Text><b>Источники данных:</b><br />Мы используем только открытые данные из публичных источников: государственные порталы, API, социальные сети и другие ресурсы. Список источников доступен в каждом отчете.</Typography.Text></li>
            <li style={{ paddingBottom: '7px' }}><Typography.Text><b>Форматы данных:</b><br />Данные можно скачать в форматах CSV, JSON и Excel для дальнейшего анализа.</Typography.Text></li>
            <li><Typography.Text><b>Обновление данных:</b><br />Данные обновляются автоматически. Даты последнего обновления указаны в каждом разделе.</Typography.Text></li>
          </ul>

          <Typography.Title level={4}>Инструменты для анализа</Typography.Title>
          <ul type="disc" style={{ paddingBottom: '19.2px', paddingLeft: '24px' }}>
            <li style={{ paddingBottom: '7px' }}><Typography.Text><b>Визуализация:</b><br />Используйте встроенные графики, диаграммы и карты для анализа данных. Вы можете настраивать отображение, выбирая параметры и фильтры.</Typography.Text></li>
            <li style={{ paddingBottom: '7px' }}><Typography.Text><b>Сортировка:</b><br />Все числовые данные можно отсортировать.</Typography.Text></li>
            <li><Typography.Text><b>Фильтрация:</b><br />Все текстовые данные можно отфильтровать</Typography.Text></li>
          </ul>

          <Typography.Title level={4}>Инструменты для анализа</Typography.Title>
          <ul type="disc" style={{ paddingBottom: '19.2px', paddingLeft: '24px' }}>
            <li style={{ paddingBottom: '7px' }}>
              <Space direction='vertical' size="middle">
                <Typography.Text>
                  <b>Пример 1: Анализ ВВП стран мира: </b>
                  <br />
                  Использование графиков, для анализа и визуализации данных.
                </Typography.Text>
                <img src="/example1.png" alt="example1" style={{ width: "500px" }} />
              </Space>
            </li>
            <li style={{ paddingBottom: '7px' }}>
              <Space direction='vertical' size="middle">
                <Typography.Text>
                  <b>Пример 2: Анализ ВВП стран мира и запасы железных руд: </b>
                  <br />
                  Использование графиков, для анализа и визуализации различных данных.
                </Typography.Text>
                <img src="/example2.png"  style={{ width: "500px" }} />
              </Space>
            </li>
            <li>
              <Space direction='vertical' alt="example2" size="middle">
                <Typography.Text>
                  <b>Пример 3: Анализ универитетов стран мира и продажи новых автомобилей: </b>
                  <br />
                  Использование различных графиков, для анализа и визуализации данных
                </Typography.Text>
                <img src="/example3.png" alt="example3" style={{ width: "500px" }} />
              </Space>
            </li>
          </ul>

          <Typography.Title level={4}>Часто задаваемые вопросы (FAQ)</Typography.Title>
          <ul type="disc" style={{ paddingBottom: '19.2px', paddingLeft: '24px' }}>
            <li style={{ paddingBottom: '7px' }}><Typography.Text><b>Как часто обновляются данные?</b><br />Данные обновляются раз в пол года</Typography.Text></li>
            <li style={{ paddingBottom: '7px' }}><Typography.Text><b>Можно ли использовать данные в коммерческих целях?</b><br />Да, все данные открыты и доступны для использования. Убедитесь, что вы соблюдаете лицензии источников.</Typography.Text></li>
            <li><Typography.Text><b>Как связаться с поддержкой?</b><br />Напишите мне на почту: pashasurov12345@gmail.com</Typography.Text></li>
          </ul>
        </div>
      </div>
    </div>

  )
}

export default DocumentationPage