
import React, { useState } from 'react'

const GENERATORS = {
  Картинка: [
    'Шедеврум',
    'Kandinsky',
    'YandexART',
    'Midjourney',
    'DALL·E',
    'Stable Diffusion',
    'Flux'
  ],
  Видео: [
    'Kling',
    'Runway',
    'Sora',
    'Veo',
    'Pika',
    'Hailuo'
  ],
  Музыка: [
    'Suno',
    'Udio',
    'Mubert'
  ],
  Текст: [
    'YandexGPT',
    'GigaChat',
    'ChatGPT',
    'Claude',
    'Gemini'
  ]
}

export default function App() {
    const [page, setPage] = useState('home')
  const [showHelp, setShowHelp] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedGenerators, setSelectedGenerators] = useState({})
  const [showAllGenerators, setShowAllGenerators] = useState(false)
  const [activeCategory, setActiveCategory] = useState('')

    return (
    <main className="app">

      <header className="header">

        <div className="header-tools">
                    <span
            title="История"
            onClick={() => setShowHistory(true)}
          >
            ◷
          </span>
                    <span
            title="Настройки"
            onClick={() => setPage('settings')}
          >
            ⚙
          </span>
          <span title="Профиль">♙</span>
          <span title="О продукте">ⓘ</span>
          <button
            className="help-button"
            onClick={() => setShowHelp(!showHelp)}
            aria-label="Помощь"
          >
            ?
          </button>
        </div>

                        <div className="header-brand">
          <div className="logo">AI</div>
          <div>
            <h1>PROMPT STUDIO</h1>
            <p>Твои идеи — наш результат.</p>
          </div>
        </div>

            </header>

      {showHistory && (
        <div
          className="history-overlay"
          onClick={() => setShowHistory(false)}
        >
          <div
            className="history-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="history-header">
              <h2>История</h2>
              <button
                className="history-close"
                onClick={() => setShowHistory(false)}
              >
                ✕
              </button>
            </div>

            <div className="history-content">
              <p>Здесь будет храниться твоя история.</p>
              <p>Промпты, сообщения, переписки и сохранённые материалы.</p>
            </div>
          </div>
        </div>
      )}

            {page === 'home' && showHelp && (
        <div className="help-overlay">
          <div className="help-card">
            <button
              className="help-close"
              onClick={() => setShowHelp(false)}
            >
              ✕
            </button>

            <h2>Что умеет AI Prompt Studio?</h2>

            <p>
              Превращает твои идеи в точные и продуманные запросы,
              адаптированные под выбранный AI-генератор.
            </p>

            <p>
              Помогает создавать и улучшать сообщения:
              исправлять ошибки, менять формулировки,
              длину и стиль текста.
            </p>

            <p>
              <strong>
                Меньше лишних слов. Меньше неудачных попыток.
                Больше точности и качественных результатов.
              </strong>
            </p>
          </div>
        </div>
      )}

      {page === 'home' && (
        <section className="home">
          
                              <button
            className="main-button prompt"
            onClick={() => setPage('prompt')}
          >
            <span className="button-icon">🪄</span>
            <span>ПРОМПТ</span>
            <small>Создать запрос для AI</small>
          </button>

          <button
            className="main-button message"
            onClick={() => setPage('message')}
          >
            <span className="button-icon">💬</span>
            <span>СООБЩЕНИЕ</span>
            <small>Создать красивое сообщение</small>
          </button>

          <div className="ad-placeholder">
            <span>РЕКЛАМНОЕ МЕСТО</span>
          </div>
                    <footer className="app-footer">
            AI PROMPT STUDIO 2.0
          </footer>
        </section>
      )}

      {page === 'prompt' && (
        <section className="work-page">
          <button className="back" onClick={() => setPage('home')}>
            ← Назад
          </button>

          <h2>Создаём промпт</h2>
          <p className="hint">Что будем создавать?</p>

          <div className="categories">
            {[
              { name: 'Картинка', icon: '🖼️' },
              { name: 'Видео', icon: '🎥' },
              { name: 'Музыка', icon: '🎵' },
              { name: 'Текст', icon: '📝' }
            ].map(item => (
              <div className="category-wrapper" key={item.name}>
                <button
                  className={`category-button ${activeCategory === item.name ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(item.name)
                    setSelectedCategory(
                      selectedCategory === item.name ? '' : item.name
                    )
                    setShowAllGenerators(false)
                  }}
                >
                  <span className="category-icon">{item.icon}</span>
                  <span className="category-name">{item.name}</span>

                  {selectedGenerators[item.name] && (
                    <span className="selected-generator">
                      {selectedGenerators[item.name]}
                    </span>
                  )}
                </button>

                {selectedCategory === item.name && (
                  <div className="generator-overlay">
                    <p className="hint">Выбери AI-генератор:</p>

                    {(showAllGenerators
                      ? GENERATORS[item.name]
                      : GENERATORS[item.name].slice(0, 3)
                    ).map(generator => (
                      <button
                        key={generator}
                        className="generator-button"
                        onClick={() => {
                          setSelectedGenerators(prev => ({
                            ...prev,
                            [item.name]: generator
                          }))
                          setSelectedCategory('')
                          setShowAllGenerators(false)
                        }}
                      >
                        {generator}
                      </button>
                    ))}

                    {GENERATORS[item.name].length > 3 && (
                      <button
                        className="generator-button other-generators"
                        onClick={() => setShowAllGenerators(!showAllGenerators)}
                      >
                        {showAllGenerators
                          ? 'Свернуть список ↑'
                          : 'Другие генераторы →'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="microphone">🎙️</div>
          <p className="hint">Расскажи свою идею голосом</p>
          <textarea placeholder="Или введите текст вручную..." />

          <button className="stop-button">
            Стоп — получить 3 варианта
          </button>
        </section>
      )}

            {page === 'message' && (
        <section className="work-page">
          <button className="back" onClick={() => setPage('home')}>
            ← Назад
          </button>

          <h2>Создаём сообщение</h2>

          <div className="categories">
            {['MAX', 'VK', 'WhatsApp', 'Telegram', 'Другой'].map(item => (
              <button key={item}>{item}</button>
            ))}
          </div>

          <div className="microphone">🎙️</div>
          <p className="hint">Надиктуй своё сообщение</p>
          <textarea placeholder="Или введите сообщение..." />

          <button className="stop-button">
            Стоп — выбрать стиль
          </button>
        </section>
      )}

            {page === 'settings' && (
        <section className="settings-page">
          <button
            className="settings-back"
            onClick={() => setPage('home')}
          >
            ← Назад
          </button>

          <h2>Настройки</h2>
          <p>Настрой AI Prompt Studio под себя.</p>

          <div className="settings-list">
            {[
              {
                icon: '◐',
                title: 'Внешний вид',
                description: 'Тема, оформление и размер текста'
              },
              {
                icon: '文',
                title: 'Язык',
                description: 'Язык приложения и результатов'
              },
              {
                icon: '🎙',
                title: 'Голос и озвучивание',
                description: 'Голосовой ввод, голос и скорость речи'
              },
              {
                icon: '♧',
                title: 'Уведомления',
                description: 'Оповещения и напоминания'
              },
              {
                icon: '✦',
                title: 'Параметры генерации',
                description: 'Качество, длина и стиль результатов'
              },
              {
                icon: '▦',
                title: 'Мои AI-генераторы',
                description: 'Избранные и предпочитаемые сервисы'
              },
              {
                icon: '⌘',
                title: 'API и подключения',
                description: 'Подключение сервисов и собственные ключи'
              },
              {
                icon: '♧',
                title: 'Конфиденциальность и безопасность',
                description: 'Доступ, защита и разрешения'
              },
              {
                icon: '▤',
                title: 'Хранение данных',
                description: 'История, сохранённые материалы и очистка'
              },
              {
                icon: '•••',
                title: 'Прочее',
                description: 'Дополнительные параметры приложения'
              }
            ].map(item => (
              <button
                className="settings-item"
                key={item.title}
                onClick={() => setPage('settings-' + item.title)}
              >
                <span className="settings-item-icon">
                  {item.icon}
                </span>

                <span className="settings-item-content">
                  <strong>{item.title}</strong>
                  <small>{item.description}</small>
                </span>

                <span className="settings-item-arrow">→</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {page.startsWith('settings-') && (
        <section className="settings-page">
          <button
            className="settings-back"
            onClick={() => setPage('settings')}
          >
            ← К настройкам
          </button>

          <h2>{page.replace('settings-', '')}</h2>

          <p>
            Здесь будут находиться настройки этого раздела.
          </p>
        </section>
      )}
