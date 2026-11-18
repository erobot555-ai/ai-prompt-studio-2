
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
const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedGenerator, setSelectedGenerator] = useState('')
  return (
    <main className="app">
      <header className="header">
        <div className="logo">AI</div>
        <div>
          <h1>PROMPT STUDIO</h1>
          <p>Твоя идея. Наш интеллект.</p>
        </div>
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
  {['Картинка', 'Видео', 'Музыка', 'Текст'].map(item => (
    <button
      key={item}
      className={selectedCategory === item ? 'selected' : ''}
      onClick={() => setSelectedCategory(item)}
    >
      {item}
    </button>
  ))}
</div>
{selectedCategory && (
  <div className="generator-list">
    <p className="hint">Выбери AI-генератор:</p>
    {GENERATORS[selectedCategory].map(generator => (
      <button
        key={generator}
        className="generator-button"
        onClick={() => {
  setSelectedGenerator(generator)
  setSelectedCategory('')
}}
      >
        {generator}
      </button>
    ))}
  </div>
)}
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
