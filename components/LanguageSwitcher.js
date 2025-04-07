import { useEffect, useState } from 'react';
import styles from '../styles/LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState('uk');
  const [isClient, setIsClient] = useState(false);
  const translations = {
    uk: { language: 'Мова', switchTo: 'Русский' },
    ru: { language: 'Язык', switchTo: 'Українська' }
  };

  // Функция для создания события смены языка
  const createLanguageEvent = (newLocale) => {
    return new CustomEvent('languageChange', { 
      detail: { locale: newLocale },
      bubbles: true 
    });
  };

  useEffect(() => {
    // Указываем, что мы на клиенте
    setIsClient(true);
    // Получаем текущую локаль из localStorage
    try {
      const savedLocale = typeof window !== 'undefined' && window.localStorage 
        ? localStorage.getItem('locale') || 'uk' 
        : 'uk';
      setLocale(savedLocale);
    } catch (e) {
      console.error('Ошибка доступа к localStorage:', e);
    }
  }, []);

  const changeLanguage = (newLocale) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('locale', newLocale);
      }
      
      // Меняем локаль в состоянии
      setLocale(newLocale);
      
      // Вместо перезагрузки страницы отправляем событие
      if (typeof window !== 'undefined') {
        window.dispatchEvent(createLanguageEvent(newLocale));
      }
    } catch (e) {
      console.error('Ошибка при смене языка:', e);
    }
  };

  // Определяем язык безопасно
  const getLanguageText = () => {
    try {
      return translations[locale]?.language || 'Мова';
    } catch (e) {
      return 'Мова';
    }
  };

  // Если компонент еще не на клиенте, показываем заглушку
  if (!isClient) {
    return <div className={styles.languageSwitcher}></div>;
  }

  // SVG-флаги вместо эмодзи
  const UkrainianFlag = () => (
    <svg viewBox="0 0 640 480" className={styles.flagSvg}>
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#ffd700" d="M0 0h640v480H0z"/>
        <path fill="#0057b8" d="M0 0h640v240H0z"/>
      </g>
    </svg>
  );

  const RussianFlag = () => (
    <svg viewBox="0 0 640 480" className={styles.flagSvg}>
      <g fillRule="evenodd" strokeWidth="1pt">
        <path fill="#fff" d="M0 0h640v480H0z"/>
        <path fill="#0039a6" d="M0 160h640v320H0z"/>
        <path fill="#d52b1e" d="M0 320h640v160H0z"/>
      </g>
    </svg>
  );

  return (
    <div className={styles.languageSwitcher}>
      <span>{getLanguageText()}:</span>
      <div className={styles.flagButtons}>
        <button 
          className={`${styles.flagButton} ${locale === 'uk' ? styles.active : ''}`} 
          onClick={() => locale !== 'uk' && changeLanguage('uk')}
          title="Українська"
        >
          <UkrainianFlag />
        </button>
        <button 
          className={`${styles.flagButton} ${locale === 'ru' ? styles.active : ''}`} 
          onClick={() => locale !== 'ru' && changeLanguage('ru')}
          title="Русский"
        >
          <RussianFlag />
        </button>
      </div>
    </div>
  );
} 