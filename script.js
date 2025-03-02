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
      <p class="slogan">Ваш стиль — ваша история.</p>
      <p class="about-text">DYNASTY — это ваша свобода самовыражения через стиль. Каждый образ становится частью вашей уникальной истории с качественной одеждой, отражающей современные тренды и индивидуальность.</p>
      <button onclick="scrollToSection('collections')">Просмотреть коллекции</button>
    </div>
  </header>

  <!-- Секция "Коллекции" -->
  <section id="collections" class="section collections-section">
    <div class="container">
      <h2>Наши коллекции</h2>
      <div class="collection-grid">
        <!-- Коллекция MINIMAL -->
        <div class="collection-item" onclick="showMinimalShowcase()">
          <img src="https://cdn.zenden.cloud/oeR8tNVmuRHmH_25FzuAnTVGysUaT0qU17nqj7Bfya8/resize:fit:1440:600:false:false:ce:0:0/aHR0cHM6Ly9iYWNrZW5kLnNhbGFtYW5kZXIucnUvdXBsb2FkL2libG9jay8wN2QvanEwaDlkMXM0NDk4dG14MjE2dDducGt2bDIwMm0yeGQucG5n.png" alt="MINIMAL Collection">
          <div class="collection-item-content">
            <h3>MINIMAL</h3>
            <p>Минимализм в каждом детале.</p>
          </div>
        </div>

        <!-- Коллекция FIGHTER -->
        <div class="collection-item" onclick="showFighterShowcase()">
          <img src="https://img08.rl0.ru/afisha/e1200x800i/daily.afisha.ru/uploads/images/b/8a/b8a18c1b099ac560f5c1fc27618ed838.jpg" alt="FIGHTER Collection">
          <div class="collection-item-content">
            <h3>FIGHTER</h3>
            <p>Сила и уверенность в каждом образе.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Витрина коллекции MINIMAL -->
  <section id="minimal-showcase" class="section showcase-section hidden">
    <div class="container">
      <h2>Коллекция MINIMAL</h2>
      <p>Минимализм в каждой детали. Простота и элегантность.</p>
      <div class="product-grid">
        <!-- Товар 1 -->
        <div class="product-row" onclick="openProductModal(1)">
          <div class="product-item" data-id="1" data-name="Белая рубашка" data-price="60">
            <img src="https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg" alt="Белая рубашка">
            <div class="product-info">
              <h4>Белая рубашка</h4>
              <span class="price">$60</span>
            </div>
          </div>
          <div class="product-description">
            <p>Классическая белая рубашка из 100% хлопка. Идеальна для минималистичного стиля.</p>
          </div>
        </div>

        <!-- Товар 2 -->
        <div class="product-row" onclick="openProductModal(2)">
          <div class="product-item" data-id="2" data-name="Черные брюки" data-price="80">
            <img src="https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg" alt="Черные брюки">
            <div class="product-info">
              <h4>Черные брюки</h4>
              <span class="price">$80</span>
            </div>
          </div>
          <div class="product-description">
            <p>Стильные черные брюки с прямым кроем. Комфорт и элегантность в одном.</p>
          </div>
        </div>

        <!-- Товар 3 -->
        <div class="product-row" onclick="openProductModal(3)">
          <div class="product-item" data-id="3" data-name="Классические туфли" data-price="120">
            <img src="https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg" alt="Классические туфли">
            <div class="product-info">
              <h4>Классические туфли</h4>
              <span class="price">$120</span>
            </div>
          </div>
          <div class="product-description">
            <p>Кожаные туфли для любого случая. Сдержанный стиль и долговечность.</p>
          </div>
        </div>

        <!-- Товар 4 -->
        <div class="product-row" onclick="openProductModal(4)">
          <div class="product-item" data-id="4" data-name="Простой свитер" data-price="70">
            <img src="https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg" alt="Простой свитер">
            <div class="product-info">
              <h4>Простой свитер</h4>
              <span class="price">$70</span>
            </div>
          </div>
          <div class="product-description">
            <p>Мягкий свитер из шерсти. Тепло и уют в минималистичном дизайне.</p>
          </div>
        </div>
      </div>
      <button onclick="goBack()">Назад к коллекциям</button>
    </div>
  </section>

  <!-- Витрина коллекции FIGHTER -->
  <section id="fighter-showcase" class="section showcase-section hidden">
    <div class="container">
      <h2>Коллекция FIGHTER</h2>
      <p>Сила и уверенность в каждом образе. Агрессивный стиль для настоящих бойцов.</p>
      <div class="product-grid">
        <!-- Товар 1 -->
        <div class="product-row" onclick="openProductModal(5)">
          <div class="product-item" data-id="5" data-name="Спортивный костюм" data-price="90">
            <img src="https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg" alt="Спортивный костюм">
            <div class="product-info">
              <h4>Спортивный костюм</h4>
              <span class="price">$90</span>
            </div>
          </div>
          <div class="product-description">
            <p>Спортивный костюм для активных. Свобода движений и стиль.</p>
          </div>
        </div>

        <!-- Товар 2 -->
        <div class="product-row" onclick="openProductModal(6)">
          <div class="product-item" data-id="6" data-name="Кроссовки" data-price="100">
            <img src="https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg" alt="Кроссовки">
            <div class="product-info">
              <h4>Кроссовки</h4>
              <span class="price">$100</span>
            </div>
          </div>
          <div class="product-description">
            <p>Прочные кроссовки для улицы. Уверенность в каждом шаге.</p>
          </div>
        </div>

        <!-- Товар 3 -->
        <div class="product-row" onclick="openProductModal(7)">
          <div class="product-item" data-id="7" data-name="Бейсболка" data-price="25">
            <img src="https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg" alt="Бейсболка">
            <div class="product-info">
              <h4>Бейсболка</h4>
              <span class="price">$25</span>
            </div>
          </div>
          <div class="product-description">
            <p>Простая бейсболка с дерзким дизайном. Завершай образ.</p>
          </div>
        </div>

        <!-- Товар 4 -->
        <div class="product-row" onclick="openProductModal(8)">
          <div class="product-item" data-id="8" data-name="Тренировочный жилет" data-price="45">
            <img src="https://kingboxer.ru/upload/iblock/69e/69e740686b62ccba98f5db40a85e9694.jpg" alt="Тренировочный жилет">
            <div class="product-info">
              <h4>Тренировочный жилет</h4>
              <span class="price">$45</span>
            </div>
          </div>
          <div class="product-description">
            <p>Легкий жилет для тренировок. Докажи свою силу.</p>
          </div>
        </div>
      </div>
      <button onclick="goBack()">Назад к коллекциям</button>
    </div>
  </section>

  <!-- Секция "Контакты" -->
  <section id="contacts" class="section">
    <div class="container">
      <h2>Свяжитесь с нами</h2>
      <p>Напишите нам в Telegram:</p>
      <a href="https://t.me/dynastybrand" target="_blank">Telegram</a>
    </div>
  </section>

  <!-- Кнопка корзины -->
  <button id="cart-button" class="cart-button">Корзина</button>

  <!-- Модальное окно корзины -->
  <div id="cart-modal" class="cart-modal hidden">
    <div class="cart-content">
      <h2>Ваша корзина</h2>
      <div id="cart-items"></div>
      <button id="close-cart">Закрыть</button>
    </div>
  </div>

  <!-- Модальное окно товара -->
  <div id="product-modal" class="product-modal hidden">
    <div class="product-modal-content">
      <span id="close-product-modal" class="close-modal">&times;</span>
      <div class="modal-gallery">
        <img id="modal-image" src="" alt="Product Image">
        <button id="prev-image" class="gallery-btn">◄</button>
        <button id="next-image" class="gallery-btn">►</button>
      </div>
      <div class="modal-details">
        <h2 id="modal-title"></h2>
        <p id="modal-price"></p>
        <p id="modal-description"></p>
        <p><strong>Материал:</strong> <span id="modal-material"></span></p>
        <p><strong>Особенности:</strong> <span id="modal-features"></span></p>
        <label for="modal-size">Размер:</label>
        <select id="modal-size" class="size-select">
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
        <button id="add-to-cart-modal" class="add-to-cart">Добавить в корзину</button>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
