import { Space, Typography } from 'antd'
import React from 'react'
import Ul from '../../component/ul/Ul'

const DocumentationPage = () => {
  document.title = 'Документация'
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>


      <div style={{ maxWidth: '900px' }}>
        <Typography.Title level={3} style={{ paddingBottom: '13.2px' }}>Документация</Typography.Title>
        <div style={{ textAlign: 'left' }}>
          <Ul
            title="Как пользоваться сайтом?"
            props={[
              {
                title: "Навигация",
                value: `На главной странице вы найдете ссылки на основные разделы: "Данные", "Аналитика", "Документация" и "О проекте". Используйте меню в левой части сайта для быстрого перехода.`
              },
              {
                title: "Публичные данные",
                value: `В разделе "Данные" содержатся публичные данные, которые можно: просомтреть, отфильтровать и отсортировать.`
              },
              {
                title: "Аналитика",
                value: `В разделе "Аналитика" содержатся инструменты для анализа и визуализации публичных данных.`
              },
            ]
            } />

          <Ul
            title="Работа с данными"
            props={[
              {
                title: "Источники данных",
                value: `Мы используем только открытые данные из публичных источников: государственные порталы, API, социальные сети и другие ресурсы. Список источников доступен в каждом отчете.`
              },
              {
                title: "Форматы данных",
                value: `Данные можно скачать в форматах CSV, JSON и Excel для дальнейшего анализа.`
              },
              {
                title: "Обновление данных",
                value: `Данные обновляются автоматически. Даты последнего обновления указаны в каждом разделе.`
              },
            ]
            } />

          <Ul
            title="Инструменты для анализа"
            props={[
              {
                title: "Визуализация",
                value: `Используйте встроенные графики, диаграммы и карты для анализа данных. Вы можете настраивать отображение, выбирая параметры и фильтры.`
              },
              {
                title: "Сортировка",
                value: `Все числовые данные можно отсортировать.`
              },
              {
                title: "Фильтрация",
                value: `Все текстовые данные можно отфильтровать.`
              },
            ]
            } />

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
                <img src="/example2.png" style={{ width: "500px" }} />
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

          <Ul
            title="Часто задаваемые вопросы (FAQ)"
            props={[
              {
                title: "Как часто обновляются данные?",
                value: `Данные обновляются раз в пол года.`
              },
              {
                title: "Можно ли использовать данные в коммерческих целях?",
                value: `Да, все данные открыты и доступны для использования. Убедитесь, что вы соблюдаете лицензии источников.`
              },
              {
                title: "Как связаться с поддержкой?",
                value: `Напишите мне на почту: pashasurov12345@gmail.com.`
              },
            ]
            } />
        </div>
      </div>
    </div>

  )
}

export default DocumentationPage