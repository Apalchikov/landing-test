// Функция для прокрутки к секции
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Функция для возврата к коллекциям
function goBack() {
  scrollToSection('collections'); // Прокручиваем обратно к коллекциям
}
