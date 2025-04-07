import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  // Состояния
  const [text, setText] = useState('');
  const [words, setWords] = useState(0);
  const [duration, setDuration] = useState({ minutes: 0, seconds: 0 });
  const [pages, setPages] = useState(0);
  const [tempo, setTempo] = useState('slow');
  
  // Константы
  const WORDS_PER_PAGE = 300;
  const tempoRates = {
    slow: 100,   // Размеренный темп
    normal: 130, // Стандартный темп
    fast: 150    // Быстрый темп
  };
  
  // Refs для кнопок копирования
  const resultRefs = {
    duration: useRef(null),
    words: useRef(null),
    pages: useRef(null)
  };

  // Обработчик изменения текста
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Обработчик изменения темпа
  const handleTempoChange = (e) => {
    setTempo(e.target.value);
  };

  // Очистка поля текста
  const handleClear = () => {
    setText('');
  };

  // Копирование результата
  const copyToClipboard = (text, ref) => {
    navigator.clipboard.writeText(text).then(() => {
      const icon = ref.current.querySelector('i');
      icon.className = 'fas fa-check';
      setTimeout(() => {
        icon.className = 'fas fa-copy';
      }, 2000);
    });
  };

  // Расчет длительности при изменении текста или темпа
  useEffect(() => {
    if (!text.trim()) {
      setWords(0);
      setDuration({ minutes: 0, seconds: 0 });
      setPages(0);
      return;
    }

    // Подсчет слов
    const wordsArray = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = wordsArray.length;
    setWords(wordCount);
    
    // Расчет длительности
    const wordsPerSecond = tempoRates[tempo] / 60;
    const totalSeconds = Math.round(wordCount / wordsPerSecond);
    setDuration({
      minutes: Math.floor(totalSeconds / 60),
      seconds: totalSeconds % 60
    });
    
    // Расчет страниц
    setPages(wordCount / WORDS_PER_PAGE);
    
    // Сохранение в localStorage
    localStorage.setItem('youtubeHubText', text);
    localStorage.setItem('youtubeHubTempo', tempo);
  }, [text, tempo]);

  // Загрузка данных из localStorage при монтировании
  useEffect(() => {
    const savedText = localStorage.getItem('youtubeHubText');
    const savedTempo = localStorage.getItem('youtubeHubTempo');
    
    if (savedText) setText(savedText);
    if (savedTempo) setTempo(savedTempo);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>YouTube Hub - Анализатор длительности текста</title>
        <meta name="description" content="Инструмент для расчета длительности текста для YouTube видео" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <i className="fab fa-youtube"></i>
          <h1>YouTube Hub</h1>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h2>Рассчитайте длительность текста для своего YouTube видео</h2>
          <p>Наш инструмент поможет определить, сколько времени займет озвучка вашего текста</p>
          <div className={styles.heroAnimation}>
            <div className={styles.playButton}>
              <i className="fas fa-play"></i>
            </div>
          </div>
        </section>

        <section className={styles.analyzer}>
          <div className={styles.controls}>
            <div className={styles.tempoSelector}>
              <h3>Темп речи:</h3>
              <div className={styles.tempoOptions}>
                <label className={tempo === 'slow' ? styles.active : ''}>
                  <input 
                    type="radio" 
                    name="tempo" 
                    value="slow" 
                    checked={tempo === 'slow'} 
                    onChange={handleTempoChange}
                  />
                  <span>Размеренный (~100 сл/мин)</span>
                </label>
                <label className={tempo === 'normal' ? styles.active : ''}>
                  <input 
                    type="radio" 
                    name="tempo" 
                    value="normal" 
                    checked={tempo === 'normal'} 
                    onChange={handleTempoChange}
                  />
                  <span>Стандартный (~130 сл/мин)</span>
                </label>
                <label className={tempo === 'fast' ? styles.active : ''}>
                  <input 
                    type="radio" 
                    name="tempo" 
                    value="fast" 
                    checked={tempo === 'fast'} 
                    onChange={handleTempoChange}
                  />
                  <span>Быстрый (~150 сл/мин)</span>
                </label>
              </div>
            </div>
            <button className={styles.clearBtn} onClick={handleClear}>
              <i className="fas fa-trash-alt"></i> Очистить
            </button>
          </div>

          <div className={styles.textInputContainer}>
            <textarea 
              value={text}
              onChange={handleTextChange}
              placeholder="Скопируйте сюда текст для вашего YouTube видео..."
            />
            <div className={styles.textBackground}></div>
          </div>

          <div className={styles.results}>
            <div className={styles.resultCard}>
              <div className={styles.resultIcon}>
                <i className="fas fa-clock"></i>
              </div>
              <div className={styles.resultContent}>
                <h3>Длительность:</h3>
                <p>{duration.minutes} мин {duration.seconds} сек</p>
              </div>
              <button 
                ref={resultRefs.duration}
                className={styles.copyBtn}
                onClick={() => copyToClipboard(`${duration.minutes} мин ${duration.seconds} сек`, resultRefs.duration)}
                title="Копировать результат"
              >
                <i className="fas fa-copy"></i>
              </button>
            </div>
            
            <div className={styles.resultCard}>
              <div className={styles.resultIcon}>
                <i className="fas fa-font"></i>
              </div>
              <div className={styles.resultContent}>
                <h3>Слов:</h3>
                <p>{words}</p>
              </div>
              <button 
                ref={resultRefs.words}
                className={styles.copyBtn}
                onClick={() => copyToClipboard(words.toString(), resultRefs.words)}
                title="Копировать результат"
              >
                <i className="fas fa-copy"></i>
              </button>
            </div>
            
            <div className={styles.resultCard}>
              <div className={styles.resultIcon}>
                <i className="fas fa-file-alt"></i>
              </div>
              <div className={styles.resultContent}>
                <h3>Страниц:</h3>
                <p>{pages.toFixed(1)} (А4, 14pt)</p>
              </div>
              <button 
                ref={resultRefs.pages}
                className={styles.copyBtn}
                onClick={() => copyToClipboard(`${pages.toFixed(1)} (А4, шрифт Times New Roman, размер 14)`, resultRefs.pages)}
                title="Копировать результат"
              >
                <i className="fas fa-copy"></i>
              </button>
            </div>
          </div>
        </section>

        <section className={styles.tips}>
          <h2>Полезные советы для создателей контента</h2>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>
                <i className="fas fa-microphone"></i>
              </div>
              <h3>Правило: 2 слова = 1 секунда</h3>
              <p>Это базовое правило для расчета хронометража при стандартной скорости речи. Его используют профессиональные дикторы и создатели контента.</p>
            </div>
            
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>
                <i className="fas fa-pause"></i>
              </div>
              <h3>Важность пауз</h3>
              <p>Не забывайте о паузах - они помогают зрителям усвоить информацию. Расставляйте смысловые акценты с помощью коротких пауз перед важными фразами.</p>
            </div>
            
            <div className={styles.tipCard}>
              <div className={styles.tipIcon}>
                <i className="fas fa-running"></i>
              </div>
              <h3>Динамика речи</h3>
              <p>Для удержания внимания аудитории меняйте темп речи. Важную информацию произносите медленнее, фоновую - быстрее.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} YouTube Hub. Все права защищены.</p>
      </footer>
    </div>
  );
} 