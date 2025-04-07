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
    const savedLocale = localStorage.getItem('locale') || 'uk';
    setLocale(savedLocale);
  }, []);

  const changeLanguage = (newLocale) => {
    localStorage.setItem('locale', newLocale);
    setLocale(newLocale);
    window.location.reload();
  };

  // Если компонент еще не на клиенте, показываем заглушку
  if (!isClient) {
    return <div className={styles.languageSwitcher}></div>;
  }

  return (
    <div className={styles.languageSwitcher}>
      <span>{translations[locale].language}:</span>
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