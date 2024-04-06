<template>

    <nav id="nav">
        <div v-for="(link, index) in links" :key="index" :class="{ 'nav-link': true, 'active': isActive(link.url) }">
            <div class="gravityButton">
                <a @click="navigate(link.url)" class="buttonIcon">{{ link.name }}</a>
            </div>
        </div>
    </nav>
    <div class="gravityButton">
        <div class="buttonIcon">

            <svg width="61" height="56" viewBox="0 0 61 56" fill="none" alt="logo" class="logobi" @click="reloadPage">
                <path fill-rule="evenodd" clip-rule="evenodd" class="logo"
                    d="M32.9998 6.50004C34.9067 11.3361 35.7249 13.9779 36.4998 18.5C44.3541 21.5881 49.0233 24.4579 53.5 29.5C54.2003 31.2663 54.5283 32.4196 54 36.5C52.9174 39.9698 50.474 41.0773 46.9998 43.5L34.4998 44.5C29.9529 43.7768 27.3582 43.225 22.4998 41.5C17.1749 39.6406 15.8274 37.8219 10.5 34.0002C7.11077 32.7348 8.39119 33.4021 8 36C12.5669 40.735 14.4134 40.824 20.4998 43.5C25.5377 45.7378 28.5166 46.6799 34.4998 47C36.7591 47.1446 43.4596 44.6896 43.9998 46C44.54 47.3105 31.202 58.4121 27.4998 57.5C23.7976 56.588 15.8613 53.8927 13.4998 52.5C11.1383 51.1073 7.55109 49.5719 3.4998 44.5C0.589438 39.1179 -0.672616 36.9842 1.49999 30.0002C1.88798 25.5105 2.7064 23.1125 4.99999 19.0002C6.13955 11.1113 7.3535 6.01901 13.4998 2.00004C17.8729 -0.405661 22.4998 4.50003 22.4998 4.50003C26.7834 -0.897591 29.1108 -0.579235 32.9998 6.50004ZM13.4197 18.1558C13.4197 15.9613 13.4529 9.92765 13.4529 9.92765C13.4529 8.66853 13.7902 7.43693 14.4554 6.54659C15.1207 5.65626 16.6956 5.15607 17.6364 5.15607C18.5772 5.15607 19.4795 5.65626 20.1448 6.54659C20.81 7.43693 21.2451 8.64789 21.2451 9.90701V18.1561L13.4197 18.1558ZM31.8271 9.28397V16.1561L26.135 16.1557L26.1349 9.20708C26.1349 7.9384 26.4919 6.79857 27.1554 5.90148C27.8189 5.00439 28.2203 4.50003 29.1586 4.50003C29.8744 4.50003 30.0619 4.79362 30.4053 5.33123C30.5119 5.49826 30.6336 5.68884 30.7909 5.90148C31.4544 6.79857 31.8271 8.01529 31.8271 9.28397Z"
                    fill="rgb(139, 139, 139)" />
            </svg>
        </div>
    </div>
    <frog v-if="showFrog" class="frog" />


    <div id="image-track" data-mouse-down-at="0" data-prev-percentage="0">
        <canvas class="canvas"></canvas>
    </div>

    <table>
        <tr v-for="(carte, index) in cartes" :key="index">
            <td>
                <component :is="carte.component" v-if="carte.show" />
            </td>
        </tr>
    </table>

    <!-- Ajout des flèches de navigation -->
    <p class="fleche1" v-if="showcarteX && prevCarteAvailable" @click="prevCarte">&#x279C</p>
    <p class="fleche2" v-if="showcarteX && nextCarteAvailable" @click="nextCarte">&#x279C</p>
    <p id="croix" @click="hideCarte" v-if="showcarteX">&#10006</p>

    <div class="gravityButton" id="gauche">
        <a href="https://www.linkedin.com/in/baptiste-audeon-04b070287/" class="buttonIcon">Linkedin</a>
    </div>

    <div class="gravityButton" id="droite">
        <a href="mailto:bapt.audeon@gmail.com" class="buttonIcon">Contact</a>
    </div>
    <div>
        <div>{{ props.model }}</div>
        <div>{{ props.textureData }}</div>
    </div>
</template>



<script setup>

// ===================================================================================
// IMPORT ===================================================================================
// ===================================================================================
import { onMounted, ref, computed, onUnmounted, defineProps, unref } from 'vue';

import * as THREE from 'three';

import anime from 'animejs/lib/anime.es.js';


import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

import { useRoute, useRouter } from 'vue-router';

import project1 from '/src/assets/img/projet1.png';
import project2 from '/src/assets/img/projet2.png';
import project3 from '/src/assets/img/projet3.png';

import frog from '../components/Frog.vue';
import Carte1 from '../components/carte1.vue';
import Carte2 from '../components/carte2.vue';
import Carte3 from '../components/carte3.vue';

// ===================================================================================
// Carte ==================================================================================
// ===================================================================================

const showcarteX = ref(false)

const cartes = ref([
    { component: Carte3, show: false },
    { component: Carte2, show: false },
    { component: Carte1, show: false },
]);


const showCarte = (index) => {
    showcarteX.value = true;
    cartes.value[index].show = true;
};

const hideCarte = () => {
    showcarteX.value = false;
    let index = 0;
    for (let carte of cartes.value) {
        cartes.value[index].show = false;
        index++;
    }
};

const prevCarte = () => {
    let index = cartes.value.findIndex(carte => carte.show);
    if (index > 0) {
        cartes.value[index].show = false;
        cartes.value[index - 1].show = true;
    }
};

const nextCarte = () => {
    let index = cartes.value.findIndex(carte => carte.show);
    if (index < cartes.value.length - 1) {
        cartes.value[index].show = false;
        cartes.value[index + 1].show = true;
    }
};
onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleScroll);
});

const handleKeyDown = (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            prevCarte();
            break;
        case 'ArrowRight':
            nextCarte();
            break;
        case 'Escape':
            hideCarte();
            break;
    }
};


const handleScroll = () => {
    if (showcarteX.value) {
        hideCarte();
    }
};


const prevCarteAvailable = computed(() => {
    let index = cartes.value.findIndex(carte => carte.show);
    return index > 0;
});

const nextCarteAvailable = computed(() => {
    let index = cartes.value.findIndex(carte => carte.show);
    return index < cartes.value.length - 1;
});


// ===================================================================================
// NAV BAR  ===================================================================================
// ===================================================================================

const links = ref([
    { name: 'Projects', url: '/' },
    { name: 'About', url: '/about' }
])

const route = useRoute()
const router = useRouter()

function isActive(url) {
    return route.path === url;
}

let about;


function navigate(url) {
    if (!isClicked) {
        isClicked = true;
        hideCarte();
        about().then(() => {
            //arrête le chargement des données dans le dom 
            router.push(url)
        })
    }
}



const showFrog = ref(false)


let isClicked = false;

const reloadPage = () => {
    if (!isClicked) {
        isClicked = true;
        hideCarte();
        about().then(() => {
            location.reload()
        })
    }

}

const logostart = "M32.9998 6.50004C34.9067 11.3361 35.7249 13.9779 36.4998 18.5C44.3541 21.5881 49.0233 24.4579 53.5 29.5C54.2003 31.2663 54.5283 32.4196 54 36.5C52.9174 39.9698 50.474 41.0773 46.9998 43.5L34.4998 44.5C29.9529 43.7768 27.3582 43.225 22.4998 41.5C17.1749 39.6406 15.8274 37.8219 10.5 34.0002C7.11077 32.7348 8.39119 33.4021 8 36C12.5669 40.735 14.4134 40.824 20.4998 43.5C25.5377 45.7378 28.5166 46.6799 34.4998 47C36.7591 47.1446 43.4596 44.6896 43.9998 46C44.54 47.3105 31.202 58.4121 27.4998 57.5C23.7976 56.588 15.8613 53.8927 13.4998 52.5C11.1383 51.1073 7.55109 49.5719 3.4998 44.5C0.589438 39.1179 -0.672616 36.9842 1.49999 30.0002C1.88798 25.5105 2.7064 23.1125 4.99999 19.0002C6.13955 11.1113 7.3535 6.01901 13.4998 2.00004C17.8729 -0.405661 22.4998 4.50003 22.4998 4.50003C26.7834 -0.897591 29.1108 -0.579235 32.9998 6.50004ZM13.4197 18.1558C13.4197 15.9613 13.4529 9.92765 13.4529 9.92765C13.4529 8.66853 13.7902 7.43693 14.4554 6.54659C15.1207 5.65626 16.6956 5.15607 17.6364 5.15607C18.5772 5.15607 19.4795 5.65626 20.1448 6.54659C20.81 7.43693 21.2451 8.64789 21.2451 9.90701V18.1561L13.4197 18.1558ZM31.8271 9.28397V16.1561L26.135 16.1557L26.1349 9.20708C26.1349 7.9384 26.4919 6.79857 27.1554 5.90148C27.8189 5.00439 28.2203 4.50003 29.1586 4.50003C29.8744 4.50003 30.0619 4.79362 30.4053 5.33123C30.5119 5.49826 30.6336 5.68884 30.7909 5.90148C31.4544 6.79857 31.8271 8.01529 31.8271 9.28397Z";
const logoend = "M56.2405 16.2727V21.9706L60.2328 21.9708V27.7302C60.2282 30.8996 57.9157 33.4676 55.0628 33.4708H44.2814H38.8907H33.5H24.8664H16.2328C14.9146 33.4708 13.6601 34.0332 12.728 34.9865C11.7959 35.9398 11.2722 37.2328 11.2722 38.5759C11.2722 39.9291 11.7959 41.222 12.728 42.1753C13.6601 43.1286 14.9243 43.6642 16.2424 43.6642H32L42.5 43.6675L53 43.6708H60.2328V49.4302C60.2282 52.5996 57.9157 55.1677 55.0628 55.1708H45.3553H35.6478H25.9403H16.2328C11.925 55.1708 7.75334 53.4426 4.7573 50.3273C1.71125 47.212 3.25227e-07 42.9867 0 38.5759C0 36.224 0.489763 33.9186 1.41165 31.7573L1.42596 16.4452L1.42599 16.4143C1.43394 12.1421 3.09048 8.04673 6.20083 5.02525C9.31867 1.99649 13.5474 0.294956 17.9567 0.294956C22.1009 0.294956 26.0837 1.57193 29.1362 4.24015C32.2018 1.28266 35.3264 -1.14441e-05 39.6597 -1.14441e-05C44.0572 -1.11183e-05 48.2746 1.71444 51.3841 4.76619C54.4936 7.81794 56.2405 11.9569 56.2405 16.2727ZM12.8741 21.9691C12.8741 19.6846 12.9216 16.4702 12.9216 16.4702C12.9216 15.1595 13.4053 13.8775 14.3594 12.9507C15.3134 12.0239 16.6074 11.5032 17.9567 11.5032C19.3059 11.5032 20.5999 12.0239 21.5539 12.9507C22.508 13.8775 23.1319 15.1381 23.1319 16.4488V21.9693L12.8741 21.9691ZM44.7334 16.2728L44.7355 21.9702L34.6107 21.9698L34.6085 16.1928C34.6085 14.8721 35.1205 13.6856 36.072 12.7518C37.0236 11.818 38.3141 11.2933 39.6597 11.2933C41.0053 11.2933 42.2959 11.818 43.2474 12.7518C44.1989 13.6856 44.7334 14.9522 44.7334 16.2728Z";

const props = defineProps({
    data: Object
});


onMounted(() => {

    //COMPOSANT enfant:
    let model = unref(props.data.model);
    let texture = unref(props.data.textureData);

    let scene = new THREE.Scene();
    let scene2 = new THREE.Scene();

    console.log(texture)
    scene.environment = texture;
    scene2.environment = texture;
    // ===================================================================================
    // scene UFO ==================================================================================
    // ===================================================================================

    const planete = [
        { name: 'project3', minia: project3 },
        { name: 'project2', minia: project2 },
        { name: 'project1', minia: project1 },
    ];


    const tailleecran = 0.3 * planete.length;
    const zoom = 50 * planete.length;
    const decalage = -2 * planete.length;



    let camera = new THREE.PerspectiveCamera(
        75,
        window.screen.width / window.screen.height * tailleecran,
        0.1,
        1000
    );



    const canvas = document.querySelector(".canvas");

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });


    scene2.background = new THREE.Color(0x141414);


    renderer.setSize(window.screen.width * tailleecran, window.screen.height);


    window.addEventListener("resize", () => {
        camera.updateProjectionMatrix()
    });


    const renderscene = new RenderPass(scene2, camera);
    const bloomPass1 = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
    );
    bloomPass1.threshold = 0.1;
    bloomPass1.strength = .8;
    bloomPass1.radius = 0.1;

    const composer1 = new EffectComposer(renderer);
    composer1.addPass(renderscene);
    composer1.addPass(bloomPass1);



    const spheres = [];
    const rectangles = [];
    const textureLoader = new THREE.TextureLoader();


    for (let i = 0; i < planete.length; i++) {
        const planet = planete[i];

        const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                transparent: true,
                opacity: 0,
            })
        );

        sphere.position.x = -(planete.length - 1) * 11 / 2 + i * 6 - decalage;
        scene.add(sphere);
        sphere.name = 'sphere' + i;
        sphere.position.y = -3;
        sphere.rotation.x = (Math.PI / 180) * -20;
        spheres.push(sphere);

        const texture = textureLoader.load(planet.minia);


        const rectangle = new THREE.Mesh(
            new THREE.PlaneGeometry(5, 5, 10, 10),
            new THREE.MeshPhongMaterial({
                transparent: true,
                map: texture,
                side: THREE.DoubleSide,
                opacity: 0,
                // Définissez la couleur émissive du matériau
                emissive: 0xff0000
            })
        );

        scene2.add(rectangle);


        rectangle.position.x = -(planete.length - 1) * 11 / 2 + i * 6 - decalage;

        rectangle.position.z = 0.6;

        rectangles.push(rectangle);

        sphere.add(model.clone());
    }













    window.nextPercentage = 0;

    const mousePosition = new THREE.Vector2();

    const rayCaster = new THREE.Raycaster();


    canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        mousePosition.x = ((e.clientX - rect.left) / canvas.width) * 2 - 1;
        mousePosition.y = -((e.clientY - rect.top) / canvas.height) * 2 + 1;

        rayCaster.setFromCamera(mousePosition, camera);
        const intersects = rayCaster.intersectObjects(rectangles);

        if (intersects.length > 0) {
            const index = rectangles.indexOf(intersects[0].object);
            showCarte(index);
        }
    });
    // hover souris sur pointer

    canvas.addEventListener('mousemove', (e) => {
        canvas.style.cursor = 'grab';
        const rect = canvas.getBoundingClientRect();
        mousePosition.x = ((e.clientX - rect.left) / canvas.width) * 2 - 1;
        mousePosition.y = -((e.clientY - rect.top) / canvas.height) * 2 + 1;

        rayCaster.setFromCamera(mousePosition, camera);
        const intersects = rayCaster.intersectObjects(rectangles);

        if (intersects.length > 0) {
            canvas.style.cursor = 'pointer';
        }

    });




    function animate() {
        composer1.render();

        renderer.autoClear = false; // Empêche l'effacement automatique du buffer.

        renderer.clearDepth(); // Clear the depth buffer

        // Effectue le rendu de la deuxième scène par-dessus la première
        renderer.render(scene, camera);


        spheres.forEach((sphere, index) => {
            let angle = (window.nextPercentage / 100) * 2 * Math.PI;

            anime({
                targets: sphere.rotation,
                y: angle,
                duration: 1200,
                easing: 'cubicBezier(0.33, 1, 0.68, 1)'
            });

        });

        window.requestAnimationFrame(animate);
    }
    animate();


    const imageTrack = document.getElementById("image-track");
    const cameraPositions = [
        { x: -250, y: 0, z: -1 },

        { x: -30, y: 0, z: -1 },

        { x: 0, y: 0, z: zoom }

    ];

    camera.position.set(cameraPositions[0].x, cameraPositions[0].y, cameraPositions[0].z);

    let durs = [1800, 1300];
    let animateCamera;





    animateCamera = function (index) {
        let nextIndex = index + 1;
        if (nextIndex < cameraPositions.length) {
            let nextPosition = cameraPositions[nextIndex];
            let dur = durs[index];
            anime({
                targets: camera.position,
                easing: "linear",
                duration: dur,
                x: nextPosition.x,
                y: nextPosition.y,
                z: nextPosition.z,
                update: function () {
                    camera.lookAt(new THREE.Vector3(0, 0, 0));
                },
                complete: function () {
                    animateCamera(nextIndex);
                },
            });
            if (nextIndex === 1) {

                for (let i = 0; i < spheres.length; i++) {
                    anime({
                        targets: spheres[i].position,
                        duration: 1800,
                        easing: 'easeInExpo',
                        y: 2,
                    });
                }
            }
            if (nextIndex === 2) {
                anime({
                    duration: 1100,
                    easing: 'easeInOutCubic',
                    update: function (anim) {
                        camera.setFocalLength(11 + (anim.progress / 100) * (150 - 11));
                    },
                });

                let delay = 0; // Initialiser le délai à 0
                for (let i = 0; i < spheres.length; i++) {
                    setTimeout(function () { // Ajouter un délai avant chaque animation
                        anime({
                            targets: spheres[i].rotation,
                            keyframes: [
                                { x: 0, duration: 450, easing: 'linear' }
                            ]
                        });
                    }, delay);
                    delay += 500; // Augmenter le délai pour chaque objet
                }


            }
        }
        else {

            for (let i = 0; i < rectangles.length; i++) {
                anime.timeline({
                    targets: rectangles[i].material,
                    easing: 'easeInOutCubic',
                    duration: 250, // Durée de l'animation en millisecondes
                })
                    .add({
                        opacity: [0, 1], // Change l'opacité de 0 à 1
                    })
                    .add({
                        targets: rectangles[i].position,
                        y: [0, -1], // Déplace le rectangle de -1 à 0 le long de l'axe Y
                    }, 0); // Commence cette animation en même temps que le changement d'opacité
            }

            showFrog.value = true


            anime({
                targets: imageTrack,
                left: '0%',
                duration: 500,
                easing: 'easeInExpo',
                complete: function (anim) {
                    carrousel();
                }
            });


            anime({
                targets: '.logobi',
                keyframes: [
                    //floor
                    { duration: 1865 },
                    { opacity: 1, duration: 1 },
                    { duration: 750 },
                    { rotate: 90, duration: 500, easing: 'easeInOutSine' },

                ],
                loop: false
            });

            anime({
                targets: '.logo',
                d: [
                    { value: logostart, delay: 1855 },
                    { value: logoend, duration: 350, }
                ],
                fill: [
                    { value: '#fff', delay: 3000, duration: 1000 },
                ],
                loop: false
            });

        }
    };




    animateCamera(0);

    about = function () {

        return new Promise((resolve, reject) => {
            for (let i = 0; i < rectangles.length; i++) {
                anime.timeline({
                    targets: rectangles[i].material,
                    easing: 'easeInOutCubic',
                    duration: 250, // Durée de l'animation en millisecondes
                })
                    .add({
                        opacity: 0, // Change l'opacité de 0 à 1
                    })
                    .add({
                        targets: rectangles[i].position,
                        y: [-1, 0], // Déplace le rectangle de -1 à 0 le long de l'axe Y
                    }, 0); // Commence cette animation en même temps que le changement d'opacité

            }

            let delay = 0; // Initialiser le délai à 0
            for (let i = 0; i < spheres.length; i++) {
                setTimeout(function () { // Ajouter un délai avant chaque animation
                    anime({
                        targets: spheres[i].position,
                        duration: 1000,
                        easing: 'easeInExpo',
                        z: i % 2 === 0 ? -1000 : 500, // Utilisez l'opérateur % pour vérifier la parité de l'indice i
                        complete: function (anim) {
                            setTimeout(function () {
                                resolve();
                            }, 400);
                        }
                    });
                }, delay);
                delay += 100;
            }
        });

    }


    // ===================================================================================
    // btn effet graviter ==================================================================================
    // ===================================================================================
    document.querySelectorAll('.gravityButton').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {


            const rect = btn.getBoundingClientRect();
            const h = rect.width / 2;

            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - h;

            const r1 = Math.sqrt(x * x + y * y);
            const r2 = (1 - (r1 / h)) * r1;

            const angle = Math.atan2(y, x);
            const tx = Math.round(Math.cos(angle) * r2 * 100) / 100;
            const ty = Math.round(Math.sin(angle) * r2 * 100) / 100;

            const op = (r2 / r1) + 0.25;

            btn.style.setProperty('--tx', `${tx}px`);
            btn.style.setProperty('--ty', `${ty}px`);

        });

        btn.addEventListener('mouseleave', (e) => {
            btn.style.setProperty('--tx', '0px');
            btn.style.setProperty('--ty', '0px');
        });
    })
    function carrousel() {


        // ===================================================================================
        //  caroussel systeme ==================================================================================
        // ===================================================================================

        const track = document.getElementById("image-track");
        track.dataset.percentage = 0;
        const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;
        const handleOnUp = () => {
            track.dataset.mouseDownAt = "0";
            track.dataset.prevPercentage = track.dataset.percentage;
        }
        const handleOnMove = e => {
            if (track.dataset.mouseDownAt === "0") return;
            const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
                maxDelta = window.innerWidth / 2;
            const percentage = (mouseDelta / maxDelta) * -100,
                nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
                nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -34);
            window.nextPercentage = nextPercentage;
            track.dataset.percentage = nextPercentage;
            track.animate(
                { transform: `translate(${nextPercentage}%, -50%)`, easing: 'cubic-bezier(0.33, 1, 0.68, 1)' },
                { duration: 1500, fill: "forwards" });
        }

        window.onmousedown = e => handleOnDown(e);
        window.ontouchstart = e => handleOnDown(e.touches[0]);
        window.onmouseup = e => handleOnUp(e);
        window.ontouchend = e => handleOnUp(e.touches[0]);
        window.onmousemove = e => handleOnMove(e);
        window.ontouchmove = e => handleOnMove(e.touches[0]);

        function handleScroll(direction) {
            const nextPercentageUnconstrained = direction + parseFloat(track.dataset.percentage);
            const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -34);
            track.dataset.percentage = nextPercentage;
            window.nextPercentage = nextPercentage;
            track.dataset.prevPercentage = track.dataset.percentage;
            track.animate(
                { transform: `translate(${nextPercentage}%, -50%)`, easing: 'cubic-bezier(0.33, 1, 0.68, 1)' },
                { duration: 1500, fill: "forwards" }
            );
        }
        // Listen for the "wheel" event
        window.addEventListener("wheel", (event) => {
            const direction = event.deltaY > 0 ? 5 : -5;
            handleScroll(direction);
        });


        if (showcarteX.value === true) {
            document.addEventListener("keydown", function (event) {
                let direction = 0;
                switch (event.key) {
                    case "ArrowUp":
                        direction = -5;
                        break;
                    case "ArrowDown":
                        direction = 5;
                        break;
                    case "ArrowLeft":
                        direction = 5;
                        break;
                    case "ArrowRight":
                        direction = -5;
                        break;
                    default:
                        return;
                }
                handleScroll(direction);
            });

        }
    }
    // Listen for the "keydown" event

});



onUnmounted(() => {
    window.onmousedown = null;
    window.ontouchstart = null;
    window.onmouseup = null;
    window.ontouchend = null;
    window.onmousemove = null;
    window.ontouchmove = null;
    window.removeEventListener("wheel", null);
    document.removeEventListener("keydown", null);

    window.removeEventListener("wheel", (event) => {
        const direction = event.deltaY > 0 ? 5 : -5;
        handleScroll(direction);
    });

    document.removeEventListener("keydown", function (event) {
        let direction = 0;
        switch (event.key) {
            case "ArrowUp":
                direction = -5;
                break;
            case "ArrowDown":
                direction = 5;
                break;
            case "ArrowLeft":
                direction = 5;
                break;
            case "ArrowRight":
                direction = -5;
                break;
            default:
                return;
        }
        handleScroll(direction);
    });

    window.removeEventListener("resize", () => {
        size.width = window.innerWidth;
        size.height = window.innerHeight;
        camera.aspect = size.width / size.height;
        camera.updateProjectionMatrix()
        renderer.setSize(size.width, size.height);
        camera.setFocalLength(zoom);
    });


    window.removeEventListener("resize", () => {
        size.width = window.innerWidth;
        size.height = window.innerHeight;
        camera3.aspect = size.width / size.height;
        camera3.updateProjectionMatrix()
        renderer3.setSize(size.width, size.height);
        camera3.setFocalLength(zoom);
    });



    document.querySelectorAll('.gravityButton').forEach(btn => {
        btn.removeEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const h = rect.width / 2;

            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - h;

            const r1 = Math.sqrt(x * x + y * y);
            const r2 = (1 - (r1 / h)) * r1;

            const angle = Math.atan2(y, x);
            const tx = Math.round(Math.cos(angle) * r2 * 100) / 100;
            const ty = Math.round(Math.sin(angle) * r2 * 100) / 100;

            const op = (r2 / r1) + 0.25;

            btn.style.setProperty('--tx', `${tx}px`);
            btn.style.setProperty('--ty', `${ty}px`);

        });

        btn.removeEventListener('mouseleave', (e) => {
            btn.style.setProperty('--tx', '0px');
            btn.style.setProperty('--ty', '0px');
        });



    });


});




</script>



<style scoped>
@media (max-width: 900px) {
    .logobi {
        display: none;

    }

    .frog {
        display: none;
    }

    /* faire disparaitre les fleches */
    .fleche1 {
        display: none;
    }

    .fleche2 {
        display: none;
    }

    #image-track {
        display: flex;
        position: absolute;
        top: 50%;
        left: -70% !important;
        transform: translate(0%, -50%);
        user-select: none;
        cursor: grab;
    }

}



.canvas {
    left: 0;
    top: 0;
    z-index: 2;
}

#image-track {
    display: flex;
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(0%, -50%);
    user-select: none;
    cursor: grab;
}



#nav {
    position: fixed;
    top: -2vh;
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: center;
    color: #fff;
    width: 100%;
    right: 0px;
    font-size: 1.5rem;
    z-index: 5;
    cursor: grab;
}

.buttonIcon {
    font-family: 'tenby-five.otf';
    will-change: transform;
    cursor: pointer;
    transform: translate(var(--tx, 0), var(--ty, 0));

}


.fleche1 {
    font-size: 3rem;
    font-weight: 400;
    color: #fff;
    transform: translate(-50%, -50%);
    transform: rotate(180deg);
    position: absolute;
    z-index: 16;
    cursor: pointer;
    top: 45vh;
    left: 87vw;
}

.fleche2 {
    font-size: 3rem;
    font-weight: 400;
    color: #fff;
    transform: translate(-50%, -50%);
    transform-origin: left;
    margin-left: 22px;
    position: absolute;
    top: 40vh;
    left: 87vw;
    z-index: 16;
    cursor: pointer;
}


#croix {
    font-size: 2rem;
    font-weight: 400;
    color: #fff;
    transform: translate(-50%, -50%);
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: 16;
    cursor: pointer;
}

.gravityButton {
    position: relative;
    z-index: 6;
    display: grid;
    place-items: center;
    width: 200px;
    aspect-ratio: 1;
    border-radius: 50%;
}

.nav-link {
    opacity: .3;
    will-change: transform;
    transition: opacity .3s var(--o2);
}

.nav-link:hover {
    opacity: 1;
}

.active a {
    pointer-events: none;
}

.active {
    opacity: 1;
}

#gauche {
    position: absolute;
    left: 0;
    bottom: -2vh;
    font-size: 1.5rem;
    font-weight: 400;
    color: #fff;
    z-index: 3;
}

#droite {
    position: absolute;
    right: 0;
    bottom: -2vh;
    font-size: 1.5rem;
    color: #fff;
    z-index: 3;
    margin: 0vw;
}


.logobi {
    z-index: 6;
    width: 60px;
    height: auto;
    opacity: 0;
}
</style>