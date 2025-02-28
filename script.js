// Переменная для хранения товаров в коллекциях
const collections = {
  minimal: [
    { name: 'Белая рубашка', price: 60 },
    { name: 'Черные брюки', price: 80 },
    { name: 'Классические туфли', price: 120 }
  ],
  fighter: [
    { name: 'Спортивный костюм', price: 90 },
    { name: 'Кроссовки', price: 100 },
    { name: 'Бейсболка', price: 25 }
  ]
};

// Функция для показа коллекции
function showCollection(collectionName) {
  const modal = document.getElementById('collection-modal');
  const title = document.getElementById('collection-title');
  const itemsList = document.getElementById('collection-items');

  // Устанавливаем заголовок модального окна
  title.textContent = collectionName.toUpperCase();

  // Очищаем список товаров
  itemsList.innerHTML = '';

  // Добавляем товары из выбранной коллекции
  collections[collectionName].forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - $${item.price}`;
    listItem.style.cursor = 'pointer';
    listItem.onclick = () => addToCart(item.name, item.price);
    itemsList.appendChild(listItem);
  });

  // Показываем модальное окно
  modal.classList.remove('hidden');
}

// Функция для закрытия модального окна коллекции
function closeCollection() {
  document.getElementById('collection-modal').classList.add('hidden');
}

// Функция для добавления товара в корзину
function addToCart(itemName, price) {
  alert(`Добавлено в корзину: ${itemName} - $${price}`);
}

// Функция для прокрутки к секции
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}
