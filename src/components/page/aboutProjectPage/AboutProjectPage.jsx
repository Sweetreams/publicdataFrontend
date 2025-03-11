import { Steps, Timeline, Typography } from 'antd'
import React from 'react'

const AboutProjectPage = () => {
  return (
    <>
      <Typography.Title level={4}>О проекте</Typography.Title>
      <div className="container">
        <div className="left_container"
          style={{
            width: '50%'
          }}>
          <Steps
            direction='vertical'
            current={1}
            items={[
              {
                title: 'Подготовка и проектирование',
                description: 'Определение целей: визуализация публичных данных (давление, экология, соц. показатели и т.д.).',
                subTitle: '(Сбор требований)'
              },
              {
                title: 'Подготовка и проектирование',
                description: 'Выбор стека (Vite + React, Ant Design), настройка сервера (Node.js + Express)',
                subTitle: '(Проектирование архитектуры)'
              },
              {
                title: 'Разработка MVP',
                description: 'Реализация обработки данных ("Adj." — корректировка показателей, фильтрация).',
                subTitle: '(Бэкенд)'
              },
              {
                title: 'Разработка MVP',
                description: 'Базовая верстка (Ant Design Components: таблицы, карточки, Steps для пошаговой аналитики).',
                subTitle: '(Фронтенд)'
              },
              {
                title: 'Расширение функционала',
                description: 'Реализация "Timeline Ant Design" для отслеживания изменений данных во времени.',
                subTitle: '(Дополнительные фичи)'
              },
              {
                title: 'Тестирование и доработки',
                description: 'Проверка интерфейса на удобство (фильтры, адаптивность).',
                subTitle: '(Юзабилити-тесты)'
              },
              {
                title: 'Запуск и поддержка',
                description: 'Размещение на хостинге',
                subTitle: '(Деплой)'
              },
            ]} />
        </div>
        <div className="right_container"
          style={{
            width: '50%'
          }}> 
            
        </div>
      </div>

    </>
  )

}

export default AboutProjectPage