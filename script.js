// Переменная для хранения корзины
let cart = [];

// Функция для прокрутки к секции
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Функция для добавления товара в корзину
function addToCart(itemName, price) {
  cart.push({ name: itemName, price });
  updateCart();
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

    total += item.price;
  });

  // Обновляем общую сумму
  totalPriceElement.textContent = `Общая сумма: $${total}`;
}

// Открытие модального окна корзины
function openCart() {
  updateCart();
  document.getElementById('cart-modal').classList.remove('hidden');
}

// Закрытие модального окна корзины
function closeCart() {
  document.getElementById('cart-modal').classList.add('hidden');
}
