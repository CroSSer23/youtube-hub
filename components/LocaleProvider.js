import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

const LocaleContext = createContext();

export function useLocale() {
  return useContext(LocaleContext);
}

export default function LocaleProvider({ children }) {
  const router = useRouter();
  const [locale, setLocale] = useState('uk'); // Українська як язык по умолчанию
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Отмечаем, что мы на клиенте
    setIsClient(true);
    
    // Проверяем сохраненную локаль при загрузке
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedLocale = localStorage.getItem('locale');
        if (savedLocale) {
          setLocale(savedLocale);
        }
      }
    } catch (e) {
      console.error('Ошибка доступа к localStorage:', e);
    }
  }, []);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    
    try {
      if (isClient && typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('locale', newLocale);
        // Перезагрузим страницу с новой локалью
        window.location.reload();
      }
    } catch (e) {
      console.error('Ошибка при смене языка:', e);
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale, isClient }}>
      {children}
    </LocaleContext.Provider>
  );
} 