/**
 * Функция для отображения вертикального меню
 * @param {HTMLElement} btn - Элемент-якорь
 * @param {Array} items - Массив list_items_vert_11
 */
function showVerticalSmartMenu(btn, items) {
    const dropdown = document.getElementById('tagDropdown'); // Твой существующий контейнер
    if (!dropdown) return;

    dropdown.innerHTML = '';
    // Очищаем старые классы и ставим свой уникальный
    dropdown.className = 'tag-dropdown v-smart-container';

    items.forEach((item) => {
        if (item.transform) {
            // Кнопка трансформации (три точки)
            const trigger = document.createElement('div');
            trigger.className = 'transform-trigger';
            trigger.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                </svg>`;
            
            trigger.onclick = (e) => {
                e.stopPropagation();
                // ВАЖНО: Вызываем твою оригинальную функцию из основного кода
                if (typeof showDropdown === 'function') {
                    showDropdown(btn, list_items_vert_transform_11, 'icon');
                }
            };
            dropdown.appendChild(trigger);
        } else {
            // Обычный пункт меню
            const row = document.createElement('div');
            row.className = 'dropdown-item clicked';
            row.innerHTML = `<span class="item-text">${item.label}</span>`;
            
            if (item.onclick) {
                row.onclick = () => {
                    // Выполняем строковую функцию (например "copy_textarea();")
                    try { new Function(item.onclick)(); } catch(e) { console.error(e); }
                    if (typeof hideDropdown === 'function') hideDropdown();
                };
            }
            dropdown.appendChild(row);
        }
    });

    // Позиционирование (копируем твою логику из showDropdown)
    const rect = btn.getBoundingClientRect();
    dropdown.style.display = 'flex';
    dropdown.style.top = `${rect.top + window.scrollY - 10}px`;
    dropdown.style.left = `${rect.left}px`;
    
    // Глобальная переменная из твоего кода для закрытия
    window.currentOpenButton = btn;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const footerInput = document.getElementById('cntxt_menu_btn_vert');
    if (footerInput) {
        // Находим textarea внутри или вешаем на весь футер
        const target = footerInput.querySelector('textarea') || footerInput;
        
        target.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showVerticalSmartMenu(footerInput, list_items_vert_11);
        });
    }
});
