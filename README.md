# YouTube Hub - Анализатор длительности текста

Современный инструмент для создателей YouTube контента, который помогает рассчитать, сколько времени займет озвучивание текста для ваших видео. Приложение построено на Next.js с улучшенным дизайном и поддержкой темной темы.

## Функциональность

- **Расчет времени озвучки** - определение длительности текста в минутах и секундах
- **Несколько скоростей речи** - выбор из трех темпов: размеренный, стандартный и быстрый
- **Подсчет слов** - точное количество слов в тексте
- **Расчет страниц** - пересчет текста в эквивалент страниц A4
- **Темная тема** - комфортная работа в условиях низкой освещенности
- **Сохранение данных** - автоматическое сохранение введенного текста и настроек
- **Адаптивный дизайн** - работает на компьютерах, планшетах и мобильных устройствах

## Технологии

- Next.js (React фреймворк)
- CSS Modules для стилизации
- LocalStorage API для сохранения данных пользователя
- Темная/светлая тема с автоопределением системных настроек
- Font Awesome для иконок
- Анимации и визуальные эффекты

## Начало работы

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev

# Сборка для продакшн
npm run build

# Запуск продакшн-сервера
npm start
```

Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере, чтобы увидеть результат.

## Формула расчета

Сайт использует следующие скорости речи:
- Размеренный темп: ~100 слов в минуту
- Стандартный темп: ~130 слов в минуту
- Быстрый темп: ~150 слов в минуту

Длительность рассчитывается путем деления количества слов на количество слов в минуту, а затем преобразуется в формат "минуты:секунды".

## Особенности нового дизайна

- Градиентные элементы и иконки
- Анимированные переходы и эффекты
- Пульсирующая кнопка воспроизведения
- Карточки с эффектом подъема при наведении
- Современные скругленные формы
- Улучшенная типографика
- Переключатель темной/светлой темы с автоматическим определением системных предпочтений

## Темная тема

Приложение автоматически определяет системные настройки пользователя и применяет соответствующую тему. Пользователь также может вручную переключаться между темной и светлой темами с помощью кнопки в шапке сайта. Выбранная тема сохраняется в localStorage и будет применена при следующем посещении.

## Лицензия

MIT

## Контакты

YouTube Hub Team - youtubeHub@example.com 