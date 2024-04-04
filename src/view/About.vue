<template>
    <nav id="nav">
        <div v-for="(link, index) in links" :key="index" :class="{ 'nav-link': true, 'active': isActive(link.url) }">
            <div class="gravityButton">
                <a @click="navigate(link.url)" class="buttonIcon">{{ link.name }}</a>
            </div>
        </div>
    </nav>
    <!-- <frog /> -->
    <Slide />
    <!-- <carte1 /> -->
</template>


<script setup>
import { defineAsyncComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'


const Slide = defineAsyncComponent(() => import('../components/Slide.vue'));

// import frog from '../components/Frog.vue'
// import carte1 from '../components/carte1.vue'

const links = ref([
    { name: 'Projects', url: '/' },
    { name: 'About', url: '/about' }
])


const route = useRoute()
const router = useRouter()

function isActive(url) {
    return route.path === url;
}
function navigate(url) {
    about().then(() => {
        router.push(url)
    })
}

let about = function () {

    return new Promise((resolve, reject) => {

        resolve();
    });

}

</script>

<style scoped>
#nav {
    font-family: 'tenby-five.otf';
    position: fixed;
    top: 37px;
    font-size: 1.5rem;
    line-height: 20px;
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: center;
    color: #fff;
    width: 100%;
    right: 20px;
    z-index: 15;
}

#nav div {
    margin: 1.5vh 1.5vw 0 1.5vw;

}

.nav-link {
    opacity: .3;
    will-change: transform;
    transition: opacity .3s var(--o2);

}

.nav-link:hover {
    opacity: 1;
    cursor: pointer;
}

.active a {
    pointer-events: none;
}

.active {
    opacity: 1;

}
</style>