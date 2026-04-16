<template>
  <div class="hero">
    <h1 data-aos="zoom-in">ВІЧНА ЗЕМЛЯ АМФОРЕУС</h1>
  </div>
</template>

<script setup>
</script>

<style scoped>
.hero {
  width: 100%;
  height: 500px;
  /* Шлях до фонової картинки */
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('@/assets/img/StarRail_Image_1772632269.png');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid var(--gold);
}

.hero h1 {
  color: white;
  font-size: 3rem;
  text-shadow: 0 0 20px var(--gold);
  text-align: center;
  letter-spacing: 5px;
}
</style>