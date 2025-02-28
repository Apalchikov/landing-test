// Функция для прокрутки к секции
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Функция для показа витрины MINIMAL
function showMinimalShowcase() {
  hideAllShowcases(); // Скрываем все витрины
  const showcase = document.getElementById('minimal-showcase');
  if (showcase) {
    showcase.classList.remove('hidden'); // Показываем витрину MINIMAL
  }
}

// Функция для показа витрины FIGHTER
function showFighterShowcase() {
  hideAllShowcases(); // Скрываем все витрины
  const showcase = document.getElementById('fighter-showcase');
  if (showcase) {
    showcase.classList.remove('hidden'); // Показываем витрину FIGHTER
  }
}

// Функция для скрытия всех витрин
function hideAllShowcases() {
  const showcases = document.querySelectorAll('.showcase-section');
  showcases.forEach(showcase => {
    showcase.classList.add('hidden'); // Добавляем класс hidden всем витринам
  });
}

// Функция для возврата к коллекциям
function goBack() {
  hideAllShowcases(); // Скрываем все витрины
}
