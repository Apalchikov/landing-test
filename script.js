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

// Функция для показа витрины MINIMAL
function showMinimalShowcase(gender) {
  hideAllShowcases();
  const showcase = document.getElementById(`minimal-${gender}`);
  if (showcase) {
    showcase.classList.remove('hidden');
  }
}

// Функция для показа витрины FIGHTER
function showFighterShowcase() {
  hideAllShowcases();
  const showcase = document.getElementById('fighter-showcase');
  if (showcase) {
    showcase.classList.remove('hidden');
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
  hideAllShowcases();
  scrollToSection('collections');
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
}

function addToCart(id, name, price, size) {
  cart.push({ id, name, price, size });
  updateCart();
  showCartNotification();
}

function removeFromCart(index) {
  cart.splice(index, 1); // Удаляем только один товар по индексу
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
  }, 2000); // Исчезает через 2 секунды
}

// Данные товаров с несколькими фото
const products = {
  1: {
    name: "Белая рубашка (Ж)",
    price: 60,
    description: "Классическая белая рубашка из 100% хлопка для женщин. Идеальна для минималистичного стиля.",
    material: "100% хлопок",
    features: "Прямой крой, дышащая ткань",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=White+Shirt+2",
      "https://via.placeholder.com/600x600.png?text=White+Shirt+3"
    ]
  },
  2: {
    name: "Черные брюки (М)",
    price: 80,
    description: "Стильные черные брюки с прямым кроем для мужчин. Комфорт и элегантность в одном.",
    material: "Хлопок, полиэстер",
    features: "Устойчивость к износу, удобная посадка",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Black+Pants+2",
      "https://via.placeholder.com/600x600.png?text=Black+Pants+3"
    ]
  },
  5: {
    name: "Спортивный костюм",
    price: 90,
    description: "Спортивный костюм для активных. Свобода движений и стиль.",
    material: "Полиэстер, хлопок",
    features: "Эластичность, легкость",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Sport+2",
      "https://via.placeholder.com/600x600.png?text=Sport+3"
    ]
  },
  6: {
    name: "Кроссовки",
    price: 100,
    description: "Прочные кроссовки для улицы. Уверенность в каждом шаге.",
    material: "Кожа, резина",
    features: "Амортизация, износостойкость",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Sneakers+2",
      "https://via.placeholder.com/600x600.png?text=Sneakers+3"
    ]
  },
  7: {
    name: "Бейсболка",
    price: 25,
    description: "Простая бейсболка с дерзким дизайном. Завершай образ.",
    material: "Хлопок",
    features: "Регулируемый ремешок",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Cap+2",
      "https://via.placeholder.com/600x600.png?text=Cap+3"
    ]
  },
  8: {
    name: "Тренировочный жилет",
    price: 45,
    description: "Легкий жилет для тренировок. Докажи свою силу.",
    material: "Полиэстер",
    features: "Дышащая ткань, легкий вес",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Vest+2",
      "https://via.placeholder.com/600x600.png?text=Vest+3"
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

  const token = '8090185279:AAH5J9QOJkU96VsTyXIJhIe4kbsrswue7M0'; // Твой токен бота
  const chatId = '-4711226618'; // Твой ID чата
  const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        document.getElementById('checkout-form-container').classList.add('hidden');
        document.getElementById('checkout-success').classList.remove('hidden');
        setTimeout(() => {
          checkoutModal.classList.add('hidden');
          cart = []; // Очищаем корзину
          updateCart();
        }, 3000); // Модалка закроется через 3 секунды
      } else {
        alert('Ошибка при отправке заказа');
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
      alert('Ошибка при отправке заказа');
    });
});
