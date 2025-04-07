document.addEventListener('DOMContentLoaded', function() {
    // Определяем элементы DOM
    const textInput = document.getElementById('textInput');
    const clearBtn = document.getElementById('clearBtn');
    const durationElement = document.getElementById('duration');
    const wordCountElement = document.getElementById('wordCount');
    const pageCountElement = document.getElementById('pageCount');
    const tempoRadios = document.querySelectorAll('input[name="tempo"]');
    
    // Скорость речи в словах в минуту для разных темпов
    const tempoRates = {
        slow: 100,   // Размеренный темп
        normal: 130, // Стандартный темп
        fast: 150    // Быстрый темп
    };
    
    // Вспомогательные константы
    const WORDS_PER_PAGE = 300; // Среднее количество слов на странице А4
    
    // Событие ввода текста
    textInput.addEventListener('input', calculateDuration);
    
    // Событие изменения темпа речи
    tempoRadios.forEach(radio => {
        radio.addEventListener('change', calculateDuration);
    });
    
    // Кнопка очистки поля
    clearBtn.addEventListener('click', function() {
        textInput.value = '';
        updateResults(0, 0, 0);
    });
    
    // Основная функция для расчета длительности
    function calculateDuration() {
        const text = textInput.value.trim();
        
        // Если текст пустой, обнуляем результаты
        if (!text) {
            updateResults(0, 0, 0);
            return;
        }
        
        // Подсчет слов (учитываем только непустые элементы)
        const words = text.split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
        
        // Определяем выбранный темп
        let selectedTempo = 'normal';
        for (const radio of tempoRadios) {
            if (radio.checked) {
                selectedTempo = radio.value;
                break;
            }
        }
        
        // Рассчитываем длительность в секундах
        const wordsPerSecond = tempoRates[selectedTempo] / 60;
        const durationInSeconds = Math.round(wordCount / wordsPerSecond);
        
        // Рассчитываем количество страниц
        const pageCount = wordCount / WORDS_PER_PAGE;
        
        // Обновляем результаты
        updateResults(durationInSeconds, wordCount, pageCount);
    }
    
    // Функция обновления результатов
    function updateResults(durationInSeconds, wordCount, pageCount) {
        // Форматируем длительность в минуты и секунды
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        durationElement.textContent = `${minutes} мин ${seconds} сек`;
        
        // Обновляем количество слов
        wordCountElement.textContent = wordCount;
        
        // Обновляем количество страниц (округляем до 1 знака после запятой)
        pageCountElement.textContent = `${pageCount.toFixed(1)} (А4, шрифт Times New Roman, размер 14)`;
    }
    
    // Загружаем и сохраняем данные в localStorage
    function saveToLocalStorage() {
        localStorage.setItem('youtubeHubText', textInput.value);
        
        let selectedTempo = 'normal';
        for (const radio of tempoRadios) {
            if (radio.checked) {
                selectedTempo = radio.value;
                break;
            }
        }
        localStorage.setItem('youtubeHubTempo', selectedTempo);
    }
    
    function loadFromLocalStorage() {
        const savedText = localStorage.getItem('youtubeHubText');
        if (savedText) {
            textInput.value = savedText;
        }
        
        const savedTempo = localStorage.getItem('youtubeHubTempo');
        if (savedTempo) {
            for (const radio of tempoRadios) {
                if (radio.value === savedTempo) {
                    radio.checked = true;
                    break;
                }
            }
        }
        
        // Пересчитываем результаты
        calculateDuration();
    }
    
    // Сохраняем данные при внесении изменений
    textInput.addEventListener('input', saveToLocalStorage);
    tempoRadios.forEach(radio => {
        radio.addEventListener('change', saveToLocalStorage);
    });
    
    // Загружаем данные при загрузке страницы
    loadFromLocalStorage();
    
    // Дополнительная функция для копирования результатов
    function addCopyButtons() {
        const resultCards = document.querySelectorAll('.result-card');
        
        resultCards.forEach(card => {
            const resultValue = card.querySelector('.result-content p');
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-btn';
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.title = 'Копировать результат';
            
            copyButton.addEventListener('click', function() {
                const textToCopy = resultValue.textContent;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Визуальная обратная связь
                    copyButton.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                });
            });
            
            card.appendChild(copyButton);
        });
    }
    
    // Добавляем кнопки копирования
    addCopyButtons();
}); 