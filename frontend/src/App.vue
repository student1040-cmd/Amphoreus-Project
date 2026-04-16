<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style>
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