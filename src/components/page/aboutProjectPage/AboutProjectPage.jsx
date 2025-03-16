import { Steps, Timeline, Typography } from 'antd'
import React from 'react'

const AboutProjectPage = () => {
  document.title = 'О проекте'

  return (
    <>
    <div style={{display: 'flex', justifyContent: 'center'}}>

    
      <div style={{maxWidth: '900px'}}>
        <Typography.Title level={3} style={{ paddingBottom: '13.2px' }}>О проекте</Typography.Title>
        <div style={{ textAlign: 'left' }}>
          <Typography.Text>Этот сайт — мой pet-проект, созданный с целью исследования, анализа и визуализации публичных данных. Здесь я собираю, обрабатываю и представляю информацию, которая может быть полезна для всех, кто интересуется аналитикой, статистикой и открытыми данными.</Typography.Text>
          <Typography.Title level={4}>Зачем этот проект?</Typography.Title>
          <Typography.Text>Я всегда увлекался работой с данными и хотел создать платформу, где можно было бы не только изучать, но и делиться результатами своих исследований. Этот сайт — моя попытка сделать аналитику публичных данных более доступной и понятной для широкой аудитории.</Typography.Text>
          <Typography.Title level={4}>Что вы найдете здесь?</Typography.Title>
          <ul type="disc" style={{ paddingBottom: '19.2px', paddingLeft: '24px' }}>
            <li style={{ paddingBottom: '7px' }}><Typography.Text><b>Аналитика публичных данных</b>: Я собираю данные из открытых источников (государственные порталы, социальные сети, публичные API и т.д.), анализирую их и делюсь своими выводами.</Typography.Text></li>
            <li style={{ paddingBottom: '7px' }}><Typography.Text><b>Визуализация</b>: Сложные данные становятся понятнее, когда они представлены в виде графиков, диаграмм и интерактивных карт. Здесь вы найдете наглядные примеры.</Typography.Text></li>
            <li><Typography.Text><b>Инструменты для анализа</b>: Я разрабатываю и тестирую различные методы обработки данных, которыми можно воспользоваться для своих исследований.</Typography.Text></li>
          </ul>
          <Typography.Title level={4}>Технологии</Typography.Title>
          <Typography.Text >Для реализации проекта используются современные инструменты и технологии:</Typography.Text>

          <ul type="disc" style={{ paddingBottom: '19.2px', paddingTop: '10px', paddingLeft: '24px' }}>
            <li style={{ paddingBottom: '7px' }}><Typography.Text><b>Языки программирования</b>: JavaScript.</Typography.Text></li>
            <li style={{ paddingBottom: '7px' }}><Typography.Text><b>Библиотеки для анализа и визуализации</b>: antd, antd-charts</Typography.Text></li>
            <li><Typography.Text><b>Библиотеки для backend'a</b>: express-js, prisma.</Typography.Text></li>
          </ul>
          <Typography.Title level={4}>Связь</Typography.Title>
          <Typography.Text>Если у вас есть вопросы, предложения или вы хотите поделиться идеями, напишите мне на pashasurov12345@gmail.com или свяжитесь через telegram: @fireAlarmDoubleRR. Буду рад обратной связи!</Typography.Text>
          <Typography.Title level={4} style={{ paddingBottom: '19.2px' }}>Планы на будущее</Typography.Title>
        </div>
        <div className="container">
          <div className="left_container">
            <Steps
              direction='vertical'
              current={0}
              items={[
                {
                  title: 'Расширение функционала',
                  description:
                    <>
                      <div style={{marginTop: '7px'}}>1. Интерактивные инструменты: </div>
                      <ul style={{ paddingLeft: '20px', paddingBottom: '15px', }}>
                        <li style={{ paddingBottom: '10px', paddingTop: '10px' }}>Добавить возможность фильтрации данных на сайте (например, по регионам, временным периодам)</li>
                        <li>Создать простые калькуляторы или аналитические инструменты (например, прогнозирование на основе данных).</li>
                      </ul>
                      <div >2. Улучшение визуализации: </div>
                      <ul style={{ paddingLeft: '20px' }}>
                        <li style={{ paddingTop: '7px' }}>Внедрить интерактивные графики и карты.</li>
                      </ul>
                    </>,
                  subTitle: '(3–6 месяцев)'
                },
                {
                  title: 'Масштабирование и автоматизация',
                  description: <>
                    <div style={{marginTop: '7px'}}>1. Автоматизация сбора данных: </div>
                    <ul style={{ paddingLeft: '20px', paddingBottom: '15px', }}>
                      <li style={{ paddingBottom: '10px', paddingTop: '10px' }}>Настроить регулярный парсинг и обновление данных из источников.</li>
                      <li>Реализовать уведомления о новых данных или изменениях в существующих.</li>
                    </ul>
                    <div >2. Расширение тематики: </div>
                    <ul style={{ paddingLeft: '20px' }}>
                      <li style={{ paddingTop: '7px' }}>Добавить новые категории аналитики (например, экономика, экология, социальные данные).</li>
                      <li>Провести кросс-анализ данных из разных источников.</li>
                    </ul>
                  </>,
                  subTitle: '(6–12 месяцев)'
                },
                {
                  title: 'Долгосрочные цели',
                  description: <>
                    <div style={{marginTop: '7px'}}>1. Мобильная версия и приложение: </div>
                    <ul style={{ paddingLeft: '20px', paddingBottom: '15px', }}>
                      <li style={{ paddingBottom: '10px', paddingTop: '10px' }}>Разработать мобильную версию сайта или приложение для удобного доступа к данным.</li>
                      <li>Добавить push-уведомления о новых отчетах или обновлениях.</li>
                    </ul>
                    <div >2. API для разработчиков: </div>
                    <ul style={{ paddingLeft: '20px', paddingBottom: '15px', }}>
                      <li style={{ paddingBottom: '10px', paddingTop: '10px' }}>Создать открытое API для доступа к данным сайта.</li>
                      <li>Разработать документацию для интеграции с другими проектами.</li>
                    </ul>
                    <div >3. Машинное обучение и AI: </div>
                    <ul style={{ paddingLeft: '20px' }}>
                      <li style={{ paddingBottom: '7px', paddingTop: '7px' }}>Внедрить алгоритмы машинного обучения для прогнозирования и анализа трендов.</li>
                      <li>Добавить раздел с AI-инструментами для автоматической аналитики.</li>
                    </ul>
                  </>,
                  subTitle: '(1–2 года)'
                },
              ]} />
          </div>

        </div>
      </div>
      </div>
    </>
  )

}

export default AboutProjectPage