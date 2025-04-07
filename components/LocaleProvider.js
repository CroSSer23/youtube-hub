import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

const LocaleContext = createContext();

export function useLocale() {
  return useContext(LocaleContext);
}

export default function LocaleProvider({ children }) {
  const router = useRouter();
  const [locale, setLocale] = useState('uk'); // Українська як язык по умолчанию
  
  useEffect(() => {
    // Проверяем сохраненную локаль при загрузке
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    
    // Перезагрузим страницу с новой локалью
    window.location.reload();
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
} 