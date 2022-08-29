<script setup>
import StartScreen from './components/start-screen.vue'
</script>

<template>
  <div style="width:100%; height: 100%; overflow: hidden">
    <StartScreen/>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
