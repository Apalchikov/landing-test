// Функция для прокрутки к секции
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Функция для показа витрины MINIMAL
function showMinimalShowcase() {
  hideAllShowcases();
  const showcase = document.getElementById('minimal-showcase');
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
}

// Корзина
let cart = [];

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${item.name} - $${item.price} (${item.size})</span>
      <button onclick="removeFromCart(${item.id})">Удалить</button>
    `;
    cartItems.appendChild(cartItem);
  });
}

function addToCart(id, name, price, size) {
  cart.push({ id, name, price, size });
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Данные товаров с несколькими фото
const products = {
  1: {
    name: "Белая рубашка",
    price: 60,
    description: "Классическая белая рубашка из 100% хлопка. Идеальна для минималистичного стиля.",
    material: "100% хлопок",
    features: "Прямой крой, дышащая ткань",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=White+Shirt+2",
      "https://via.placeholder.com/600x600.png?text=White+Shirt+3"
    ]
  },
  2: {
    name: "Черные брюки",
    price: 80,
    description: "Стильные черные брюки с прямым кроем. Комфорт и элегантность в одном.",
    material: "Хлопок, полиэстер",
    features: "Устойчивость к износу, удобная посадка",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Black+Pants+2",
      "https://via.placeholder.com/600x600.png?text=Black+Pants+3"
    ]
  },
  3: {
    name: "Классические туфли",
    price: 120,
    description: "Кожаные туфли для любого случая. Сдержанный стиль и долговечность.",
    material: "Натуральная кожа",
    features: "Прочная подошва, классический дизайн",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Shoes+2",
      "https://via.placeholder.com/600x600.png?text=Shoes+3"
    ]
  },
  4: {
    name: "Простой свитер",
    price: 70,
    description: "Мягкий свитер из шерсти. Тепло и уют в минималистичном дизайне.",
    material: "Шерсть, акрил",
    features: "Теплый, мягкий на ощупь",
    images: [
      "https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg",
      "https://via.placeholder.com/600x600.png?text=Sweater+2",
      "https://via.placeholder.com/600x600.png?text=Sweater+3"
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

// Закрытие модального окна
document.getElementById('close-product-modal').addEventListener('click', () => {
  document.getElementById('product-modal').classList.add('hidden');
});

// Открытие корзины
document.getElementById('cart-button').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.remove('hidden');
});

// Закрытие корзины
document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.add('hidden');
});
