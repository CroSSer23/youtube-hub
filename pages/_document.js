import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        <meta name="theme-color" content="#FF0000" />
        <meta name="description" content="Инструмент для расчета продолжительности текста для YouTube видео" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Предотвращение ошибок с localStorage при серверном рендеринге
              (function() {
                try {
                  // Проверяем, работает ли localStorage
                  const testKey = '__test__';
                  window.localStorage.setItem(testKey, testKey);
                  window.localStorage.removeItem(testKey);
                } catch (e) {
                  // Если localStorage не работает, создаем полифил
                  const storage = {};
                  window.localStorage = {
                    getItem: function(key) { return storage[key] || null; },
                    setItem: function(key, value) { storage[key] = value.toString(); },
                    removeItem: function(key) { delete storage[key]; }
                  };
                }
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 