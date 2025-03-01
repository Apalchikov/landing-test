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
  updateCartPreview(); // Обновляем мини-корзину
  updateCartModal(); // Обновляем модальное окно корзины
}

// Функция для обновления мини-корзины
function updateCartPreview() {
  const cartPreviewToggle = document.getElementById('cart-preview-toggle');
  const cartPreviewItems = document.getElementById('cart-preview-items');
  const total = cart.reduce((sum, item) => sum + item.price, 0); // Считаем общую сумму

  // Обновляем текст кнопки мини-корзины
  cartPreviewToggle.textContent = `Корзина ($${total})`;

  // Очищаем список товаров в мини-корзине
  cartPreviewItems.innerHTML = '';

  // Добавляем каждый товар в мини-корзину
  if (cart.length > 0) {
    cart.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} - $${item.price}`;
      cartPreviewItems.appendChild(listItem);
    });
  } else {
    cartPreviewItems.innerHTML = '<li>Корзина пуста</li>';
  }
}

// Функция для открытия/закрытия мини-корзины
function toggleCartPreview() {
  const cartPreview = document.getElementById('cart-preview');
  if (cartPreview) {
    cartPreview.classList.toggle('expanded'); // Переключаем класс expanded
  }
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

// Функция для обновления модального окна корзины
function updateCartModal() {
  const cartModalItems = document.getElementById('cart-modal-items');
  const cartModalTotal = document.getElementById('cart-modal-total');

  // Очищаем список товаров в модальном окне
  cartModalItems.innerHTML = '';

  let total = 0;

  // Добавляем каждый товар в модальное окно
  if (cart.length > 0) {
    cart.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        ${item.name} - $${item.price} 
        <button onclick="removeFromCart(${index})">Удалить</button>
      `;
      cartModalItems.appendChild(listItem);

      total += item.price; // Считаем общую сумму
    });
  } else {
    cartModalItems.innerHTML = '<li>Корзина пуста</li>';
  }

  // Обновляем общую сумму
  cartModalTotal.textContent = `Общая сумма: $${total}`;
}

// Функция для удаления товара из корзины
function removeFromCart(index) {
  cart.splice(index, 1); // Удаляем товар по индексу
  updateCartPreview(); // Обновляем мини-корзину
  updateCartModal(); // Обновляем модальное окно корзины
}

// Функция для очистки корзины
function clearCart() {
  cart = []; // Очищаем массив корзины
  updateCartPreview(); // Обновляем мини-корзину
  updateCartModal(); // Обновляем модальное окно корзины
}
