// Функция для прокрутки к секции
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.section:not(#' + sectionId + ')').forEach(sec => {
      sec.classList.add('hidden');
    });
  }
}

// Показать категорию
function showCategory(categoryId) {
  const categorySection = document.getElementById(categoryId);
  const catalogSection = document.getElementById('catalog');
  if (categorySection) {
    categorySection.classList.remove('hidden');
    catalogSection.classList.add('hidden');
    categorySection.scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.section:not(#' + categoryId + ')').forEach(sec => {
      if (sec.id !== 'catalog') {
        sec.classList.add('hidden');
      }
    });
  }
}

// Вернуться к каталогу
function goBackToCatalog() {
  const catalogSection = document.getElementById('catalog');
  if (catalogSection) {
    catalogSection.classList.remove('hidden');
    catalogSection.scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.section:not(#catalog)').forEach(sec => {
      sec.classList.add('hidden');
    });
  }
}

// Корзина
let cart = [];

// Загрузка корзины из localStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }

  // Обработчики для модальных окон
  document.getElementById('cart-button').addEventListener('click', openCartModal);
  document.getElementById('close-cart').addEventListener('click', closeCartModal);
  document.getElementById('close-product-modal').addEventListener('click', closeProductModal);
  document.getElementById('close-checkout-modal').addEventListener('click', closeCheckoutModal);
  document.getElementById('checkout').addEventListener('click', openCheckoutModal);
});

// Обновление корзины
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const checkoutButton = document.getElementById('checkout');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${products[item.id].images[0]}" alt="${item.name}">
      <span>${item.name} - $${item.price} (${item.size})</span>
      <button onclick="removeFromCart(${index})">Удалить</button>
    `;
    cartItems.appendChild(cartItem);
    total += item.price;
  });
  const totalDiv = document.createElement('div');
  totalDiv.classList.add('cart-total');
  totalDiv.innerHTML = `<strong>Итого: $${total}</strong>`;
  cartItems.appendChild(totalDiv);

  const clearButton = document.createElement('button');
  clearButton.classList.add('clear-cart-btn');
  clearButton.textContent = 'Очистить корзину';
  clearButton.onclick = clearCart;
  cartItems.appendChild(clearButton);

  // Обновляем счётчик корзины
  cartCount.textContent = cart.length;
  // Активируем/деактивируем кнопку оформления заказа
  checkoutButton.disabled = cart.length === 0;
  // Сохраняем корзину в localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Добавление в корзину
function addToCart(id, name, price, size) {
  cart.push({ id, name, price, size });
  updateCart();
  showCartNotification();
}

// Удаление из корзины
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Очистка корзины
function clearCart() {
  cart = [];
  updateCart();
  localStorage.removeItem('cart');
}

// Показать уведомление о добавлении в корзину
function showCartNotification() {
  const notification = document.getElementById('cart-notification');
  notification.classList.remove('hidden');
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
    notification.classList.add('hidden');
  }, 2000);
}

// Открытие корзины
function openCartModal() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.classList.add('open');
}

// Закрытие корзины
function closeCartModal() {
  const cartModal = document.getElementById('cart-modal');
  cartModal.classList.remove('open');
}

// Модальное окно товара
let currentImageIndex = 0;

function openProductModal(productId) {
  const product = products[productId];
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalDescription = document.getElementById('modal-description');
  const modalMaterial = document.getElementById('modal-material');
  const modalFeatures = document.getElementById('modal-features');
  const modalSize = document.getElementById('modal-size');

  currentImageIndex = 0;
  modalImage.src = product.images[currentImageIndex];
  modalTitle.textContent = product.name;
  modalPrice.textContent = `$${product.price}`;
  modalDescription.textContent = product.description;
  modalMaterial.textContent = product.material;
  modalFeatures.textContent = product.features;
  modalSize.value = 'M';

  const prevButton = document.getElementById('prev-image');
  const nextButton = document.getElementById('next-image');
  prevButton.onclick = () => changeImage(-1, product.images);
  nextButton.onclick = () => changeImage(1, product.images);

  const addToCartButton = document.getElementById('add-to-cart-modal');
  addToCartButton.onclick = () => {
    addToCart(productId, product.name, product.price, modalSize.value);
  };

  const buyNowButton = document.getElementById('buy-now-modal');
  buyNowButton.onclick = () => {
    addToCart(productId, product.name, product.price, modalSize.value);
    closeProductModal();
    openCheckoutModal();
  };

  modal.classList.remove('hidden');
}

function changeImage(direction, images) {
  currentImageIndex += direction;
  if (currentImageIndex < 0) currentImageIndex = images.length - 1;
  if (currentImageIndex >= images.length) currentImageIndex = 0;
  document.getElementById('modal-image').src = images[currentImageIndex];
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.add('hidden');
}

// Модальное окно оформления заказа
function openCheckoutModal() {
  if (cart.length === 0) return; // Защита от открытия при пустой корзине
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutFormContainer = document.getElementById('checkout-form-container');
  const checkoutSuccess = document.getElementById('checkout-success');
  checkoutFormContainer.classList.remove('hidden');
  checkoutSuccess.classList.add('hidden');
  checkoutModal.classList.remove('hidden');
  closeCartModal();
}

function closeCheckoutModal() {
  const checkoutModal = document.getElementById('checkout-modal');
  checkoutModal.classList.add('hidden');
}

// Отправка заказа в Telegram
document.getElementById('checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name-input').value;
  const contact = document.getElementById('contact-input').value;

  let orderDetails = `Новый заказ!\nИмя: ${name}\nКонтакт: ${contact}\n\nТовары:\n`;
  let total = 0;
  cart.forEach(item => {
    orderDetails += `${item.name} (${item.size}) - $${item.price}\n`;
    total += item.price;
  });
  orderDetails += `\nИтого: $${total}`;

  const botToken = 'YOUR_BOT_TOKEN'; // Замени на свой токен
  const chatId = 'YOUR_CHAT_ID'; // Замени на свой chat_id
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: orderDetails
      })
    });

    if (response.ok) {
      const checkoutFormContainer = document.getElementById('checkout-form-container');
      const checkoutSuccess = document.getElementById('checkout-success');
      checkoutFormContainer.classList.add('hidden');
      checkoutSuccess.classList.remove('hidden');
      cart = [];
      updateCart();
      localStorage.removeItem('cart');
      setTimeout(closeCheckoutModal, 3000);
    } else {
      alert('Ошибка при отправке заказа. Попробуйте снова.');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка. Проверьте подключение к интернету.');
  }
});

// Данные товаров
const products = {
  // Футболки
  10: {
    name: "Футболка DYNASTY 1",
    price: 30,
    description: "Классическая футболка с логотипом DYNASTY. Идеальна для повседневного стиля.",
    material: "Хлопок",
    features: "Мягкая ткань, удобная посадка",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Tshirt+1_2",
      "https://via.placeholder.com/600x600.png?text=Tshirt+1_3"
    ]
  },
  13: {
    name: "Футболка DYNASTY 2",
    price: 35,
    description: "Футболка с уникальным дизайном DYNASTY. Для тех, кто выделяется.",
    material: "Хлопок",
    features: "Дышащая ткань, свободный крой",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Tshirt+2_2",
      "https://via.placeholder.com/600x600.png?text=Tshirt+2_3"
    ]
  },
  // Майки
  11: {
    name: "Майка DYNASTY 1",
    price: 25,
    description: "Лёгкая майка для жарких дней и тренировок.",
    material: "Полиэстер",
    features: "Дышащая ткань, свободный крой",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Tanktop+1_2",
      "https://via.placeholder.com/600x600.png?text=Tanktop+1_3"
    ]
  },
  14: {
    name: "Майка DYNASTY 2",
    price: 28,
    description: "Стильная майка для активного образа жизни.",
    material: "Полиэстер",
    features: "Лёгкая, устойчивая к износу",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Tanktop+2_2",
      "https://via.placeholder.com/600x600 ascendancy: true,
      "https://via.placeholder.com/600x600.png?text=Tanktop+2_3"
    ]
  },
  // Шорты
  9: {
    name: "Спортивные шорты DYNASTY 1",
    price: 50,
    description: "Спортивные шорты с логотипом DYNASTY. Идеальны для тренировок и уличного стиля.",
    material: "Полиэстер, хлопок",
    features: "Дышащая ткань, эластичный пояс",
    images: [
      "images/fighter-shorts.png",
      "https://via.placeholder.com/600x600.png?text=Shorts+1_2",
      "https://via.placeholder.com/600x600.png?text=Shorts+1_3"
    ]
  },
  15: {
    name: "Спортивные шорты DYNASTY 2",
    price: 55,
    description: "Шорты для спорта и отдыха с дерзким дизайном.",
    material: "Полиэстер",
    features: "Эластичный пояс, лёгкие",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Shorts+2_2",
      "https://via.placeholder.com/600x600.png?text=Shorts+2_3"
    ]
  },
  // Штаны
  2: {
    name: "Черные брюки DYNASTY 1",
    price: 80,
    description: "Стильные черные брюки с прямым кроем. Комфорт и элегантность в одном.",
    material: "Хлопок, полиэстер",
    features: "Устойчивость к износу, удобная посадка",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Pants+1_2",
      "https://via.placeholder.com/600x600.png?text=Pants+1_3"
    ]
  },
  5: {
    name: "Спортивные штаны DYNASTY 2",
    price: 90,
    description: "Спортивные штаны для активных. Свобода движений и стиль.",
    material: "Полиэстер, хлопок",
    features: "Эластичность, легкость",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Pants+2_2",
      "https://via.placeholder.com/600x600.png?text=Pants+2_3"
    ]
  },
  16: {
    name: "Штаны DYNASTY 3",
    price: 85,
    description: "Комфортные штаны для повседневной носки.",
    material: "Хлопок, полиэстер",
    features: "Мягкая ткань, удобная посадка",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Pants+3_2",
      "https://via.placeholder.com/600x600.png?text=Pants+3_3"
    ]
  },
  17: {
    name: "Штаны DYNASTY 4",
    price: 88,
    description: "Стильные штаны для современного образа.",
    material: "Хлопок",
    features: "Прочная ткань, свободный крой",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Pants+4_2",
      "https://via.placeholder.com/600x600.png?text=Pants+4_3"
    ]
  },
  18: {
    name: "Штаны DYNASTY 5",
    price: 95,
    description: "Элегантные штаны для активных.",
    material: "Полиэстер, хлопок",
    features: "Лёгкость, устойчивость к износу",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Pants+5_2",
      "https://via.placeholder.com/600x600.png?text=Pants+5_3"
    ]
  },
  // Худи
  12: {
    name: "Худи DYNASTY 1",
    price: 70,
    description: "Уютное худи с логотипом DYNASTY. Для прохладной погоды.",
    material: "Хлопок, полиэстер",
    features: "Тёплое, мягкое",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Hoodie+1_2",
      "https://via.placeholder.com/600x600.png?text=Hoodie+1_3"
    ]
  },
  19: {
    name: "Худи DYNASTY 2",
    price: 75,
    description: "Стильное худи для уличного вайба.",
    material: "Хлопок",
    features: "Комфортное, тёплое",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Hoodie+2_2",
      "https://via.placeholder.com/600x600.png?text=Hoodie+2_3"
    ]
  },
  // Куртки
  20: {
    name: "Куртка DYNASTY 1",
    price: 120,
    description: "Тёплая куртка для холодной погоды.",
    material: "Полиэстер",
    features: "Водостойкая, тёплая",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Jacket+1_2",
      "https://via.placeholder.com/600x600.png?text=Jacket+1_3"
    ]
  },
  21: {
    name: "Куртка DYNASTY 2",
    price: 130,
    description: "Стильная куртка для городского лука.",
    material: "Полиэстер, хлопок",
    features: "Лёгкая, тёплая",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Jacket+2_2",
      "https://via.placeholder.com/600x600.png?text=Jacket+2_3"
    ]
  },
  22: {
    name: "Куртка DYNASTY 3",
    price: 140,
    description: "Премиум куртка для экстремальных условий.",
    material: "Полиэстер",
    features: "Водонепроницаемая, тёплая",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Jacket+3_2",
      "https://via.placeholder.com/600x600.png?text=Jacket+3_3"
    ]
  },
  // Жилетки
  8: {
    name: "Жилетка DYNASTY 1",
    price: 45,
    description: "Лёгкая жилетка для активного отдыха.",
    material: "Полиэстер",
    features: "Дышащая, лёгкая",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Vest+1_2",
      "https://via.placeholder.com/600x600.png?text=Vest+1_3"
    ]
  },
  23: {
    name: "Жилетка DYNASTY 2",
    price: 50,
    description: "Стильная жилетка для повседневного образа.",
    material: "Полиэстер, хлопок",
    features: "Комфортная, лёгкая",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Vest+2_2",
      "https://via.placeholder.com/600x600.png?text=Vest+2_3"
    ]
  }
}; 
