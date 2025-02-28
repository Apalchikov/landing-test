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
    showcase.classList.remove('hidden'); // Убираем класс hidden
  }
}

// Функция для возврата к коллекциям
function goBack() {
  const showcase = document.getElementById('minimal-showcase');
  if (showcase) {
    showcase.classList.add('hidden'); // Добавляем класс hidden
  }
}

// Функция для показа модального окна (если понадобится для других коллекций)
function showCollection(collectionName) {
  alert(`Коллекция "${collectionName}" будет доступна soon!`);
}
