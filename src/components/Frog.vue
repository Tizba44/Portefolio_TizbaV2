<template>
    <img v-if="transitions[currentFrog]" :src="transitions[currentFrog].src" class="frog" alt="frog">
</template>


<script setup>
import { onMounted, ref } from 'vue';

import anime from 'animejs/lib/anime.es.js';

import frog1 from '/src/assets/img/frog1.svg';
import frog2 from '/src/assets/img/frog2.svg';
import frog3 from '/src/assets/img/frog3.svg';
import frog4 from '/src/assets/img/frog4.svg';
import frog5 from '/src/assets/img/frog5.svg';
import frog7 from '/src/assets/img/frog7.svg';
import frog8 from '/src/assets/img/frog8.svg';
import frog9 from '/src/assets/img/frog9.svg';

const currentFrog = ref(0);

function createTransitions(name, src, count) {
    return Array(count).fill({ name, src });
}

const transitions = ref([
    ...createTransitions('frog1', frog1, 6), // floor

    ...createTransitions('frog2', frog2, 2), // up

    { name: 'frog3', src: frog3 }, // summit

    ...createTransitions('frog4', frog4, 1), // down

    ...createTransitions('frog5', frog5, 2),

    ...createTransitions('frog1', frog1, 4), // floor

    ...createTransitions('frog2', frog2, 2),

    { name: 'frog7', src: frog7 }, // transformation
    { name: 'frog8', src: frog8 },
    { name: 'frog9', src: frog9 },
]);

onMounted(() => {

    const intervalId = setInterval(() => {
        currentFrog.value = (currentFrog.value + 1) % transitions.value.length;

        if (currentFrog.value === transitions.value.length - 1) {
            clearInterval(intervalId);
        }
    }, 75);





    let vw = window.innerWidth;
    let vh = window.innerHeight;

    anime({
        targets: '.frog',
        keyframes: [
            { duration: 300 },

            { translateY: 0.015 * vh * 1.2, translateX: 0.02 * vw * 0.72, duration: 75 },
            { translateY: 0, translateX: 0, duration: 75 },
            // up
            { translateY: -0.04 * vh * 1.2, translateX: -0.04 * vw * 0.72, duration: 75 },
            { translateY: -0.075 * vh * 1.2, translateX: -0.075 * vw * 0.72, duration: 75 },

            { translateY: -0.16 * vh * 1.2, translateX: -0.16 * vw * 0.72, duration: 75 },

            { translateY: -0.2 * vh * 1.2, translateX: -0.2 * vw * 0.72, duration: 75 },

            { translateY: -0.16 * vh * 1.2, translateX: -0.275 * vw * 0.72, duration: 75 },

            { translateY: -0.075 * vh * 1.2, translateX: -0.36 * vw * 0.72, duration: 75 },
            { translateY: -0.04 * vh * 1.2, translateX: -0.4 * vw * 0.72, duration: 75 },

            { translateY: 0, translateX: -0.42 * vw * 0.72, duration: 75 },
            { translateY: 0.015 * vh * 1.2, translateX: -0.4 * vw * 0.72, duration: 75 },
            { translateY: 0, translateX: -0.42 * vw * 0.72, duration: 75 },
            { translateY: 0, translateX: -0.42 * vw * 0.72, duration: 75 },

            { translateY: -0.17 * vh * 1.2, translateX: -0.42 * vw * 0.72, duration: 220, easing: 'easeInOutSine' },
            { easing: 'easeInOutSine', rotateY: '+=180', scale: 1, duration: 150, translateX: -0.49 * vw * 0.72 },
            { scale: 0, duration: 1, delay: 25 },
        ],

        easing: 'easeOutQuad',
        loop: false,

    });

});
</script>

<style scoped>
.frog {
    z-index: 4;
    width: calc(250px + (vw-320px) * (250-50) / (1600-320));
    position: fixed;
    top: calc(20vh);
    left: calc(30vw);
    transform: translate(-50%, -50%);
    transform-origin: center;
}
</style>
