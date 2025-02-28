<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DYNASTY - Официальный сайт</title>
  <link rel="stylesheet" href="styles.css">
  <!-- Подключение шрифта Bebas Neue -->
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
</head>
<body>
  <!-- Главная секция -->
  <header class="hero-section">
    <div class="container">
      <h1 class="logo">DYNASTY</h1>
      <p class="slogan">Стиль, который остается.</p>
      <button onclick="scrollToSection('categories')">Просмотреть коллекцию</button>
    </div>
  </header>

  <!-- Секция "О бренде" -->
  <section id="about" class="section">
    <div class="container">
      <h2>О бренде</h2>
      <p>
        DYNASTY — это бренд одежды, сочетающий минимализм и функциональность. 
        Мы создаем уникальные вещи, которые остаются актуальными сезон за сезоном.
      </p>
    </div>
  </section>

  <!-- Секция "Категории товаров" -->
  <section id="categories" class="section categories-section">
    <div class="container">
      <h2>Коллекции</h2>
      <div class="categories-grid">
        <div class="category-item" onclick="addToCart('Толстовка', 50)">
          <img src="https://via.placeholder.com/150" alt="Толстовка">
          <p>Толстовка</p>
          <span>$50</span>
        </div>
        <div class="category-item" onclick="addToCart('Футболка', 30)">
          <img src="https://via.placeholder.com/150" alt="Футболка">
          <p>Футболка</p>
          <span>$30</span>
        </div>
        <div class="category-item" onclick="addToCart('Джинсы', 80)">
          <img src="https://via.placeholder.com/150" alt="Джинсы">
          <p>Джинсы</p>
          <span>$80</span>
        </div>
      </div>
      <button onclick="openCart()">Посмотреть корзину</button>
    </div>
  </section>

  <!-- Секция "Контакты" -->
  <section id="contacts" class="section">
    <div class="container">
      <h2>Свяжитесь с нами</h2>
      <p>Напишите нам в Telegram или Instagram:</p>
      <a href="https://t.me/dynastybrand" target="_blank">Telegram</a>
      <a href="https://instagram.com/dynastybrand" target="_blank">Instagram</a>
    </div>
  </section>

  <!-- Модальное окно корзины -->
  <div id="cart-modal" class="modal hidden">
    <div class="modal-content">
      <h2>Корзина</h2>
      <ul id="cart-items"></ul>
      <p id="total-price">Общая сумма: $0</p>
      <button onclick="closeCart()">Закрыть</button>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
