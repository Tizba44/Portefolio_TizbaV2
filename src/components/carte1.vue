<template>
    <div class="navimage">
        <img class="minia" v-for="(img, index) in images" :src="img.src" :alt="img.alt" @click="showImage(index)"
            :class="{ active: currentImage === index, first: index === 0 }" draggable="false">
    </div>


    <main :style="mainStyle">
        <img v-if="show" :class="'ama' + currentImage" :src="images[currentImage].src" :alt="images[currentImage].alt"
            draggable="false">

        <div class="container" v-if="showo">



            <div class="left">
                <h2>Amalgames: un blog de mode</h2>
                <p>
                    Un ami a perdu son emploi de rédacteur auprès d'un grand blogueur français.
                    (verygoodlord.com)
                </p>
                <p>
                    Je lui ai proposé de créer un thème Wordpress pour qu'il puisse continuer à utiliser les
                    compétences qu'il a acquises.
                </p>
                <p>J'ai codé le thème Wordpress en php from scratch, cela m'a permis d'en apprendre plus sur le
                    fonctionnement de Wordpress et de m'améliorer en php.</p>

                <p class="stop">(Nous avons arrêté, j'ai migré le blog vers mon portfolio.)
                </p>
            </div>

            <div class="right">

                <h3>Technologies :</h3>
                <p>WordPress, PHP, CSS, Vanilla JS, Yoast SEO, Figma.</p>

                <h3>Terminé :</h3>
                <p>10/02/2023.</p>

                <h3>Type :</h3>
                <p>Blog.</p>


                <div class="see">
                    <div> <a href="https://amalgames.baptisteaudeon.com/" target="_blank">Voir le site web</a></div>
                    <div>
                        <a href="https://github.com/Tizba44/FR-Amal-V1" target="_blank">Voir le code source</a>
                    </div>
                </div>


            </div>

        </div>

        <span v-for="(blur, index) in blurs" :key="index" :style="{ '--blur': blur + 'px' }"></span>

    </main>
</template>



<script>

import { ref, computed } from 'vue';
import anime from 'animejs';


import project1 from '/src/assets/img/projet1.png';

import img1 from '/src/assets/img/img1.png'
import img2 from '/src/assets/img/img2.png'
import img3 from '/src/assets/img/img3.png'

export default {
    data() {
        return {
            images: [
                { src: project1, alt: '', },
                { src: img1, alt: '', },
                { src: img2, alt: '', },
                { src: img3, alt: '', },
            ],
            currentImage: 0,
            show: false,
            showo: true,
        }
    },
    methods: {
        showImage(index) {
            this.show = false
            this.showo = false
            this.currentImage = index

            if (this.currentImage === 0) {
                this.$nextTick(() => {
                    this.showo = true
                })
            }
            this.$nextTick(() => {
                this.show = true
            })
        },
        handleKeydown(e) {
            if (e.key === 'ArrowUp') {
                // Go to the previous image
                if (this.currentImage > 0) {
                    this.showImage(this.currentImage - 1);
                }
            } else if (e.key === 'ArrowDown') {
                // Go to the next image
                if (this.currentImage < this.images.length - 1) {
                    this.showImage(this.currentImage + 1);
                }
            }
        }
    },
    mounted() {
        window.addEventListener('keydown', this.handleKeydown);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    },




    setup() {
        const clientX = ref(0);
        const clientY = ref(0);

        const animateMousePosition = (e) => {
            anime({
                targets: clientX,
                value: e.clientX,
                duration: 10,
                easing: 'linear'
            });
            anime({
                targets: clientY,
                value: e.clientY,
                duration: 10,
                easing: 'linear'
            });
        };

        const updateMousePosition = (e) => {
            requestAnimationFrame(() => animateMousePosition(e));
        };

        window.addEventListener('mousemove', updateMousePosition);

        updateMousePosition({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });

        const rotateX = computed(() => (clientY.value - window.innerHeight / 2) * 1.2 / 80);
        const rotateY = computed(() => (clientX.value / window.innerWidth - .5) * 1.2 * 30);
        const translateX = computed(() => (clientX.value / window.innerWidth * 2 - 1) * Math.min(200, .05 * window.innerWidth));
        const translateY = computed(() => (clientY.value / window.innerHeight * 2 - 1) * Math.min(100, .05 * window.innerHeight));

        const mainStyle = computed(() => ({
            transform: ` perspective(60vw) translateX(${translateX.value}px) translateY(${translateY.value}px) translateZ(100px) scale(1) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg) `
        }));

        const blurs = computed(() => {
            let blurValues = [];
            for (let i = 1; i <= 8; i++) {
                let blur = ((rotateY.value + 6) * (1 - (i - 1) / 7) + (6 - rotateY.value) * ((i - 1) / 7)) * 1.8;
                blurValues.push(Math.min(64, Math.max(1, blur)));
            }
            return blurValues;
        });

        return { mainStyle, blurs };
    }
}
</script>




<style scoped>
@media (max-width: 900px) {

    /* faire disparaitre les minia  */
    .minia {
        display: none;
    }
}



.ama0 {
    display: none;
}


.stop {
    font-size: .9vw;
}

.navimage {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 25vh 0 0 10vw;
    z-index: 20;
    position: fixed;
    top: 0;
}

.navimage img {
    margin-bottom: 50px;
    z-index: 20;
}



h3 {
    margin: 0;
    font-size: 1.5vw;
}

p {
    text-transform: none;
    font-size: 1.3vw;
    margin: 0 0 1vh 0;

}

h2 {
    font-size: 1.8vw;
    white-space: nowrap;
    margin-bottom: 2vw;
}




a {
    font-size: 1vw;
    font-style: italic;
}

.left {
    width: 50%;
    margin-top: -.5vw;
}

.right {
    width: 50%;
    margin: 3.5vw 0 0 2vw;
}


.see {
    position: absolute;
    display: flex;
    flex-direction: column;
    font-style: italic;
    margin-top: calc(.2vw - 0vh);
    right: 0;
    color: rgb(189, 184, 235);
}

.see div {
    margin: 0 0 1vh 0;
}



.container {
    position: relative;
    /* Changez à relative pour permettre le positionnement des éléments enfants */
    width: 45vw;
    height: 55vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: rgb(227, 225, 225);
}


.minia.active {
    border: 3px solid rgba(255, 0, 0, 0.474);
    border-radius: 8px;
    padding: 3px;
    margin-left: -4px;
}


.minia {
    height: 50px;
    width: auto;
    border-radius: 8px;
}

.minia.first {
    height: 88px;
    width: auto;
    padding: 3px;
}

.ama1,
.ama2,
.ama3 {
    height: auto;
    width: 50vw;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    border-radius: 8px;
}


main {
    top: 0;
    z-index: 15;
    position: fixed;
    width: 50vw;
    height: 60vh;

    max-height: 28vw;
    inset: 0;
    margin: auto;
    border-radius: 8px;
    box-shadow: 0 20px 40px 1px rgba(0, 0, 0, .12), inset 0 -10px 20px -5px rgba(0, 0, 0, .3), 0 150px 100px -80px rgba(0, 0, 0, .4), inset 0 1px 4px hsla(0, 0%, 100%, .6), inset 0 -1px 1px 1px rgba(0, 0, 0, .2)
}



span {
    display: block;
    position: absolute;
    z-index: 1;
    inset: -40px;
    --offset: 50%;
    backdrop-filter: blur(var(--blur));
    -webkit-backdrop-filter: blur(var(--blur));
    -webkit-mask-image: linear-gradient(to right, transparent calc(var(--x) - var(--offset)), #000 calc(var(--x) - var(--offset) / 2), #000 calc(var(--x) + var(--offset) / 2), transparent calc(var(--x) + var(--offset))), linear-gradient(to bottom, transparent 40px, #000 44px, #000 calc(100% - 44px), transparent calc(100% - 40px)), linear-gradient(to right, transparent 40px, #000 44px, #000 calc(100% - 44px), transparent calc(100% - 40px));
    -webkit-mask-composite: destination-in
}

.safari #container {
    perspective: 4000px
}

.safari span {
    inset: 1px;
    -webkit-mask-image: linear-gradient(to right, transparent calc(var(--x) - var(--offset)), #000 calc(var(--x) - var(--offset) / 2), #000 calc(var(--x) + var(--offset) / 2), transparent calc(var(--x) + var(--offset)));
    border-radius: 6px
}

span:first-of-type {
    --x: 11.11%
}

span:nth-of-type(2) {
    --x: 22.22%
}

span:nth-of-type(3) {
    --x: 33.33%
}

span:nth-of-type(4) {
    --x: 44.44%
}

span:nth-of-type(5) {
    --x: 55.55%
}

span:nth-of-type(6) {
    --x: 66.66%
}

span:nth-of-type(7) {
    --x: 77.77%
}

span:nth-of-type(8) {
    --x: 88.88%
}
</style>