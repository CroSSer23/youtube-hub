import { useEffect, useState } from 'react';
import styles from '../styles/LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState('uk');
  const [isClient, setIsClient] = useState(false);

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

  // Если компонент еще не на клиенте, показываем заглушку
  if (!isClient) {
    return <div className={styles.languageSwitcher}></div>;
  }

  // SVG-флаги вместо эмодзи
  const UkrainianFlag = () => (
    <svg viewBox="0 0 4 3" className={styles.flagSvg}>
      <rect width="4" height="3" fill="#ffd700" />
      <rect width="4" height="1.5" fill="#0057b8" />
    </svg>
  );

  const RussianFlag = () => (
    <svg viewBox="0 0 4 3" className={styles.flagSvg}>
      <rect width="4" height="1" fill="#fff" />
      <rect width="4" height="1" y="1" fill="#0039a6" />
      <rect width="4" height="1" y="2" fill="#d52b1e" />
    </svg>
  );

  return (
    <div className={styles.languageSwitcher}>
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