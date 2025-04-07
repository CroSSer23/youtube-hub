import { useEffect, useState } from 'react';
import styles from '../styles/LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState('uk');
  const [isClient, setIsClient] = useState(false);
  const translations = {
    uk: { language: 'Мова', switchTo: 'Русский' },
    ru: { language: 'Язык', switchTo: 'Українська' }
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
      setLocale(newLocale);
      if (typeof window !== 'undefined') {
        window.location.reload();
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

  return (
    <div className={styles.languageSwitcher}>
      <span>{getLanguageText()}:</span>
      {locale === 'uk' ? (
        <button onClick={() => changeLanguage('ru')}>
          🇷🇺 Русский
        </button>
      ) : (
        <button onClick={() => changeLanguage('uk')}>
          🇺🇦 Українська
        </button>
      )}
    </div>
  );
} 