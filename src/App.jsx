
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
const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedGenerators, setSelectedGenerators] = useState({})
  const [showAllGenerators, setShowAllGenerators] = useState(false)
  const [activeCategory, setActiveCategory] = useState('')
      return (
    <main className="app">
     
<header className="header">
  <div className="logo">AI</div>
  <div>
    <h1>PROMPT STUDIO</h1>
    <p>Твоя идея. Наш интеллект.</p>
  </div>

  {page === 'home' && (
    <button
      className="help-button"
      onClick={() => setShowHelp(!showHelp)}
      aria-label="Помощь"
    >
      ?
    </button>
  )}
</header>


      {page === 'home' && (
        <section className="home">
          <div className="welcome">
            <span>AI PROMPT STUDIO 2.0</span>
            <h2>Преврати свою идею в результат</h2>
            <p>Просто расскажи, что ты хочешь. Мы поможем подобрать правильные слова.</p>
          </div>

          <button className="main-button prompt" onClick={() => setPage('prompt')}>
            <span className="button-icon">✦</span>
            <span>ПРОМПТ</span>
            <small>Создать запрос для AI</small>
          </button>

          <button className="main-button message" onClick={() => setPage('message')}>
            <span className="button-icon">✉</span>
            <span>СООБЩЕНИЕ</span>
            <small>Создать красивое сообщение</small>
          </button>

          <nav className="bottom-nav">
            <button>История</button>
            <button>Настройки</button>
            <button>Информация</button>
          </nav>
        </section>
      )}

      {page === 'prompt' && (
        <section className="work-page">
          <button className="back" onClick={() => setPage('home')}>← Назад</button>
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

          <button className="stop-button">Стоп — получить 3 варианта</button>
        </section>
      )}

      {page === 'message' && (
        <section className="work-page">
          <button className="back" onClick={() => setPage('home')}>← Назад</button>
          <h2>Создаём сообщение</h2>
          <div className="categories">
            {['MAX', 'VK', 'WhatsApp', 'Telegram', 'Другой'].map(item => (
              <button key={item}>{item}</button>
            ))}
          </div>
          <div className="microphone">🎙️</div>
          <p className="hint">Надиктуй своё сообщение</p>
          <textarea placeholder="Или введите сообщение..." />
          <button className="stop-button">Стоп — выбрать стиль</button>
        </section>
      )}
    </main>
  )
}
