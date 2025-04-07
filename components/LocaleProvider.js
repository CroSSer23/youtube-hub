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
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    
    if (isClient) {
      localStorage.setItem('locale', newLocale);
      // Перезагрузим страницу с новой локалью
      window.location.reload();
    }
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale, isClient }}>
      {children}
    </LocaleContext.Provider>
  );
} 