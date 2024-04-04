

<template>
  <div id="app" v-if="!isLoading">
    <component :is="currentComponent" />
  </div>
</template>

<script setup>
import { ref, onMounted, markRaw } from 'vue'

import frog1 from '/src/assets/img/frog1.svg';
import frog2 from '/src/assets/img/frog2.svg';
import frog3 from '/src/assets/img/frog3.svg';
import frog4 from '/src/assets/img/frog4.svg';
import frog5 from '/src/assets/img/frog5.svg';
import frog7 from '/src/assets/img/frog7.svg';
import frog8 from '/src/assets/img/frog8.svg';
import frog9 from '/src/assets/img/frog9.svg';

import image1 from '/src/assets/img/image1.jpg';
import image2 from '/src/assets/img/image2.png';



let currentComponent = ref('router-view')
let isLoading = ref(true);
const imagesToPreload = [
  frog1,
  frog2,
  frog3,
  frog4,
  frog5,
  frog7,
  frog8,
  frog9,
  image1,
  image2,
];

onMounted(async () => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // L'utilisateur est sur un téléphone
    const ComponentPhone = markRaw((await import('./components/phone.vue')).default)
    currentComponent.value = ComponentPhone
    isLoading.value = false;
  } else {
    const images = imagesToPreload.map(imageSrc => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    try {
      await Promise.all(images);
      console.log("Images loaded!");
      isLoading.value = false;
    } catch (error) {
      console.error("Some images failed loading!");
      console.error(error.message)
    }
  }
});
</script>
