// Функция для прокрутки к секции
function scrollToSection(sectionId) {
  console.log(`Прокрутка к секции: ${sectionId}`);
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.section:not(#' + sectionId + ')').forEach(sec => {
      sec.classList.add('hidden');
    });
  } else {
    console.error(`Секция с ID ${sectionId} не найдена`);
  }
}

// Показать категорию
function showCategory(categoryId) {
  console.log(`Открытие категории: ${categoryId}`);
  const categorySection = document.getElementById(categoryId);
  const catalogSection = document.getElementById('catalog');
  if (categorySection && catalogSection) {
    categorySection.classList.remove('hidden');
    catalogSection.classList.add('hidden');
    categorySection.scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.section:not(#' + categoryId + ')').forEach(sec => {
      if (sec.id !== 'catalog') {
        sec.classList.add('hidden');
      }
    });
  } else {
    console.error(`Категория ${categoryId} или каталог не найдены`);
  }
}

// Вернуться к каталогу
function goBackToCatalog() {
  console.log('Возврат к каталогу');
  const catalogSection = document.getElementById('catalog');
  if (catalogSection) {
    catalogSection.classList.remove('hidden');
    catalogSection.scrollIntoView({ behavior: 'smooth' });
    document.querySelectorAll('.section:not(#catalog)').forEach(sec => {
      sec.classList.add('hidden');
    });
  } else {
    console.error('Каталог не найден');
  }
}

// Корзина
let cart = [];

// Загрузка корзины из localStorage
document.addEventListener('DOMContentLoaded', () => {
  console.log('Страница загружена, инициализация...');
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }

  // Привязка событий
  const cartButton = document.getElementById('cart-button');
  const closeCart = document.getElementById('close-cart');
  const closeProductModal = document.getElementById('close-product-modal');
  const closeCheckoutModal = document.getElementById('close-checkout-modal');
  const checkoutButton = document.getElementById('checkout');
  const checkoutForm = document.getElementById('checkout-form');

  if (cartButton) {
    cartButton.addEventListener('click', openCartModal);
  } else {
    console.error('Кнопка корзины не найдена');
  }

  if (closeCart) {
    closeCart.addEventListener('click', closeCartModal);
  } else {
    console.error('Кнопка закрытия корзины не найдена');
  }

  if (closeProductModal) {
    closeProductModal.addEventListener('click', closeProductModal);
  } else {
    console.error('Кнопка закрытия модального окна товара не найдена');
  }

  if (closeCheckoutModal) {
    closeCheckoutModal.addEventListener('click', closeCheckoutModal);
  } else {
    console.error('Кнопка закрытия модального окна заказа не найдена');
  }

  if (checkoutButton) {
    checkoutButton.addEventListener('click', openCheckoutModal);
  } else {
    console.error('Кнопка оформления заказа не найдена');
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  } else {
    console.error('Форма заказа не найдена');
  }
});

// Обновление корзины
function updateCart() {
  console.log('Обновление корзины:', cart);
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const checkoutButton = document.getElementById('checkout');
  if (!cartItems || !cartCount || !checkoutButton) {
    console.error('Элементы корзины не найдены');
    return;
  }

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

  cartCount.textContent = cart.length;
  checkoutButton.disabled = cart.length === 0;
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Добавление в корзину
function addToCart(id, name, price, size) {
  console.log(`Добавление в корзину: ${name}, размер: ${size}`);
  cart.push({ id, name, price, size });
  updateCart();
  showCartNotification();
}

// Удаление из корзины
function removeFromCart(index) {
  console.log(`Удаление из корзины, индекс: ${index}`);
  cart.splice(index, 1);
  updateCart();
}

// Очистка корзины
function clearCart() {
  console.log('Очистка корзины');
  cart = [];
  updateCart();
  localStorage.removeItem('cart');
}

// Уведомление о добавлении в корзину
function showCartNotification() {
  console.log('Показ уведомления');
  const notification = document.getElementById('cart-notification');
  if (notification) {
    notification.classList.remove('hidden');
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
      notification.classList.add('hidden');
    }, 2000);
  } else {
    console.error('Уведомление не найдено');
  }
}

// Открытие корзины
function openCartModal() {
  console.log('Открытие корзины');
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.classList.add('open');
  } else {
    console.error('Модальное окно корзины не найдено');
  }
}

// Закрытие корзины
function closeCartModal() {
  console.log('Закрытие корзины');
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.classList.remove('open');
  }
}

// Модальное окно товара
let currentImageIndex = 0;

function openProductModal(productId) {
  console.log(`Открытие модального окна товара: ${productId}`);
  const product = products[productId];
  if (!product) {
    console.error(`Товар с ID ${productId} не найден`);
    return;
  }

  const modal = document.getElementById('product-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalPrice = document.getElementById('modal-price');
  const modalDescription = document.getElementById('modal-description');
  const modalMaterial = document.getElementById('modal-material');
  const modalFeatures = document.getElementById('modal-features');
  const modalSize = document.getElementById('modal-size');
  const addToCartButton = document.getElementById('add-to-cart-modal');
  const buyNowButton = document.getElementById('buy-now-modal');

  if (!modal || !modalImage || !modalTitle || !modalPrice || !modalDescription || !modalMaterial || !modalFeatures || !modalSize || !addToCartButton || !buyNowButton) {
    console.error('Элементы модального окна товара не найдены');
    return;
  }

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
  if (prevButton && nextButton) {
    prevButton.onclick = () => changeImage(-1, product.images);
    nextButton.onclick = () => changeImage(1, product.images);
  } else {
    console.error('Кнопки галереи не найдены');
  }

  addToCartButton.onclick = () => {
    console.log(`Добавление в корзину из модалки: ${product.name}`);
    addToCart(productId, product.name, product.price, modalSize.value);
  };

  buyNowButton.onclick = () => {
    console.log(`Покупка сейчас: ${product.name}`);
    addToCart(productId, product.name, product.price, modalSize.value);
    closeProductModal();
    openCheckoutModal();
  };

  modal.classList.remove('hidden');
}

function changeImage(direction, images) {
  console.log(`Смена изображения, направление: ${direction}`);
  currentImageIndex += direction;
  if (currentImageIndex < 0) currentImageIndex = images.length - 1;
  if (currentImageIndex >= images.length) currentImageIndex = 0;
  const modalImage = document.getElementById('modal-image');
  if (modalImage) {
    modalImage.src = images[currentImageIndex];
  }
}

function closeProductModal() {
  console.log('Закрытие модального окна товара');
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Модальное окно оформления заказа
function openCheckoutModal() {
  console.log('Открытие модального окна заказа');
  if (cart.length === 0) {
    console.warn('Корзина пуста, модалка не открывается');
    return;
  }
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutFormContainer = document.getElementById('checkout-form-container');
  const checkoutSuccess = document.getElementById('checkout-success');
  if (checkoutModal && checkoutFormContainer && checkoutSuccess) {
    checkoutFormContainer.classList.remove('hidden');
    checkoutSuccess.classList.add('hidden');
    checkoutModal.classList.remove('hidden');
    closeCartModal();
  } else {
    console.error('Элементы модального окна заказа не найдены');
  }
}

function closeCheckoutModal() {
  console.log('Закрытие модального окна заказа');
  const checkoutModal = document.getElementById('checkout-modal');
  if (checkoutModal) {
    checkoutModal.classList.add('hidden');
  }
}

// Обработка отправки заказа
async function handleCheckoutSubmit(e) {
  e.preventDefault();
  console.log('Отправка заказа...');
  const nameInput = document.getElementById('name-input');
  const contactInput = document.getElementById('contact-input');
  if (!nameInput || !contactInput) {
    console.error('Поля формы заказа не найдены');
    return;
  }

  const name = nameInput.value;
  const contact = contactInput.value;

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
      console.log('Заказ успешно отправлен');
      const checkoutFormContainer = document.getElementById('checkout-form-container');
      const checkoutSuccess = document.getElementById('checkout-success');
      if (checkoutFormContainer && checkoutSuccess) {
        checkoutFormContainer.classList.add('hidden');
        checkoutSuccess.classList.remove('hidden');
        cart = [];
        updateCart();
        localStorage.removeItem('cart');
        setTimeout(closeCheckoutModal, 3000);
      }
    } else {
      console.error('Ошибка при отправке заказа');
      alert('Ошибка при отправке заказа. Попробуйте снова.');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка. Проверьте подключение к интернету.');
  }
}

// Данные товаров
const products = {
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
