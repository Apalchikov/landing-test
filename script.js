// Функция для прокрутки к секции
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Функция для показа витрины MINIMAL
function showMinimalShowcase() {
  const showcase = document.getElementById('minimal-showcase');
  if (showcase) {
    showcase.classList.remove('hidden'); // Показываем витрину
  }
}

// Функция для возврата к коллекциям
function goBack() {
  const showcase = document.getElementById('minimal-showcase');
  if (showcase) {
    showcase.classList.add('hidden'); // Скрываем витрину
  }
}
