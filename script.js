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
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCart() {
  const cartItems = document.getElementById('cart-items');
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

  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id, name, price, size) {
  cart.push({ id, name, price, size });
  updateCart();
  showCartNotification();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function clearCart() {
  cart = [];
  updateCart();
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

// Избранное
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function toggleFavorite(id, event) {
  event.stopPropagation();
  const index = favorites.indexOf(id);
  if (index === -1) {
    favorites.push(id);
  } else {
    favorites.splice(index, 1);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoritesList();
  updateFavoriteButtons();
}

function updateFavoriteButtons() {
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    const id = parseInt(btn.parentElement.parentElement.dataset.id);
    btn.classList.toggle('active', favorites.includes(id));
  });
}

function updateFavoritesList() {
  const favoritesList = document.getElementById('favorites-list');
  favoritesList.innerHTML = '';
  favorites.forEach(id => {
    const product = products[id];
    const item = document.createElement('div');
    item.classList.add('product-item');
    item.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}">
      <div class="product-info">
        <h4>${product.name}</h4>
        <span class="price">$${product.price}</span>
        <button onclick="toggleFavorite(${id}, event)" class="favorite-btn">★</button>
      </div>
    `;
    item.onclick = () => openProductModal(id);
    favoritesList.appendChild(item);
  });
}

// Заказы
let orders = JSON.parse(localStorage.getItem('orders')) || [];

function saveOrder(name, contact, items) {
  const orderId = Date.now();
  const order = {
    id: orderId,
    name,
    contact,
    items,
    status: 'В обработке',
    date: new Date().toLocaleString()
  };
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  updateCustomerOrders();
  updateAdminOrders();
}

function updateCustomerOrders() {
  const customerOrders = document.getElementById('customer-orders');
  customerOrders.innerHTML = '';
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return;
  const userOrders = orders.filter(order => order.name === currentUser.name && order.contact === currentUser.contact);
  userOrders.forEach(order => {
    const orderDiv = document.createElement('div');
    orderDiv.classList.add('order-item');
    orderDiv.innerHTML = `
      <h4>Заказ #${order.id}</h4>
      <p><strong>Дата:</strong> ${order.date}</p>
      <p><strong>Товары:</strong> ${order.items.map(item => `${item.name} - $${item.price} (${item.size})`).join(', ')}</p>
      <p><strong>Статус:</strong> ${order.status}</p>
    `;
    customerOrders.appendChild(orderDiv);
  });
}

function updateAdminOrders() {
  const adminOrders = document.getElementById('admin-orders');
  adminOrders.innerHTML = '';
  orders.forEach(order => {
    const orderDiv = document.createElement('div');
    orderDiv.classList.add('order-item');
    orderDiv.innerHTML = `
      <h4>Заказ #${order.id}</h4>
      <p><strong>Клиент:</strong> ${order.name} (${order.contact})</p>
      <p><strong>Дата:</strong> ${order.date}</p>
      <p><strong>Товары:</strong> ${order.items.map(item => `${item.name} - $${item.price} (${item.size})`).join(', ')}</p>
      <p><strong>Статус:</strong>
        <select onchange="updateOrderStatus(${order.id}, this.value)">
          <option value="В обработке" ${order.status === 'В обработке' ? 'selected' : ''}>В обработке</option>
          <option value="Отправлен" ${order.status === 'Отправлен' ? 'selected' : ''}>Отправлен</option>
          <option value="Доставлен" ${order.status === 'Доставлен' ? 'selected' : ''}>Доставлен</option>
          <option value="Отменён" ${order.status === 'Отменён' ? 'selected' : ''}>Отменён</option>
        </select>
      </p>
    `;
    adminOrders.appendChild(orderDiv);
  });
}

function updateOrderStatus(orderId, status) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    localStorage.setItem('orders', JSON.stringify(orders));
    updateCustomerOrders();
    updateAdminOrders();
  }
}

// Авторизация
function loginCustomer(name, contact) {
  localStorage.setItem('currentUser', JSON.stringify({ name, contact }));
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('customer-account').classList.remove('hidden');
  document.getElementById('customer-name-display').textContent = name;
  updateFavoritesList();
  updateCustomerOrders();
  updateFavoriteButtons();
}

function loginAdmin() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('admin-account').classList.remove('hidden');
  updateAdminOrders();
}

function logout() {
  localStorage.removeItem('currentUser');
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('customer-account').classList.add('hidden');
  document.getElementById('admin-account').classList.add('hidden');
}

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
    description: "Удобные штаны для повседневного ношения.",
    material: "Хлопок",
    features: "Мягкая ткань, прямой крой",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Pants+3_2",
      "https://via.placeholder.com/600x600.png?text=Pants+3_3"
    ]
  },
  17: {
    name: "Штаны DYNASTY 4",
    price: 88,
    description: "Стильные штаны для уличного вайба.",
    material: "Полиэстер, хлопок",
    features: "Прочная ткань, удобные карманы",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Pants+4_2",
      "https://via.placeholder.com/600x600.png?text=Pants+4_3"
    ]
  },
  18: {
    name: "Штаны DYNASTY 5",
    price: 95,
    description: "Штаны для тех, кто ценит комфорт и стиль.",
    material: "Хлопок, эластан",
    features: "Эластичная ткань, свободная посадка",
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
    description: "Тёплое худи для уличного стиля.",
    material: "Хлопок, полиэстер",
    features: "Тёплая подкладка, капюшон с утяжкой",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Hoodie+1_2",
      "https://via.placeholder.com/600x600.png?text=Hoodie+1_3"
    ]
  },
  19: {
    name: "Худи DYNASTY 2",
    price: 75,
    description: "Стильное худи для холодной погоды.",
    material: "Хлопок, полиэстер",
    features: "Плотная ткань, удобный капюшон",
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
    material: "Полиэстер, утеплитель",
    features: "Водонепроницаемая, тёплая подкладка",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Jacket+1_2",
      "https://via.placeholder.com/600x600.png?text=Jacket+1_3"
    ]
  },
  21: {
    name: "Куртка DYNASTY 2",
    price: 130,
    description: "Стильная куртка для уличного образа.",
    material: "Полиэстер, утеплитель",
    features: "Прочная, ветрозащитная",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Jacket+2_2",
      "https://via.placeholder.com/600x600.png?text=Jacket+2_3"
    ]
  },
  22: {
    name: "Куртка DYNASTY 3",
    price: 140,
    description: "Куртка для экстремальных условий.",
    material: "Полиэстер, утеплитель",
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
    description: "Легкий жилет для тренировок. Докажи свою силу.",
    material: "Полиэстер",
    features: "Дышащая ткань, легкий вес",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Vest+1_2",
      "https://via.placeholder.com/600x600.png?text=Vest+1_3"
    ]
  },
  23: {
    name: "Жилетка DYNASTY 2",
    price: 50,
    description: "Стильный жилет для повседневного ношения.",
    material: "Полиэстер",
    features: "Лёгкий, удобный",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Vest+2_2",
      "https://via.placeholder.com/600x600.png?text=Vest+2_3"
    ]
  }
};

// Открытие модального окна товара
function openProductModal(id) {
  const product = products[id];
  let currentImageIndex = 0;

  document.getElementById('modal-title').textContent = product.name;
  document.getElementById('modal-price').textContent = `$${product.price}`;
  document.getElementById('modal-description').textContent = product.description;
  document.getElementById('modal-material').textContent = product.material;
  document.getElementById('modal-features').textContent = product.features;
  document.getElementById('modal-image').src = product.images[currentImageIndex];

  const modal = document.getElementById('product-modal');
  modal.classList.remove('hidden');

  document.getElementById('prev-image').onclick = () => {
    currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
    document.getElementById('modal-image').src = product.images[currentImageIndex];
  };

  document.getElementById('next-image').onclick = () => {
    currentImageIndex = (currentImageIndex + 1) % product.images.length;
    document.getElementById('modal-image').src = product.images[currentImageIndex];
  };

  document.getElementById('add-to-cart-modal').onclick = () => {
    const size = document.getElementById('modal-size').value;
    addToCart(id, product.name, product.price, size);
    modal.classList.add('hidden');
  };

  document.getElementById('add-to-favorite-modal').onclick = () => {
    toggleFavorite(id, new Event('click'));
    modal.classList.add('hidden');
  };
}

// Закрытие модального окна товара
document.getElementById('close-product-modal').addEventListener('click', () => {
  document.getElementById('product-modal').classList.add('hidden');
});

// Открытие/закрытие корзины
const cartModal = document.getElementById('cart-modal');
document.getElementById('cart-button').addEventListener('click', () => {
  cartModal.classList.toggle('open');
  cartModal.classList.toggle('hidden');
});

document.getElementById('close-cart').addEventListener('click', () => {
  cartModal.classList.remove('open');
  cartModal.classList.add('hidden');
});

// Открытие модального окна оформления заказа
const checkoutModal = document.getElementById('checkout-modal');
document.getElementById('checkout').addEventListener('click', () => {
  cartModal.classList.remove('open');
  cartModal.classList.add('hidden');
  checkoutModal.classList.remove('hidden');
  document.getElementById('checkout-form-container').classList.remove('hidden');
  document.getElementById('checkout-success').classList.add('hidden');
});

document.getElementById('close-checkout-modal').addEventListener('click', () => {
  checkoutModal.classList.add('hidden');
});

// Отправка данных заказа в Telegram
document.getElementById('checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name-input').value;
  const contact = document.getElementById('contact-input').value;
  const orderDetails = cart.map(item => `${item.name} - $${item.price} (${item.size})`).join(', ');
  const message = `Новый заказ:\n${orderDetails}\nИмя: ${name}\nКонтакт: ${contact}`;

  const token = '8090185279:AAH5J9QOJkU96VsTyXIJhIe4kbsrswue7M0';
  const chatId = '-4711226618';
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        saveOrder(name, contact, cart);
        document.getElementById('checkout-form-container').classList.add('hidden');
        document.getElementById('checkout-success').classList.remove('hidden');
        setTimeout(() => {
          checkoutModal.classList.add('hidden');
          cart = [];
          updateCart();
        }, 3000);
      } else {
        alert('Ошибка при отправке заказа');
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
      alert('Ошибка при отправке заказа');
    });
});

// Обработка авторизации
document.getElementById('customer-login').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('customer-name').value;
  const contact = document.getElementById('customer-contact').value;
  loginCustomer(name, contact);
});

document.getElementById('admin-login').addEventListener('submit', (e) => {
  e.preventDefault();
  const code = document.getElementById('admin-code').value;
  if (code === 'admin123') { // Простой код для примера, замените на свой
    loginAdmin();
  } else {
    alert('Неверный код администратора');
  }
});

document.getElementById('logout-customer').addEventListener('click', logout);
document.getElementById('logout-admin').addEventListener('click', logout);

// Инициализация
if (localStorage.getItem('currentUser')) {
  const { name, contact } = JSON.parse(localStorage.getItem('currentUser'));
  loginCustomer(name, contact);
}
updateFavoriteButtons();
