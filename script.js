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

// Обработчики событий для добавления в корзину
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.parentElement.parentElement;
    const id = parseInt(product.dataset.id);
    const name = product.dataset.name;
    const price = parseInt(product.dataset.price);
    const size = product.nextElementSibling.querySelector('.size-select').value; // Получаем выбранный размер
    addToCart(id, name, price, size);
  });
});

document.getElementById('cart-button').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.remove('hidden');
});

document.getElementById('close-cart').addEventListener('click', () => {
  document.getElementById('cart-modal').classList.add('hidden');
});
