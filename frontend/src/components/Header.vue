<script setup>
import { ref, onMounted } from 'vue';

const currentTime = ref('');

const updateClock = () => {
  const now = new Date();
  // Формат як на скріншоті: 15.04.2026 17:10:43
  currentTime.value = now.toLocaleString('uk-UA', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
};

onMounted(() => {
  setInterval(updateClock, 1000); // Оновлюємо кожну секунду
  updateClock(); // Перший запуск
});
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark sticky-top" style="background-color: rgba(7, 9, 31, 0.95); border-bottom: 2px solid var(--gold);">
    <div class="container align-items-center">
      <a class="navbar-brand d-flex align-items-center fw-bold" href="#" style="color: var(--gold); letter-spacing: 2px;">
        <img src="/free-icon-laurel-wreath-6024816.png" alt="Logo" width="35" class="me-2">
        AMPHOREUS
      </a>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto text-uppercase" style="letter-spacing: 1px;">
          <li class="nav-item"><a class="nav-link text-white px-3" href="#lore">ЛОР</a></li>
          <li class="nav-item"><a class="nav-link text-white px-3" href="#heroes">ГЕРОЇ</a></li>
          <li class="nav-item"><a class="nav-link text-white px-3" href="#locations">ЛОКАЦІЇ</a></li>
        </ul>
      </div>

      <a class="btn btn-gold btn-sm px-4 fw-bold me-3" href="https://hsr.hoyoverse.com/" target="_blank">ГРАТИ БЕЗКОШТОВНО</a>

      <div class="text-white-50 small font-monospace" style="letter-spacing: 1px;">
        {{ currentTime }}
      </div>
    </div>
  </nav>
</template>