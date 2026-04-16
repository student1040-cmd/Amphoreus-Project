<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style>
/* Стилі для телефонів (екран менше 768px) */
@media (max-width: 768px) {
  .container {
    width: 95%; /* Не даємо контенту липнути до країв */
    padding: 10px;
  }

  h1 {
    font-size: 24px; /* Зменшуємо заголовки */
  }

  /* Якщо у тебе були блоки в ряд (flex-direction: row), 
     робимо їх один під одним */
  .flex-container {
    flex-direction: column;
  }

  /* Робимо картинки такими, щоб не вилазили за екран */
  img {
    max-width: 100%;
    height: auto;
  }
}
:root {
    --gold: #D2BD6B;
    --dark-blue: #07091F;
    --panel: #1A1C35;
}

body {
    background-color: var(--dark-blue);
    color: #f4f4f4;
    scroll-behavior: smooth;
    margin: 0;
    font-family: sans-serif;
}

.btn-gold {
    color: var(--gold);
    border: 1px solid var(--gold);
    transition: 0.3s;
}

.btn-gold:hover {
    background: var(--gold);
    color: var(--dark-blue);
}

.section-title {
    text-align: center;
    color: var(--gold);
    padding: 20px;
    margin: 60px 0 40px;
    border: 1px solid var(--gold);
    letter-spacing: 4px;
    text-transform: uppercase;
}
</style>