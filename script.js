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

  // Обновляем счетчик корзины
  document.getElementById('cart-count').textContent = cart.length;
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
    description: "Спортивные штаны для активного образа жизни.",
    material: "Хлопок, полиэстер",
    features: "Эластичный пояс, удобный крой",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Pants+2_2",
      "https://via.placeholder.com/600x600.png?text=Pants+2_3"
    ]
  },
  16: {
    name: "Штаны DYNASTY 3",
    price: 85,
    description: "Стильные штаны для повседневной носки.",
    material: "Хлопок, полиэстер",
    features: "Удобная посадка, прочные швы",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Pants+3_2",
      "https://via.placeholder.com/600x600.png?text=Pants+3_3"
    ]
  },
  17: {
    name: "Штаны DYNASTY 4",
    price: 88,
    description: "Штаны с современным дизайном для уличного стиля.",
    material: "Хлопок, полиэстер",
    features: "Эластичный пояс, стильный крой",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Pants+4_2",
      "https://via.placeholder.com/600x600.png?text=Pants+4_3"
    ]
  },
  18: {
    name: "Штаны DYNASTY 5",
    price: 95,
    description: "Премиум-штаны для тех, кто ценит комфорт и стиль.",
    material: "Хлопок, полиэстер",
    features: "Мягкая ткань, премиум-качество",
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
    description: "Теплое худи для прохладной погоды. Стиль и комфорт.",
    material: "Хлопок, флис",
    features: "Мягкая подкладка, регулируемый капюшон",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Hoodie+1_2",
      "https://via.placeholder.com/600x600.png?text=Hoodie+1_3"
    ]
  },
  19: {
    name: "Худи DYNASTY 2",
    price: 75,
    description: "Худи с уникальным дизайном для уличного вайба.",
    material: "Хлопок, флис",
    features: "Теплая ткань, свободный крой",
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
    description: "Стильная куртка для холодной погоды.",
    material: "Полиэстер, хлопок",
    features: "Водостойкая, утепленная",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Jacket+1_2",
      "https://via.placeholder.com/600x600.png?text=Jacket+1_3"
    ]
  },
  21: {
    name: "Куртка DYNASTY 2",
    price: 130,
    description: "Куртка для уличного стиля и защиты от ветра.",
    material: "Полиэстер",
    features: "Легкая, прочная",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Jacket+2_2",
      "https://via.placeholder.com/600x600.png?text=Jacket+2_3"
    ]
  },
  22: {
    name: "Куртка DYNASTY 3",
    price: 140,
    description: "Премиум-куртка для суровых условий.",
    material: "Полиэстер, флис",
    features: "Водонепроницаемая, утепленная",
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
    description: "Легкая жилетка для уличного стиля.",
    material: "Полиэстер",
    features: "Удобная, стильная",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Vest+1_2",
      "https://via.placeholder.com/600x600.png?text=Vest+1_3"
    ]
  },
  23: {
    name: "Жилетка DYNASTY 2",
    price: 50,
    description: "Жилетка для активного отдыха и повседневной носки.",
    material: "Полиэстер",
    features: "Легкая, прочная",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Vest+2_2",
      "https://via.placeholder.com/600x600.png?text=Vest+2_3"
    ]
  }
};

// Модальное окно товара
let currentImageIndex = 0;

function openProductModal(productId) {
  const product = products[productId];
  if (product) {
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-price').textContent = `$${product.price}`;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-material').textContent = product.material;
    document.getElementById('modal-features').textContent = product.features;
    
    // Установка начального изображения
    currentImageIndex = 0;
    document.getElementById('modal-image').src = product.images[currentImageIndex];
    
    // Создание индикаторов для галереи
    const indicatorsContainer = document.getElementById('gallery-indicators');
    indicatorsContainer.innerHTML = '';
    product.images.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('indicator');
      if (index === 0) indicator.classList.add('active');
      indicator.onclick = () => {
        currentImageIndex = index;
        updateGallery(product);
      };
      indicatorsContainer.appendChild(indicator);
    });

    // Обработчик добавления в корзину
    const addToCartBtn = document.getElementById('add-to-cart-modal');
    addToCartBtn.onclick = () => {
      const size = document.getElementById('modal-size').value;
      addToCart(productId, product.name, product.price, size);
    };

    // Показать модальное
    document.getElementById('product-modal').classList.remove('hidden');
  }
}

function updateGallery(product) {
  document.getElementById('modal-image').src = product.images[currentImageIndex];
  const indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentImageIndex);
  });
}

// Обработчики для галереи
document.getElementById('prev-image').onclick = () => {
  const productId = document.querySelector('.product-modal:not(.hidden)').dataset.productId;
  const product = products[productId];
  if (product) {
    currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
    updateGallery(product);
  }
};

document.getElementById('next-image').onclick = () => {
  const productId = document.querySelector('.product-modal:not(.hidden)').dataset.productId;
  const product = products[productId];
  if (product) {
    currentImageIndex = (currentImageIndex + 1) % product.images.length;
    updateGallery(product);
  }
};

// Закрытие модальных окон
document.getElementById('close-product-modal').onclick = () => {
  document.getElementById('product-modal').classList.add('hidden');
};

document.getElementById('close-cart').onclick = () => {
  document.getElementById('cart-modal').classList.remove('open');
};

document.getElementById('close-checkout-modal').onclick = () => {
  document.getElementById('checkout-modal').classList.add('hidden');
};

// Открытие корзины
document.getElementById('cart-button').onclick = () => {
  document.getElementById('cart-modal').classList.add('open');
  updateCart();
};

// Оформление заказа
document.getElementById('checkout').onclick = () => {
  document.getElementById('cart-modal').classList.remove('open');
  document.getElementById('checkout-modal').classList.remove('hidden');
  
  // Показать итог заказа
  const orderSummary = document.getElementById('order-summary');
  orderSummary.innerHTML = '<h3>Ваш заказ:</h3><ul>';
  let total = 0;
  cart.forEach(item => {
    orderSummary.innerHTML += `<li>${item.name} (${item.size}) - $${item.price}</li>`;
    total += item.price;
  });
  orderSummary.innerHTML += `</ul><div class="total">Итого: $${total}</div>`;
};

// Отправка заказа в Telegram
document.getElementById('checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name-input').value;
  const contact = document.getElementById('contact-input').value;

  let message = `Новый заказ!\nИмя: ${name}\nКонтакт: ${contact}\n\nТовары:\n`;
  let total = 0;
  cart.forEach(item => {
    message += `${item.name} (${item.size}) - $${item.price}\n`;
    total += item.price;
  });
  message += `\nИтого: $${total}`;

  const token = '8090185279:AAH5J9QOJkU96VsTyXIJhIe4kbsrswue7M0';
  const chatId = '-4711226618';
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        document.getElementById('checkout-form-container').classList.add('hidden');
        document.getElementById('checkout-success').classList.remove('hidden');
        cart = [];
        updateCart();
        setTimeout(() => {
          document.getElementById('checkout-modal').classList.add('hidden');
          document.getElementById('checkout-form-container').classList.remove('hidden');
          document.getElementById('checkout-success').classList.add('hidden');
          document.getElementById('checkout-form').reset();
        }, 3000);
      } else {
        alert('Ошибка при отправке заказа. Попробуйте снова.');
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
      alert('Ошибка при отправке заказа. Проверьте подключение к интернету.');
    });
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  updateCart();
});
