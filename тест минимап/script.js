// Переменная для хранения корзины
let cart = [];

// Функция для переключения экранов
function switchScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach((screen) => screen.classList.remove('active'));

  const targetScreen = document.getElementById(screenId + '-screen');
  if (targetScreen) {
    targetScreen.classList.add('active');
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