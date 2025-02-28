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
    hideAllShowcases(); // Скрываем все витрины
    showcase.classList.remove('hidden'); // Показываем витрину MINIMAL

    // Если витрина уже видима, прокручиваем к ней
    if (!showcase.classList.contains('hidden')) {
      scrollToSection('minimal-showcase');
    }
  }
}

// Функция для показа витрины FIGHTER
function showFighterShowcase() {
  const showcase = document.getElementById('fighter-showcase');
  if (showcase) {
    hideAllShowcases(); // Скрываем все витрины
    showcase.classList.remove('hidden'); // Показываем витрину FIGHTER

    // Если витрина уже видима, прокручиваем к ней
    if (!showcase.classList.contains('hidden')) {
      scrollToSection('fighter-showcase');
    }
  }
}
