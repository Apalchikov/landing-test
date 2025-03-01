// Переменная для хранения товаров в корзине
let cart = [];

// Функция для плавной прокрутки к секции
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

// Функция для добавления товара в корзину
function addToCart(itemName, price) {
  cart.push({ name: itemName, price }); // Добавляем товар в корзину
  updateCart(); // Обновляем содержимое корзины
}

// Функция для обновления содержимого корзины
function updateCart() {
  const cartItemsList = document.getElementById('cart-items');
  const totalPriceElement = document.getElementById('total-price');

  // Очищаем список товаров
  cartItemsList.innerHTML = '';

  let total = 0;

  // Добавляем каждый товар в список
  cart.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - $${item.price}`;
    cartItemsList.appendChild(listItem);

    total += item.price; // Считаем общую сумму
  });

  // Обновляем общую сумму
  totalPriceElement.textContent = `Общая сумма: $${total}`;
}

// Функция для открытия модального окна корзины
function openCart() {
  updateCart(); // Обновляем содержимое корзины перед открытием
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.classList.remove('hidden'); // Показываем модальное окно
  }
}

// Функция для закрытия модального окна корзины
function closeCart() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.classList.add('hidden'); // Скрываем модальное окно
  }
}
