<script setup>
import { ref, onMounted, nextTick } from 'vue';
import AOS from 'aos';
import ReviewsComponent from '@/components/ReviewsComponent.vue';
// import ReviewsComponent from '../components/ReviewsComponent.vue';

/** * РІВЕНЬ 2 & 3: Функція для динамічного імпорту зображень із assets/img.
 * Vite потребує використання URL для активів, які не лежать у папці public.
 */
const getImageUrl = (name) => {
  if (!name) return '';
  // Очищаємо ім'я від початкових слешів для коректної роботи
  const cleanName = name.startsWith('/') ? name.substring(1) : name;
  return new URL(`../assets/img/${cleanName}`, import.meta.url).href;
};

// РЕАКТИВНІ ЗМІННІ
const datetime = ref('');
const likes = ref({});

// Оновлення годинника в реальному часі
const updateClock = () => {
  const now = new Date();
  datetime.value = now.toLocaleDateString('uk-UA') + " " + now.toLocaleTimeString('uk-UA');
};

/**
 * ПОВНИЙ МАСИВ ГЕРОЇВ (13 ПЕРСОНАЖІВ)
 * Шляхи до фото вказані відносно папки src/assets/img/
 */
const heroesData = [
  { id: 'Аглая', img: 'photo_2026-03-03_14-14-56.jpg', reverse: false, title: 'Аглая', text: "У цьому священному місті, світанком укутаному, ткач ніжно погладжує золоті нитки, пов'язуючи долі.<br>Аглая «Золота пряжа», одна із Золотих нащадків, чиє ядро ​​полум'я — Романтика. Потрібно зібрати героїв цього світу і знову вирушити з ними у нескінченну подорож.<br>Вони скинуть богів, повернуть священне полум'я і відродять Амфореус, що вмирає.<br>Поліс: Охема<br>Божественна влада: Золотий Кокон Мнесення." },
  { id: 'Анакса', img: 'photo_2026-03-03_14-15-00.jpg', reverse: true, title: 'Анакса', text: "Гай муз , обитель знань і колиска, що вирощує філософів.<br>Але богохульний златіус Анаксагор запитує ядро ​​полум'я розуму. Невже ти готовий прийняти ганьбу, заперечуючи пророцтво, і встромити шипи сумніву в священне дерево мудрості?<br>- «Смішно. Цей світ сповнений брехні, і тільки я є істиною»." },
  { id: 'Мідей', img: 'photo_2026-03-03_14-14-58.jpg', reverse: false, title: 'Мідей', text: "Кремнос, що потонув у тумані, місто хаосу і воєн! Його королівська кров поєднується з кров'ю батьковбивці. Його бог носить ім'я лиха.<br>О безсмертний Мідеймос, лев без прайда, златіус, що полює на ядро ​​полум'я розбрату. Ти переживеш тисячі смертей, повернешся додому в крові і будеш самотньо нести безумство своєї долі." },
  { id: 'Касторія', img: 'photo_2026-03-03_14-15-06.jpg', reverse: true, title: 'Касторія', text: "Слуга смерті: Касторія<br>Край, що схиляється перед смертю, Айдонія , де вічно кружляє сніг, нині занурений у солодкий спокій.<br>Дочка Річки душ Касторія, златіус , що шукає ядро ​​полум'я «смерті», вирушай у дорогу. Ти маєш оберігати скорботу душ світу." },
  { id: 'Гіацина', img: 'photo_2026-03-03_14-15-02.jpg', reverse: false, title: 'Гіацина', text: "Поліс у хмарах зруйнувався з часом, Сутінковий двір знову відчинив свої ворота, приносячи проблиск світла у вічну ніч.<br>Лікарка Гіацинтія, златіус, що зберігає ядро ​​полум'я неба. Тобі належить успадкувати волю предків і залатати розрив між світанком та заходом сонця." },
  { id: 'Цифер', img: 'photo_2026-03-03_14-15-05.jpg', reverse: true, title: 'Цифер', text: "Спритна мандрівниця: Цифера<br>У Долосі, загубленому бандитському полісі, буяють і бавляться три сотні злодіїв.<br>Біжи, швидконога злодійська зірка Цифера, златіус, дражнячий ядро ​​полум'я підступності. «Хе-хе, хочеш обдурити мене? Не вийде!»" },
  { id: 'Тріббі', img: 'photo_2026-03-03_14-15-08.jpg', reverse: false, title: 'Тріббі', text: "Зі святої землі потрійного пророцтва посланка, поділена на тисячі тіл, вирушає у подорож.<br>О діви Янусополіса, Трібіос, златіуси, що вкрали ядро ​​полум'я брами. Ви повідомите про спасіння всім живим істотам." },
  { id: 'Фаєнон', img: 'photo_2026-03-03_14-15-11.jpg', reverse: true, title: 'Фаєнон', text: "Безіменний герой: Фаєнон<br>Елізія Ейдес , ізольоване село на краю світу.<br>Безіменний герой █████, златіус , що володіє ядром полум'я опори світу, ти повинен пам'ятати про ідеали і нести на своїх плечах долі людей." },
  { id: 'Дань Хен', img: '5b5e1b3f5ca91727c24a9213f7e56626.jpg', reverse: false, title: 'Дань Хен', text: "Розколота земля тримається на грудях Георіоса та тілі дракона, тисячоліття приносячи їм страждання.<br>Безіменний Дань Хен, златіус , що захищає ядро ​​полум'я землі, убережи світ від руйнування." },
  { id: 'Темінь', img: 'image.png', reverse: true, title: 'Темінь', text: "У відокремленій від світу зоні спогадів світло свічки відбиває минуле.<br>Темінь, дитя Пам'яті з тіні, златіус , що приховує ядро ​​полум'я часу, ти повинна підняти хвилю забуття. «Не турбуйся, я охоронятиму шлях твого Освоєння»." },
  { id: 'Гісіленса', img: 'image (2).png', reverse: false, title: 'Гісіленса', text: "Стиксія , прибережне місто мрій і хмелю.<br>Дочка моря Гелектра, златіус , що очистила ядро ​​полум'я океану, ти повинна позбутися каламутної течії і влаштувати для героїв з-за меж неба великий бенкет." },
  { id: 'Керідра', img: 'image (1).png', reverse: true, title: 'Керідра', text: "Північна Імперія , втрачена династія.<br>Володарка Керідра, златіус , що володіє ядром полум'я правосуддя, ти повинна розставити постаті, зіграти партію з богами і закласти основу для полум'я." },
  { id: 'Кірена', img: '★.jpg', reverse: false, title: 'Кірена', text: "Метеор розтинає нічне небо, малюючи бриж на річці життя.<br>Дочка Елізії Ейдес, златіус , що вирощує «██», посади насіння Пам'яті, щоб квіти минулого розцвіли в майбутньому дні. ♪" }
];

// Ініціалізація при монтуванні
onMounted(async () => {
  await nextTick();
  // Налаштування анімації прокрутки
  AOS.init({ duration: 1000, once: false, offset: 120 });
  setTimeout(() => { AOS.refresh(); }, 300);

  // Запуск годинника
  setInterval(updateClock, 1000);
  updateClock();

  // Завантаження лайків з LocalStorage (Рівень 3: Робота з даними)
  heroesData.forEach(h => {
    likes.value[h.id] = parseInt(localStorage.getItem(`like_${h.id}`)) || 0;
  });
});

const addLike = (id) => {
  likes.value[id]++;
  localStorage.setItem(`like_${id}`, likes.value[id]);
};

const resetLikes = () => {
  if(confirm("Видалити всі лайки?")) {
    heroesData.forEach(h => {
      likes.value[h.id] = 0;
      localStorage.removeItem(`like_${h.id}`);
    });
  }
};
</script>

<template>
  <div class="amphoreus-site">
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
      <div class="container">
        <a class="navbar-brand fw-bold" href="#" style="color: #D2BD6B;">
          <img :src="getImageUrl('free-icon-laurel-wreath-6024816.png')" width="40" class="me-2"> 
          AMPHOREUS
        </a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item"><a class="nav-link text-white px-3" href="#lore-target">ЛОР</a></li>
            <li class="nav-item"><a class="nav-link text-white px-3" href="#heroes">ГЕРОЇ</a></li>
            <li class="nav-item"><a class="nav-link text-white px-3" href="#locations">ЛОКАЦІЇ</a></li>
            <li class="nav-item ms-lg-3 me-3">
              <a class="btn btn-gold btn-sm px-4 fw-bold" href="https://hsr.hoyoverse.com/ru-ru/" target="_blank">ГРАТИ БЕЗКОШТОВНО</a>
            </li>
            <li class="nav-item text-white font-monospace small" style="color: #D2BD6B !important;">{{ datetime }}</li>
          </ul>
        </div>
      </div>
    </nav>

   <div class="hero" :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${getImageUrl('StarRail_Image_1772632269.png')})` }">
  <h1 data-aos="zoom-in" style="color: white !important;">ВІЧНА ЗЕМЛЯ АМФОРЕУС</h1>
</div>
    <div class="container mt-5">
      <section class="p-4 rounded border-start border-white border-5" style="background: #1A1C35;" data-aos="fade-up">
        <p class="lead text-center m-0" style="color: #f4f4f4;">
          <span id="lore-target" style="scroll-margin-top: 100px;">Вічна</span> земля, Амфореус — грабельний світ і локація в Honkai: Star Rail. Він прихований від інших світів і його можна побачити лише крізь дзеркало Саду спогадів. Також за словами Чорного Лебедя Амфореус це світ, схильний до впливу трьох Шляхів: Ерудиція, Пам'ять і Руйнування. Насправді Амфореус — симульований світ у скіпетрі δ-me13, який перебуває у стані постійного циклу.
        </p>
      </section>

      <h2 id="heroes" class="section-title h1" data-aos="fade-right">ГЕРОЇ АМФОРЕУСУ</h2>

      <div class="text-end mb-4" data-aos="fade-in">
        <button class="btn btn-sm btn-outline-danger shadow-sm" @click="resetLikes">
          <i class="fa-solid fa-trash-can me-1"></i> Скинути всі лайки
        </button>
      </div>

      <div v-for="hero in heroesData" :key="hero.id" class="row align-items-center char-row" data-aos="fade-up">
        <div :class="['col-md-7 char-info', hero.reverse ? 'order-md-2 ps-md-5' : '']">
          <h3>{{ hero.title }}</h3>
          <p v-html="hero.text"></p>
          <div class="mt-3">
            <button class="btn btn-gold" @click="addLike(hero.id)">
              <i class="fa-regular fa-heart me-1"></i> Лайк: <span>{{ likes[hero.id] }}</span>
            </button>
          </div>
        </div>
        <div :class="['col-md-5', hero.reverse ? 'order-md-1' : '']">
          <div class="char-photo-box rounded shadow">
            <img :src="getImageUrl(hero.img)" :alt="hero.title" class="img-fluid">
          </div>
        </div>
      </div>

      <h2 id="locations" class="section-title h1" data-aos="fade-left">ЛОКАЦІЇ СВІТУ</h2>
      
      <div id="locationCarousel" class="carousel slide shadow-lg mb-5" data-bs-ride="carousel" data-aos="zoom-in">
        <div class="carousel-inner rounded border border-gold">
          <div class="carousel-item active">
            <img :src="getImageUrl('StarRail_Image_1772642597.png')" class="d-block w-100" alt="Охема">
            <div class="carousel-caption d-none d-md-block bg-dark-transparent">
              <h5>Священний Поліс Охема</h5>
              <p>Місто золотої пряжі та вічного світанку.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img :src="getImageUrl('StarRail_Image_1772642822.png')" class="d-block w-100" alt="Кремнос">
            <div class="carousel-caption d-none d-md-block bg-dark-transparent">
              <h5>Кремнос - Місто Хаосу</h5>
              <p>Оселя воєн та незламних королів.</p>
            </div>
          </div>
          <div class="carousel-item">
            <img :src="getImageUrl('StarRail_Image_1772643099.png')" class="d-block w-100" alt="Стиксія">
            <div class="carousel-caption d-none d-md-block bg-dark-transparent">
              <h5>Прибережна Стиксія</h5>
              <p>Місто мрій, де пісні хвиль ніколи не вщухають.</p>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#locationCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#locationCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
<ReviewsComponent />
    <footer class="mt-5 py-5 border-top border-gold" style="background: #050614;">
      <div class="container text-center">
        <h3 class="fw-bold mb-4" style="color: #D2BD6B;">HoYoverse</h3>
        <div class="d-flex justify-content-center gap-3 mb-4">
          <a href="https://x.com/honkaistarrail" target="_blank" class="btn btn-outline-warning btn-sm px-3">TWITTER</a>
          <a href="https://www.youtube.com/@HonkaiStarRail" target="_blank" class="btn btn-outline-warning btn-sm px-3">YOUTUBE</a>
          <a href="https://discord.gg/honkaistarrail" target="_blank" class="btn btn-outline-warning btn-sm px-3">DISCORD</a>
        </div>
        <p class="text-muted small">Amphoreus © 2026 | Світ прихований у дзеркалі</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/** РІВЕНЬ 3: Коментарі до стилів. 
 * Використовуємо scoped для ізоляції стилів компонента.
 */
.amphoreus-site { 
  background-color: #07091F; 
  color: #f4f4f4; 
  min-height: 100vh; 
  scroll-behavior: smooth; 
}

/* Навігаційна панель */
.navbar { 
  background-color: rgba(7, 9, 31, 0.95); 
  border-bottom: 2px solid #D2BD6B; 
}
.btn-gold { 
  color: #D2BD6B; 
  border: 1px solid #D2BD6B; 
  background: transparent; 
  transition: 0.3s; 
  font-weight: bold; 
}
.btn-gold:hover { 
  background: #D2BD6B; 
  color: #07091F; 
  box-shadow: 0 0 15px #D2BD6B; 
}

/* Секція ЛОРу */
.border-white { 
  border-left: 6px solid #ffffff !important; 
}
#lore-target { 
  scroll-margin-top: 120px; 
  display: inline-block; 
}

/* Ефектний заголовок Hero */
.hero {
  width: 100%; 
  height: 500px;
  /* Шлях через public доступний прямо, через assets — через функцію (тут для CSS залишено public шлях) */
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/StarRail_Image_1772632269.png');
  background-size: cover; 
  background-position: center;
  display: flex; 
  align-items: center; 
  justify-content: center;
  border-bottom: 2px solid #D2BD6B;
}
.hero h1 { 
  font-size: 3.5rem; 
  text-shadow: 0 0 20px #D2BD6B; 
  letter-spacing: 5px; 
  font-weight: bold;
}

/* Картки героїв */
.section-title { 
  text-align: center; 
  color: #D2BD6B; 
  padding: 20px; 
  margin: 80px 0 40px; 
  border: 1px solid #D2BD6B; 
  letter-spacing: 4px; 
  text-transform: uppercase; 
}
.char-row { 
  margin-bottom: 120px; 
  padding-bottom: 40px; 
  border-bottom: 1px solid rgba(210, 189, 107, 0.1); 
}
.char-info h3 { 
  color: #D2BD6B; 
  font-size: 2.5rem; 
  margin-bottom: 20px; 
}
.char-photo-box { 
  border: 1px solid #D2BD6B; 
  overflow: hidden; 
  transition: 0.5s ease; 
}
.char-photo-box:hover { 
  transform: translateY(-10px) scale(1.02); 
  box-shadow: 0 10px 30px rgba(210, 189, 107, 0.3); 
}

/* Адаптивність для мобільних */
@media (max-width: 768px) {
  .hero h1 { font-size: 2rem; }
  .char-row { text-align: center; }
  .ps-md-5 { padding-left: 0 !important; }
}
</style>