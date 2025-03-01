// Переменная для хранения товаров в корзине
let cart = [];

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
    showcase.classList.add('hidden');
  });
}

// Функция для возврата к коллекциям
function goBack() {
  hideAllShowcases(); // Скрываем все витрины
}

// Функция для добавления товара в корзину
function addToCart(itemName, price) {
  cart.push({ name: itemName, price }); // Добавляем товар в корзину
  updateCartModal(); // Обновляем модальное окно корзины
  showAddToCartToast(itemName); // Показываем уведомление о добавлении
}

// Функция для обновления модального окна корзины
function updateCartModal() {
  const cartItemsList = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  // Очищаем список товаров
  cartItemsList.innerHTML = '';

  let total = 0;

  // Добавляем каждый товар в список
  if (cart.length > 0) {
    cart.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        ${item.name} - $${item.price} 
        <button onclick="removeFromCart(${index})">Удалить</button>
      `;
      cartItemsList.appendChild(listItem);

      total += item.price; // Считаем общую сумму
    });
  } else {
    cartItemsList.innerHTML = '<li>Корзина пуста</li>';
  }

  // Обновляем общую сумму
  cartTotalElement.textContent = `Общая сумма: $${total}`;
}

// Функция для удаления товара из корзины
function removeFromCart(index) {
  cart.splice(index, 1); // Удаляем товар по индексу
  updateCartModal(); // Обновляем модальное окно корзины
}

// Функция для очистки корзины
function clearCart() {
  cart = []; // Очищаем массив корзины
  updateCartModal(); // Обновляем модальное окно корзины
}

// Функция для открытия модального окна корзины
function openCart() {
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

// Функция для показа уведомления о добавлении товара
function showAddToCartToast(itemName) {
  const toastMessage = document.createElement('div');
  toastMessage.className = 'toast-message';
  toastMessage.textContent = `${itemName} добавлен в корзину`;

  // Добавляем уведомление на страницу
  document.body.appendChild(toastMessage);

  // Показываем уведомление
  toastMessage.classList.add('active');

  // Через 2 секунды скрываем уведомление
  setTimeout(() => {
    toastMessage.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(toastMessage); // Удаляем уведомление
    }, 500); // Дожидаемся завершения анимации
  }, 2000);
}
